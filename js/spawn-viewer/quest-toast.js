(function (SV) {
    'use strict';

    var cfg = SV.config;
    var game = SV.game;
    var dom = SV.dom;
    var quests = SV.data.quests;

    var MAX_VISIBLE = 4;

    var box = null;
    var lastToken = null;
    var known = {};
    var pending = [];

    function completedIds() {
        try {
            var result = {};
            quests.forEach(function (q) {
                if (SV.questProgress.stateOf(q).complete) result[q.id] = true;
            });
            return result;
        } catch (err) {
            return null;
        }
    }

    function check() {
        var token = game.sessionToken();
        if (!token) return;

        var now = completedIds();
        if (!now) return;

        if (token !== lastToken) {
            lastToken = token;
            known = now;
            pending = [];
            clearToasts();
            return;
        }

        quests.forEach(function (q) {
            if (now[q.id] && !known[q.id]) {
                known[q.id] = true;
                pending.push(q.id);
            }
        });

        if (pending.length && game.isMapScene()) {
            pending.splice(0).forEach(showToast);
        }
    }

    function findQuest(id) {
        return quests.filter(function (q) { return q.id === id; })[0];
    }

    function clearToasts() {
        if (box) dom.clear(box);
    }

    function removeToast(toast) {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }

    function openQuest(id) {
        if (!game.isMapScene()) return;
        SV.questsTab.select(id);
        SV.viewer.showTab('quests');
    }

    function showToast(id) {
        var quest = findQuest(id);
        if (!quest || !box) return;

        var toast = dom.el('button', 'sv-toast');
        toast.type = 'button';
        toast.appendChild(dom.el('span', 'sv-toast-mark', '✓'));
        toast.appendChild(dom.el('span', 'sv-toast-text', SV.i18n.t('toast.complete')));

        toast.style.animation = 'svToastIn .2s ease-out, svToastOut .3s ease-in ' +
            Math.max(0, cfg.toastMs - 300) + 'ms forwards';
        var timer = setTimeout(function () { removeToast(toast); }, cfg.toastMs);
        toast.addEventListener('click', function (e) {
            e.stopPropagation();
            clearTimeout(timer);
            removeToast(toast);
            openQuest(id);
        });

        box.appendChild(toast);
        while (box.children.length > MAX_VISIBLE) removeToast(box.children[0]);
    }

    var SHIELDED_EVENTS = [
        'mousedown', 'mouseup', 'mousemove', 'dblclick', 'wheel',
        'touchstart', 'touchmove', 'touchend', 'touchcancel',
        'pointerdown', 'pointerup', 'contextmenu'
    ];

    function init() {
        if (box) return;
        box = dom.el('div', '');
        box.id = 'svToasts';
        SHIELDED_EVENTS.forEach(function (type) {
            box.addEventListener(type, function (e) { e.stopPropagation(); });
        });
        document.body.appendChild(box);
        setInterval(check, cfg.toastCheckMs);
    }

    SV.questToast = { check: check };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(window.SpawnViewer = window.SpawnViewer || {});
