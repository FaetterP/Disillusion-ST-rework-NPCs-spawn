(function (SV) {
    'use strict';

    var cfg = SV.config;
    var dom = SV.dom;
    var el = dom.el;

    var t = SV.i18n.t;

    var hereBox, queueBox, hereTitle, queueTitle;
    var lastSignature = {}; // { here, queue }

    function build() {
        var pane = dom.fromHtml(
            '<div class="sv-body">' +
                '<div class="sv-mapwrap"><canvas class="sv-mini" width="1" height="1"></canvas></div>' +
                '<div class="sv-lists">' +
                    '<section class="sv-sec sv-here"><h3></h3><div class="sv-grid sv-here-grid"></div></section>' +
                    '<section class="sv-sec sv-queue"><h3></h3><div class="sv-grid sv-queue-grid"></div></section>' +
                '</div>' +
            '</div>'
        );
        hereBox = pane.querySelector('.sv-here-grid');
        queueBox = pane.querySelector('.sv-queue-grid');
        hereTitle = pane.querySelector('.sv-here h3');
        queueTitle = pane.querySelector('.sv-queue h3');
        SV.minimap.attach(pane.querySelector('.sv-mini'));
        applyLabels();
        return pane;
    }

    function applyLabels() {
        hereTitle.textContent = t('map.here');
        queueTitle.textContent = t('map.queue');
    }

    function cellTooltip(entry) {
        return '#' + entry.id + ' — ' + entry.label +
            (entry.special ? ' (' + t('map.important') + ')' : '') +
            (entry.count > 1 ? ' ×' + entry.count : '') +
            (entry.forced ? ' — ' + t('map.forced') : '') +
            (entry.locked ? ' — ' + t('map.locked') : '') +
            (entry.ghost ? ' — ' + t('map.ghost') : '');
    }

    function makeCell(entry) {
        var cell = el('div', 'sv-cell' +
            (entry.special ? ' sv-special' : '') +
            (entry.ghost ? ' sv-ghost' : '') +
            (entry.locked ? ' sv-locked' : ''));
        cell.title = cellTooltip(entry);

        var icon = el('canvas', 'sv-icon');
        SV.sprites.paintIcon(icon, entry.g, 36);
        cell.appendChild(icon);

        if (entry.count > 1) cell.appendChild(el('span', 'sv-badge', '×' + entry.count));
        cell.appendChild(el('div', 'sv-name', entry.label));
        return cell;
    }

    function fillGrid(box, entries, emptyText) {
        dom.clear(box);
        if (!entries || !entries.length) {
            box.appendChild(el('div', 'sv-empty-note', emptyText));
            return;
        }
        entries.forEach(function (entry) { box.appendChild(makeCell(entry)); });
    }

    function signatureOf(entries) {
        return entries.map(function (d) {
            var g = d.g;
            return [d.id, d.count, d.ghost ? 1 : 0, d.special ? 1 : 0, d.locked ? 1 : 0, d.forced ? 1 : 0,
                g ? [g.name, g.index, g.dir, g.pattern].join(':') : ''].join('|');
        }).join(',');
    }

    function refreshLists(force) {
        var here = SV.spawns.onMap();
        var queue = SV.spawns.queue();

        var hereSig = signatureOf(here);
        var queueSig = queue ? signatureOf(queue) : 'null';

        if (force || hereSig !== lastSignature.here) {
            fillGrid(hereBox, here, t('map.nobody'));
            lastSignature.here = hereSig;
        }
        if (force || queueSig !== lastSignature.queue) {
            fillGrid(queueBox, queue, queue === null ? t('map.noPlugin') : t('map.queueEmpty'));
            lastSignature.queue = queueSig;
        }
    }

    SV.viewer.registerTab({
        id: 'map',
        build: build,
        onOpen: function () { SV.minimap.resetCache(); },
        onShow: function () {
            applyLabels();
            lastSignature = {};
            refreshLists(true);
            SV.minimap.draw();
        },
        onTick: function (isSlowTick) {
            SV.minimap.draw();
            if (isSlowTick) refreshLists(false);
        }
    });

})(window.SpawnViewer = window.SpawnViewer || {});
