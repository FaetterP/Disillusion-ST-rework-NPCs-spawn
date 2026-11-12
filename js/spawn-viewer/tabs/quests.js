(function (SV) {
    'use strict';

    var cfg = SV.config;
    var dom = SV.dom;
    var el = dom.el;
    var i18n = SV.i18n;
    var t = i18n.t;

    var quests = SV.data.quests;

    var listBox, viewBox;
    var selectedId = null;
    var lastSignature = '';

    function build() {
        var pane = dom.fromHtml(
            '<div class="sv-quests">' +
                '<div class="sv-qlist"></div>' +
                '<div class="sv-qview"></div>' +
            '</div>'
        );
        listBox = pane.querySelector('.sv-qlist');
        viewBox = pane.querySelector('.sv-qview');
        return pane;
    }

    var HIDDEN_TITLE = '???';

    function titleOf(quest, state) {
        if (state.locked) return t('locked');
        return state.complete ? i18n.questTitle(quest) : HIDDEN_TITLE;
    }

    function nameClass(state) {
        if (state.locked) return ' locked';
        return state.complete ? '' : ' unknown';
    }

    function progressOf(state) {
        if (state.complete) return '✓';
        return (!state.locked && state.doneRequired) ? t('quest.stepShort', { n: state.doneRequired + 1 }) : '';
    }

    function renderList(states) {
        dom.clear(listBox);
        cfg.questGroups.forEach(function (group) {
            var inGroup = quests.filter(function (q) { return q.group === group.id; });
            if (!inGroup.length) return;

            listBox.appendChild(el('div', 'sv-qgroup', t('group.' + group.id)));
            inGroup.forEach(function (quest) {
                var state = states[quest.id];
                var row = el('div', 'sv-qrow' +
                    (quest.id === selectedId ? ' on' : '') +
                    (state.complete ? ' done' : ''));
                row.appendChild(el('span', 'sv-qname' + nameClass(state),
                    titleOf(quest, state)));
                row.appendChild(el('span', 'sv-qprog', progressOf(state)));
                row.addEventListener('click', function () {
                    selectedId = quest.id;
                    lastSignature = '';
                    update(true);
                });
                listBox.appendChild(row);
            });
        });
    }

    function stepGlyph(state, i) {
        if (state.done[i]) return '✓';
        if (i === state.current) return '';
        return '○';
    }

    function expandText(text, states) {
        return text.replace(/\{quest:([\w-]+)\}/g, function (all, id) {
            var quest = findQuest(id);
            return quest && states[id] && states[id].complete ? i18n.questTitle(quest) : HIDDEN_TITLE;
        });
    }

    function stepText(quest, index, states, done) {
        var step = quest.steps[index];
        if (done && step.result) return expandText(i18n.stepText(quest, index, 'result'), states);
        var counter = SV.questProgress.itemCount(step.when);
        return expandText(i18n.stepText(quest, index, 'text'), states) +
            (counter ? ' (' + counter.have + '/' + counter.total + ')' : '');
    }

    function renderNpcIcons(npcIds) {
        var box = el('div', 'sv-whos');
        npcIds.forEach(function (id) {
            var entry = SV.spawns.describe(id);
            var canvas = el('canvas');
            canvas.title = '#' + id + ' — ' + entry.label;
            SV.sprites.paintIcon(canvas, entry.g, 26);
            box.appendChild(canvas);
        });
        return box;
    }

    function renderStep(quest, state, i, idsHere, states) {
        var step = state.steps[i];
        var cls = 'sv-step' + (state.done[i] ? ' done' : (i === state.current ? ' cur' : ''));
        var row = el('div', cls);
        row.appendChild(el('span', 'sv-glyph', stepGlyph(state, i)));

        var text = el('div', 'sv-stext', stepText(quest, state.keys[i], states, state.done[i]));
        if (step.mode) text.appendChild(el('span', 'sv-tag', t('quest.mode.' + step.mode)));
        if (!state.done[i] && step.npcs && step.npcs.some(function (id) { return idsHere[id]; })) {
            text.appendChild(el('span', 'sv-tag near', t('quest.here')));
        }
        row.appendChild(text);

        if (step.npcs) row.appendChild(renderNpcIcons(step.npcs));
        return row;
    }

    function renderView(quest, state, idsHere, states) {
        dom.clear(viewBox);
        viewBox.appendChild(el('h4', 'sv-qtitle' + nameClass(state), titleOf(quest, state)));

        var meta = state.locked ? '' : (state.complete ? t('quest.complete') : t('quest.step', { n: state.doneRequired + 1 }));
        if (state.complete && quest.note) meta += ' · ' + quest.note;
        if (meta) viewBox.appendChild(el('div', 'sv-qmeta', meta));

        for (var i = 0; i < state.shown; i++) {
            viewBox.appendChild(renderStep(quest, state, i, idsHere, states));
        }
    }

    function findQuest(id) {
        return quests.filter(function (q) { return q.id === id; })[0];
    }

    function signatureOf(states, idsHere) {
        var parts = [i18n.lang(), selectedId];
        quests.forEach(function (q) {
            var s = states[q.id];
            parts.push(q.id + ':' + s.done.map(function (d) { return d ? 1 : 0; }).join('') +
                s.shown + (s.complete ? 'c' : '') + (s.locked ? 'L' : '') + '#' + s.keys.join('.'));
        });
        var selected = states[selectedId];
        parts.push(selected.steps.slice(0, selected.shown).map(function (step) {
            return (step.npcs || []).filter(function (id) { return idsHere[id]; }).join('.');
        }).join('/'));
        return parts.join('|');
    }

    function update(force) {
        if (!quests.length) return;

        var states = {};
        quests.forEach(function (q) { states[q.id] = SV.questProgress.stateOf(q); });
        var idsHere = SV.spawns.idsOnMap();

        if (selectedId == null) {
            var firstOpen = quests.filter(function (q) { return !states[q.id].complete; })[0] || quests[0];
            selectedId = firstOpen.id;
        }

        var signature = signatureOf(states, idsHere);
        if (!force && signature === lastSignature) return;
        lastSignature = signature;

        var scrollView = viewBox.scrollTop, scrollList = listBox.scrollTop;
        renderList(states);
        renderView(findQuest(selectedId), states[selectedId], idsHere, states);
        viewBox.scrollTop = scrollView;
        listBox.scrollTop = scrollList;
    }

    SV.questsTab = {
        select: function (id) {
            if (!findQuest(id)) return;
            selectedId = id;
            lastSignature = '';
        }
    };

    SV.viewer.registerTab({
        id: 'quests',
        build: build,
        onShow: function () { lastSignature = ''; update(true); },
        onTick: function (isSlowTick) { if (isSlowTick) update(false); }
    });

})(window.SpawnViewer = window.SpawnViewer || {});
