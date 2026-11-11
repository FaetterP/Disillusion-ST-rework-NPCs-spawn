(function (SV) {
    'use strict';

    SV.data = SV.data || {};

    SV.config = {
        tabKeys: { map: 'KeyM', quests: 'KeyJ' },
        languageKey: 'KeyL',
        language: 'ru',

        defaultTab: 'map',

        tickMs: 100,
        slowTickEvery: 4,

        toastMs: 5000,
        toastCheckMs: 500,

        pacifistOffSwitch: 27,

        questGroups: [
            { id: 'items' },
            { id: 'end' }
        ]
    };

})(window.SpawnViewer = window.SpawnViewer || {});
