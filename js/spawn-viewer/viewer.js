(function (SV) {
    'use strict';

    var cfg = SV.config;
    var game = SV.game;
    var dom = SV.dom;

    var entries = []; // { id, def, pane }[]
    var activeId = cfg.defaultTab;

    var root = null, panel = null, tabsBox = null, langsBox = null, closeBtn = null;
    var isOpen = false, timer = null, tick = 0;

    function findEntry(id) {
        return entries.filter(function (e) { return e.id === id; })[0] || null;
    }

    function registerTab(def) {
        var entry = { id: def.id, def: def, pane: null };
        entries.push(entry);
        if (root) {
            mountTab(entry);
            applyTabVisibility();
            renderHead();
        }
    }

    function mountTab(entry) {
        entry.pane = entry.def.build();
        panel.appendChild(entry.pane);
    }

    function applyTabVisibility() {
        entries.forEach(function (entry) {
            entry.pane.hidden = entry.id !== activeId;
        });
    }

    function setActiveTab(id) {
        var entry = findEntry(id);
        if (!entry || !entry.pane) return;
        activeId = id;
        applyTabVisibility();
        renderHead();
        if (isOpen && entry.def.onShow) entry.def.onShow();
    }

    function showTab(id) {
        if (!findEntry(id)) return;
        if (isOpen) { setActiveTab(id); return; }
        activeId = id;
        open();
    }

    function toggleTab(id) {
        if (isOpen && activeId === id) close(); else showTab(id);
    }

    function keyLabel(code) {
        return code ? String(code).replace(/^(Key|Digit|Numpad)/, '') : '';
    }

    function tabLabel(entry) {
        var key = 'tab.' + entry.id;
        var text = SV.i18n.t(key);
        return text === key ? (entry.def.title || entry.id) : text;
    }

    function orderedEntries() {
        var order = cfg.tabOrder || [];
        var rank = function (entry) {
            var i = order.indexOf(entry.id);
            return i < 0 ? order.length + entries.indexOf(entry) : i;
        };
        return entries.slice().sort(function (a, b) { return rank(a) - rank(b); });
    }

    function makeButton(className, text) {
        var btn = dom.el('button', 'sv-btn ' + className, text);
        btn.type = 'button';
        return btn;
    }

    function renderHead() {
        if (!tabsBox) return;
        var i18n = SV.i18n;

        dom.clear(tabsBox);
        orderedEntries().forEach(function (entry) {
            var on = entry.id === activeId;
            var btn = makeButton('sv-tab' + (on ? ' on' : ''), tabLabel(entry));
            btn.setAttribute('role', 'tab');
            btn.setAttribute('aria-selected', on ? 'true' : 'false');

            var hint = keyLabel((cfg.tabKeys || {})[entry.id]);
            if (hint) {
                btn.appendChild(dom.el('span', 'sv-key', hint));
                btn.title = tabLabel(entry) + ' (' + hint + ')';
            }
            btn.addEventListener('click', function () {
                btn.blur();
                if (entry.id !== activeId) showTab(entry.id);
            });
            tabsBox.appendChild(btn);
        });

        dom.clear(langsBox);
        var codes = i18n.languages();
        langsBox.hidden = codes.length < 2;
        codes.forEach(function (code) {
            var on = code === i18n.lang();
            var btn = makeButton('sv-lang' + (on ? ' on' : ''), code.toUpperCase());
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            btn.title = i18n.languageName(code) +
                (cfg.languageKey ? ' (' + keyLabel(cfg.languageKey) + ')' : '');
            btn.addEventListener('click', function () {
                btn.blur();
                i18n.setLanguage(code);
            });
            langsBox.appendChild(btn);
        });

        closeBtn.title = i18n.t('close') + ' (Esc)';
        closeBtn.setAttribute('aria-label', i18n.t('close'));
    }

    function step() {
        if (!game.isMapScene()) { close(); return; }
        var isSlowTick = (++tick % cfg.slowTickEvery === 0);
        var entry = findEntry(activeId);
        if (entry && entry.def.onTick) entry.def.onTick(isSlowTick);
    }

    function open() {
        if (isOpen || !root || !game.isMapScene()) return;
        isOpen = true;
        tick = 0;
        game.clearInput();
        root.classList.add('open');
        root.setAttribute('aria-hidden', 'false');

        entries.forEach(function (entry) {
            if (entry.def.onOpen) entry.def.onOpen();
        });
        setActiveTab(activeId);
        timer = setInterval(step, cfg.tickMs);
    }

    function close() {
        if (!isOpen) return;
        isOpen = false;
        clearInterval(timer);
        timer = null;
        root.classList.remove('open');
        root.setAttribute('aria-hidden', 'true');
        game.clearInput();
    }

    function tabIdForKey(e) {
        var keys = cfg.tabKeys || {};
        return Object.keys(keys).filter(function (id) {
            return keys[id] === e.code && findEntry(id);
        })[0] || null;
    }

    function onKeyDown(e) {
        if (e.ctrlKey || e.altKey || e.metaKey || /^F\d{1,2}$/.test(e.key)) return;

        var tabId = tabIdForKey(e);
        if (tabId) {
            if (isOpen || game.isMapScene()) {
                e.preventDefault();
                e.stopImmediatePropagation();
                if (!e.repeat) toggleTab(tabId);
            }
            return;
        }

        if (!isOpen) return;

        if (cfg.languageKey && e.code === cfg.languageKey) {
            if (!e.repeat) SV.i18n.next();
        } else if (e.key === 'Escape') {
            close();
        }

        e.preventDefault();
        e.stopImmediatePropagation();
    }

    var SHIELDED_EVENTS = [
        'mousedown', 'mouseup', 'mousemove', 'dblclick', 'wheel',
        'touchstart', 'touchmove', 'touchend', 'touchcancel',
        'pointerdown', 'pointerup', 'contextmenu'
    ];

    function bindEvents() {
        window.addEventListener('keydown', onKeyDown, true);

        SHIELDED_EVENTS.forEach(function (type) {
            root.addEventListener(type, function (e) { e.stopPropagation(); });
        });
        root.addEventListener('click', function (e) {
            e.stopPropagation();
            if (e.target === root) close();
        });
        closeBtn.addEventListener('click', function () { closeBtn.blur(); close(); });
    }

    function init() {
        if (root) return;

        root = dom.fromHtml(
            '<div id="spawnViewer" aria-hidden="true">' +
                '<div class="sv-panel" role="dialog" aria-modal="true">' +
                    '<header class="sv-head">' +
                        '<nav class="sv-tabs" role="tablist"></nav>' +
                        '<div class="sv-langs" role="group"></div>' +
                        '<button class="sv-btn sv-close" type="button">✕</button>' +
                    '</header>' +
                '</div>' +
            '</div>'
        );
        panel = root.querySelector('.sv-panel');
        tabsBox = root.querySelector('.sv-tabs');
        langsBox = root.querySelector('.sv-langs');
        closeBtn = root.querySelector('.sv-close');

        entries.forEach(mountTab);
        if (!findEntry(activeId) && entries.length) activeId = entries[0].id;
        applyTabVisibility();
        renderHead();
        bindEvents();
        document.body.appendChild(root);

        if (document.fonts && document.fonts.load) {
            document.fonts.load('16px "SVMegrim"').catch(function () { /* нет файла — запасной шрифт */ });
        }

        SV.i18n.onChange(function () {
            renderHead();
            var entry = findEntry(activeId);
            if (isOpen && entry && entry.def.onShow) entry.def.onShow();
        });
    }

    SV.viewer = {
        registerTab: registerTab,
        setActiveTab: setActiveTab,
        showTab: showTab,
        toggleTab: toggleTab,
        open: open,
        close: close,
        isOpen: function () { return isOpen; }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(window.SpawnViewer = window.SpawnViewer || {});
