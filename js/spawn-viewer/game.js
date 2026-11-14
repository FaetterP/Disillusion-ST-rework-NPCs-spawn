(function (SV) {
    'use strict';

    function isMapScene() {
        return typeof SceneManager !== 'undefined' && typeof Scene_Map !== 'undefined' &&
            SceneManager._scene instanceof Scene_Map &&
            typeof $gameMap !== 'undefined' && !!$gameMap;
    }

    function clearInput() {
        if (typeof Input !== 'undefined' && Input.clear) Input.clear();
    }

    function mapId()     { return $gameMap.mapId(); }
    function mapWidth()  { return $gameMap.width(); }
    function mapHeight() { return $gameMap.height(); }

    function isTilePassable(x, y) {
        try {
            return $gameMap.isPassable(x, y, 2) || $gameMap.isPassable(x, y, 4) ||
                   $gameMap.isPassable(x, y, 6) || $gameMap.isPassable(x, y, 8);
        } catch (err) {
            return false;
        }
    }

    function player() {
        return (typeof $gamePlayer !== 'undefined' && $gamePlayer) ? $gamePlayer : null;
    }

    function hasSpawnPlugin() {
        return typeof Galv !== 'undefined' && !!Galv.SPAWN;
    }

    function spawnEvents() {
        return $gameMap.events().filter(function (e) {
            return e.isSpawnEvent && !e._erased;
        });
    }

    function fixedEventIds() {
        var table = (SV.data && SV.data.fixedEvents) || {};
        var list = table[$gameMap.mapId()];
        return Array.isArray(list) ? list : [];
    }

    function fixedEvents() {
        var seen = {};
        return fixedEventIds().filter(function (id) {
            if (seen[id]) return false;
            seen[id] = true;
            return true;
        }).map(function (id) {
            return $gameMap.event(id);
        }).filter(function (event) {
            return !!event && !event.isSpawnEvent && !event._erased;
        });
    }

    function spawnIdOf(event) {
        return event._spawnEventId;
    }

    function spawnEventData(id) {
        var map = (typeof $dataSpawnMap !== 'undefined') ? $dataSpawnMap : null;
        return (map && map.events) ? (map.events[id] || null) : null;
    }

    function isImportantSpawn(id) {
        try {
            if (hasSpawnPlugin() && typeof Galv.SPAWN.isImportant === 'function') {
                return !!Galv.SPAWN.isImportant(id);
            }
        } catch (err) { }
        return false;
    }

    function forcedSpawnIds() {
        var visit = hasSpawnPlugin() ? Galv.SPAWN.visit : null;
        return (visit && visit.mapId === $gameMap.mapId() && visit.forced) ? visit.forced : [];
    }

    function isSpawnAvailable(id) {
        try {
            if (hasSpawnPlugin() && typeof Galv.SPAWN.isAvailable === 'function') {
                return !!Galv.SPAWN.isAvailable(id);
            }
        } catch (err) { }
        return true;
    }

    function spawnList(name) {
        if (!hasSpawnPlugin() || typeof Galv.SPAWN[name] !== 'function') return null;
        try {
            return Galv.SPAWN[name]();
        } catch (err) {
            return null;
        }
    }

    function spawnPool()    { return spawnList('availableIds'); }
    function waitingSpawns() { return spawnList('waitingIds'); }

    function activePageImage(eventData) {
        var pages = eventData.pages || [];
        var probe = { _mapId: $gameMap.mapId(), _eventId: 0 };
        try {
            for (var i = pages.length - 1; i >= 0; i--) {
                if (Game_Event.prototype.meetsConditions.call(probe, pages[i])) return pages[i].image;
            }
        } catch (err) { }
        return null;
    }

    function sessionToken() {
        return (typeof $gameVariables !== 'undefined' && $gameVariables) ? $gameVariables : null;
    }

    function hasItem(id) {
        return !!$dataItems[id] && $gameParty.hasItem($dataItems[id]);
    }
    function variableValue(id) { return $gameVariables.value(id); }
    function isSwitchOn(id)    { return !!$gameSwitches.value(id); }

    function loadCharacterBitmap(name) {
        return ImageManager.loadCharacter(name);
    }

    SV.game = {
        isMapScene: isMapScene,
        clearInput: clearInput,

        mapId: mapId,
        mapWidth: mapWidth,
        mapHeight: mapHeight,
        isTilePassable: isTilePassable,
        player: player,

        hasSpawnPlugin: hasSpawnPlugin,
        spawnEvents: spawnEvents,
        fixedEventIds: fixedEventIds,
        fixedEvents: fixedEvents,
        spawnIdOf: spawnIdOf,
        spawnEventData: spawnEventData,
        isImportantSpawn: isImportantSpawn,
        forcedSpawnIds: forcedSpawnIds,
        isSpawnAvailable: isSpawnAvailable,
        spawnPool: spawnPool,
        waitingSpawns: waitingSpawns,
        activePageImage: activePageImage,

        sessionToken: sessionToken,
        hasItem: hasItem,
        variableValue: variableValue,
        isSwitchOn: isSwitchOn,

        loadCharacterBitmap: loadCharacterBitmap
    };

})(window.SpawnViewer = window.SpawnViewer || {});
