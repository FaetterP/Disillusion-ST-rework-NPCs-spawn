(function (SV) {
    'use strict';

    var cfg = SV.config;
    var BASE_LANGUAGE = 'ru';
    var STORAGE_KEY = 'spawnViewer.language';

    var current = null;
    var listeners = [];

    function languages() {
        return Object.keys(SV.data.strings || {});
    }

    function isKnown(code) {
        return !!code && languages().indexOf(code) > -1;
    }

    function readSaved() {
        try { return window.localStorage.getItem(STORAGE_KEY); } catch (err) { return null; }
    }

    function save(code) {
        try { window.localStorage.setItem(STORAGE_KEY, code); } catch (err) { }
    }

    function lang() {
        if (current) return current;
        var saved = readSaved();
        current = isKnown(saved) ? saved : (isKnown(cfg.language) ? cfg.language : languages()[0]);
        return current;
    }

    function setLanguage(code) {
        if (!isKnown(code) || code === lang()) return;
        current = code;
        save(code);
        listeners.slice().forEach(function (fn) { fn(code); });
    }

    function next() {
        var list = languages();
        setLanguage(list[(list.indexOf(lang()) + 1) % list.length]);
    }

    function languageName(code) {
        var table = (SV.data.strings || {})[code] || {};
        return table['lang.name'] || code;
    }

    function onChange(fn) {
        listeners.push(fn);
    }

    function t(key, params) {
        var strings = SV.data.strings || {};
        var table = strings[lang()] || {};
        var text = key in table ? table[key] : ((strings[BASE_LANGUAGE] || {})[key]);
        if (text == null) return key;
        if (params) {
            text = text.replace(/\{(\w+)\}/g, function (all, name) {
                return name in params ? params[name] : all;
            });
        }
        return text;
    }

    function translation(quest) {
        if (lang() === BASE_LANGUAGE) return null;
        var texts = (SV.data.questTexts || {})[lang()];
        return (texts && texts[quest.id]) || null;
    }

    function questTitle(quest) {
        var tr = translation(quest);
        return (tr && tr.title) || quest.title;
    }

    function stepText(quest, index, field) {
        var tr = translation(quest);
        var step = tr && tr.steps && tr.steps[index];
        return (step && step[field]) || quest.steps[index][field];
    }

    function validate() {
        var problems = [];
        var quests = SV.data.quests || [];
        var all = SV.data.questTexts || {};
        Object.keys(all).forEach(function (code) {
            var texts = all[code];
            quests.forEach(function (quest) {
                var tr = texts[quest.id];
                if (!tr) { problems.push(code + ': нет перевода квеста «' + quest.id + '»'); return; }
                if (!tr.title) problems.push(code + ': у квеста «' + quest.id + '» нет названия');
                var steps = tr.steps || [];
                if (steps.length !== quest.steps.length) {
                    problems.push(code + ': у квеста «' + quest.id + '» ' + steps.length +
                        ' шагов в переводе и ' + quest.steps.length + ' в data/quests.js');
                }
                quest.steps.forEach(function (step, i) {
                    var s = steps[i] || {};
                    if (!s.text) problems.push(code + ': «' + quest.id + '», шаг ' + i + ': нет text');
                    if (step.result && !s.result) problems.push(code + ': «' + quest.id + '», шаг ' + i + ': нет result');
                });
            });
            Object.keys(texts).forEach(function (id) {
                if (!quests.some(function (q) { return q.id === id; })) {
                    problems.push(code + ': перевод для несуществующего квеста «' + id + '»');
                }
            });
        });
        return problems;
    }

    SV.i18n = {
        lang: lang,
        languages: languages,
        setLanguage: setLanguage,
        next: next,
        languageName: languageName,
        onChange: onChange,
        t: t,
        questTitle: questTitle,
        stepText: stepText,
        validate: validate
    };

    var problems = validate();
    if (problems.length && typeof console !== 'undefined') {
        console.warn('[SpawnViewer] проблемы с переводами:\n' + problems.join('\n'));
    }

})(window.SpawnViewer = window.SpawnViewer || {});
