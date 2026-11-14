(function (SV) {
    'use strict';

    var game = SV.game;
    var sprites = SV.sprites;

    function labelFor(id, eventData, g, isFixed) {
        var custom = isFixed ? null : SV.data.npcNames[id];
        if (custom) return custom;

        var editorName = eventData && eventData.name ? String(eventData.name).trim() : '';
        if (editorName && !(/^(blank|test|a+|v|ev\d+)$/i).test(editorName)) return editorName;

        if (g && g.name) return g.name.replace(/^[!$]+/, '');
        return '—';
    }

    function liveGraphic(event) {
        return sprites.create(
            event.characterName(), event.characterIndex(),
            event._originalDirection, event._originalPattern, event.tileId()
        );
    }

    function activePageGraphic(eventData) {
        var image = game.activePageImage(eventData);
        return image ? sprites.fromEventImage(image) : null;
    }

    function firstGraphic(eventData) {
        var pages = eventData.pages || [];
        for (var i = 0; i < pages.length; i++) {
            var g = sprites.fromEventImage(pages[i].image);
            if (sprites.isDrawable(g)) return g;
        }
        return null;
    }

    function bySpecialThenId(a, b) {
        return (a.special === b.special ? 0 : (a.special ? -1 : 1)) || (a.id - b.id);
    }

    function describe(id, liveGfx) {
        var data = game.spawnEventData(id);
        var g = liveGfx || (data ? activePageGraphic(data) : null);
        var ghost = false;
        if (!sprites.isDrawable(g)) {
            ghost = true;
            g = data ? firstGraphic(data) : null;
        }
        return {
            id: id,
            g: g,
            ghost: ghost,
            special: game.isImportantSpawn(id),
            locked: false,
            forced: false,
            fixed: false,
            label: labelFor(id, data, g),
            count: 1
        };
    }

    function describeFixed(event) {
        var id = event.eventId();
        var data = event.event();
        var g = liveGraphic(event);
        var ghost = false;
        if (!sprites.isDrawable(g)) {
            ghost = true;
            g = data ? firstGraphic(data) : null;
        }
        return {
            id: id,
            g: g,
            ghost: ghost,
            special: false,
            locked: false,
            forced: false,
            fixed: true,
            label: labelFor(id, data, g, true),
            count: 1
        };
    }

    function fixedEntries() {
        return game.fixedEvents().map(describeFixed).sort(function (a, b) { return a.id - b.id; });
    }

    function onMap() {
        var groups = {};
        game.spawnEvents().forEach(function (event) {
            var id = game.spawnIdOf(event);
            if (!groups[id]) {
                groups[id] = describe(id, liveGraphic(event));
                groups[id].count = 0;
            }
            groups[id].count++;
        });

        var forced = game.forcedSpawnIds();
        var spawned = Object.keys(groups).map(Number).map(function (id) {
            groups[id].forced = forced.indexOf(id) > -1;
            return groups[id];
        }).sort(bySpecialThenId);
        return spawned.concat(fixedEntries());
    }

    function listOf(ids, decorate) {
        if (!ids) return null;
        return ids.map(function (id) {
            var entry = describe(id);
            decorate(entry);
            return entry;
        }).sort(bySpecialThenId);
    }

    function pool() {
        return listOf(game.spawnPool(), function (entry) {
            if (entry.special) entry.locked = !game.isSpawnAvailable(entry.id);
        });
    }

    function waiting() {
        return listOf(game.waitingSpawns(), function (entry) {
            entry.spent = true;
        });
    }

    function idsOnMap() {
        var out = {};
        game.spawnEvents().forEach(function (event) {
            out[game.spawnIdOf(event)] = true;
        });
        return out;
    }

    function positionOf(character) {
        return {
            x: character._realX != null ? character._realX : character.x,
            y: character._realY != null ? character._realY : character.y
        };
    }

    function withPosition(entry, event) {
        var pos = positionOf(event);
        entry.x = pos.x;
        entry.y = pos.y;
        return entry;
    }

    function markers() {
        var fixed = game.fixedEvents().map(function (event) {
            return withPosition(describeFixed(event), event);
        });
        var spawned = game.spawnEvents().map(function (event) {
            return withPosition(describe(game.spawnIdOf(event), liveGraphic(event)), event);
        }).sort(function (a, b) { return bySpecialThenId(b, a); });
        return fixed.concat(spawned);
    }

    function playerMarker() {
        var player = game.player();
        if (!player) return null;

        var name = player.characterName ? player.characterName() : '';
        var pos = positionOf(player);
        return {
            id: 0,
            label: SV.i18n.t('player'),
            special: false,
            ghost: false,
            x: pos.x,
            y: pos.y,
            g: name ? sprites.create(name, player.characterIndex(), 2, 1) : null
        };
    }

    SV.spawns = {
        describe: describe,
        onMap: onMap,
        pool: pool,
        waiting: waiting,
        idsOnMap: idsOnMap,
        markers: markers,
        playerMarker: playerMarker
    };

})(window.SpawnViewer = window.SpawnViewer || {});
