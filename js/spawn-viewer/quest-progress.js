(function (SV) {
    'use strict';

    var game = SV.game;
    var cfg = SV.config;

    function evaluate(cond) {
        if (cond.variable != null) return game.variableValue(cond.variable) >= cond.atLeast;
        if (cond.item != null)     return game.hasItem(cond.item);
        if (cond.switch != null)   return game.isSwitchOn(cond.switch);
        if (cond.all)              return cond.all.every(evaluate);
        if (cond.any)              return cond.any.some(evaluate);
        if (cond.not)              return !evaluate(cond.not);
        if (cond.items)            return cond.items.every(game.hasItem);
        return false;
    }

    function itemCount(cond) {
        if (!cond || !cond.items) return null;
        return { have: cond.items.filter(game.hasItem).length, total: cond.items.length };
    }

    function currentMode() {
        return game.isSwitchOn(cfg.pacifistOffSwitch) ? 'combat' : 'pacifist';
    }

    function stateOf(quest) {
        var mode = currentMode();
        var keys = [];
        var steps = quest.steps.filter(function (s, k) {
            var ok = (!s.mode || s.mode === mode) && (!s.branch || evaluate(s.branch));
            if (ok) keys.push(k);
            return ok;
        });
        var fired = steps.map(function (s) { return s.when ? evaluate(s.when) : null; });
        var questDone = quest.completedWhen ? evaluate(quest.completedWhen) : false;
        var locked = !!quest.unlockedWhen && !questDone && !evaluate(quest.unlockedWhen);

        var done = new Array(steps.length);
        var laterStepFired = false;
        var i;
        for (i = steps.length - 1; i >= 0; i--) {
            done[i] = questDone || laterStepFired || fired[i] === true;
            if (fired[i] === true && !steps[i].standalone) laterStepFired = true;
        }

        var current = -1, doneCount = 0;
        for (i = 0; i < steps.length; i++) {
            if (done[i]) doneCount++;
            else if (current < 0) current = i;
        }

        var shown = steps.length;
        if (!(questDone || (current < 0 && steps.length > 0))) {
            var last = current;
            while (last < steps.length - 1 && !steps[last].when) last++;
            shown = last + 1;
        }

        if (locked) shown = 0;

        return {
            locked: locked,
            steps: steps,
            keys: keys,
            done: done,
            current: current,
            required: steps.length,
            doneRequired: doneCount,
            shown: shown,
            complete: !locked && (questDone || (current < 0 && steps.length > 0))
        };
    }

    var neededCache = { frame: -1, ids: null };

    function neededIds() {
        var frame = (typeof Graphics !== 'undefined' && Graphics.frameCount != null) ? Graphics.frameCount : -1;
        if (frame >= 0 && neededCache.frame === frame && neededCache.ids) return neededCache.ids;

        var ids = {};
        (SV.data.quests || []).forEach(function (quest) {
            var state = stateOf(quest);
            if (state.complete) return;
            state.steps.forEach(function (step, i) {
                if (state.done[i]) return;
                (step.npcs || []).forEach(function (npc) { ids[npc] = true; });
            });
        });
        neededCache = { frame: frame, ids: ids };
        return ids;
    }

    function isNpcNeeded(id) {
        return !!neededIds()[id];
    }

    SV.questProgress = {
        evaluate: evaluate,
        itemCount: itemCount,
        stateOf: stateOf,
        isNpcNeeded: isNpcNeeded
    };

})(window.SpawnViewer = window.SpawnViewer || {});
