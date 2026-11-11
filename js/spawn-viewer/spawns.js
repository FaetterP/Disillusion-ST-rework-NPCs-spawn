(function (SV) {
    'use strict';

    var game = SV.game;
    var sprites = SV.sprites;

    function labelFor(id, eventData, g) {
        var custom = SV.data.npcNames[id];
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
            label: labelFor(id, data, g),
            count: 1
        };
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
        return Object.keys(groups).map(Number).map(function (id) {
            groups[id].forced = forced.indexOf(id) > -1;
            return groups[id];
        }).sort(bySpecialThenId);
    }

    function queue() {
        var pool = game.spawnQueue();
        if (!pool) return null;

        var counts = {};
        pool.forEach(function (id) { counts[id] = (counts[id] || 0) + 1; });

        return Object.keys(counts).map(Number).map(function (id) {
            var entry = describe(id);
            entry.count = counts[id];
            if (entry.special) entry.locked = !game.isSpawnAvailable(id);
            return entry;
        }).sort(bySpecialThenId);
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

    function markers() {
        var out = [];
        game.spawnEvents().forEach(function (event) {
            var entry = describe(game.spawnIdOf(event), liveGraphic(event));
            var pos = positionOf(event);
            entry.x = pos.x;
            entry.y = pos.y;
            out.push(entry);
        });
        return out.sort(function (a, b) { return bySpecialThenId(b, a); });
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
        queue: queue,
        idsOnMap: idsOnMap,
        markers: markers,
        playerMarker: playerMarker
    };

})(window.SpawnViewer = window.SpawnViewer || {});
