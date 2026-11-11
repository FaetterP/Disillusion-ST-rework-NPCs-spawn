(function (SV) {
    'use strict';

    var cfg = SV.config;
    var game = SV.game;
    var dom = SV.dom;

    var entries = []; // { id, def, pane }[]
    var activeId = cfg.defaultTab;

    var root = null, panel = null;
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
        root.querySelector('.sv-close').addEventListener('click', close);
    }

    function init() {
        if (root) return;

        root = dom.fromHtml(
            '<div id="spawnViewer" aria-hidden="true">' +
                '<div class="sv-panel" role="dialog">' +
                    '<button class="sv-close" type="button">✕</button>' +
                '</div>' +
            '</div>'
        );
        panel = root.querySelector('.sv-panel');

        entries.forEach(mountTab);
        if (!findEntry(activeId) && entries.length) activeId = entries[0].id;
        applyTabVisibility();
        bindEvents();
        document.body.appendChild(root);

        SV.i18n.onChange(function () {
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
