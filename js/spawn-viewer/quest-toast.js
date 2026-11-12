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

    function snapshot() {
        try {
            var result = {};
            quests.forEach(function (q) {
                var st = SV.questProgress.stateOf(q);
                var steps = {};
                st.steps.forEach(function (s, i) { steps[st.keys[i]] = !!st.done[i]; });
                result[q.id] = { complete: !!st.complete, locked: !!st.locked, steps: steps };
            });
            return result;
        } catch (err) {
            return null;
        }
    }

    function merge(prev, cur) {
        var steps = {};
        var key;
        for (key in prev.steps) steps[key] = prev.steps[key];
        for (key in cur.steps) {
            steps[key] = (prev.steps[key] === undefined) ? cur.steps[key] : (prev.steps[key] || cur.steps[key]);
        }
        return { complete: prev.complete || cur.complete, locked: cur.locked, steps: steps };
    }

    function stepJustDone(prev, cur) {
        for (var key in cur.steps) {
            if (cur.steps[key] && prev.steps[key] === false) return true;
        }
        return false;
    }

    function enqueue(id, kind) {
        if (kind === 'complete') {
            pending = pending.filter(function (p) { return p.id !== id; });
        } else if (pending.some(function (p) { return p.id === id; })) {
            return;
        }
        pending.push({ id: id, kind: kind });
    }

    function check() {
        var token = game.sessionToken();
        if (!token) return;

        var now = snapshot();
        if (!now) return;

        if (token !== lastToken) {
            lastToken = token;
            known = now;
            pending = [];
            clearToasts();
            return;
        }

        quests.forEach(function (q) {
            var cur = now[q.id];
            var prev = known[q.id];
            if (!prev) {
                known[q.id] = cur;
                return;
            }

            if (cur.complete && !prev.complete) {
                enqueue(q.id, 'complete');
            } else if (!prev.locked && !cur.locked && !cur.complete && stepJustDone(prev, cur)) {
                enqueue(q.id, 'step');
            }

            known[q.id] = merge(prev, cur);
        });

        if (pending.length && game.isMapScene()) {
            pending.splice(0).forEach(function (p) { showToast(p.id, p.kind); });
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

    function showToast(id, kind) {
        var quest = findQuest(id);
        if (!quest || !box) return;

        var toast = dom.el('button', kind === 'step' ? 'sv-toast sv-toast-step' : 'sv-toast');
        toast.type = 'button';
        toast.appendChild(dom.el('span', 'sv-toast-mark', '✓'));
        toast.appendChild(dom.el('span', 'sv-toast-text', SV.i18n.t(kind === 'step' ? 'toast.step' : 'toast.complete')));

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
