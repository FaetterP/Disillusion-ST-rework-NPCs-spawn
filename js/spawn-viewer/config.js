(function (SV) {
    'use strict';

    SV.data = SV.data || {};

    SV.config = {
        tabKeys: { map: 'KeyM', quests: 'KeyJ' },
        languageKey: 'KeyL',
        language: 'ru',

        defaultTab: 'map',

        tabOrder: ['quests', 'map'],
        tickMs: 100,
        slowTickEvery: 4,

        toastMs: 5000,
        toastCheckMs: 500,

        terrain: {
            resolution: 900,
            belowTolerance: 0.6,
            lowObstacle: 0.75,
            charTolerance: 0.6,
            wallShade: 0.45,
            blockedShade: 0.4
        },

        pacifistOffSwitch: 27,

        questGroups: [
            { id: 'items' },
            { id: 'end' }
        ]
    };

})(window.SpawnViewer = window.SpawnViewer || {});
