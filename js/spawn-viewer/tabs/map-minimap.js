(function (SV) {
    'use strict';

    var game = SV.game;
    var cfg = SV.config;
    var sprites = SV.sprites;

    var canvas = null;
    var hits = [];

    function drawMarker(ctx, marker, size, tileSize, pad, ringColor, ringWidth) {
        var cx = pad + (marker.x + 0.5) * tileSize;
        var cy = pad + (marker.y + 0.5) * tileSize;
        var half = size / 2;
        var ring = Math.max(2, Math.round(size / 14));

        ctx.globalAlpha = marker.ghost ? 0.5 : 1;
        ctx.fillStyle = 'rgba(6, 10, 22, .85)';
        ctx.fillRect(cx - half - ring, cy - half - ring, size + ring * 2, size + ring * 2);

        var icon = marker.g && marker.g.name ? sprites.iconSync(marker.g, size) : null;
        if (icon) ctx.drawImage(icon, cx - half, cy - half);

        ctx.lineWidth = ringWidth;
        ctx.strokeStyle = ringColor;
        if (marker.fixed) ctx.setLineDash([4, 3]);
        ctx.strokeRect(cx - half - ring, cy - half - ring, size + ring * 2, size + ring * 2);
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;

        hits.push({
            cx: cx, cy: cy, r: half + ring,
            label: (marker.id ? '#' + marker.id + ' — ' + marker.label : marker.label) +
                (marker.fixed ? ' (' + SV.i18n.t('map.fixed') + ')' : '')
        });
    }

    function ringColorOf(marker) {
        if (marker.fixed) return '#9096a3';
        return marker.special ? '#dcb85a' : 'rgba(190, 205, 235, .45)';
    }

    function attach(target) {
        canvas = target;
        canvas.addEventListener('mousemove', function (e) {
            var rect = canvas.getBoundingClientRect();
            var px = (e.clientX - rect.left) * (canvas.width / rect.width);
            var py = (e.clientY - rect.top) * (canvas.height / rect.height);
            var label = '';
            for (var i = hits.length - 1; i >= 0; i--) {
                if (Math.abs(px - hits[i].cx) <= hits[i].r && Math.abs(py - hits[i].cy) <= hits[i].r) {
                    label = hits[i].label;
                    break;
                }
            }
            canvas.title = label;
        });
    }

    function resetCache() {
        SV.terrain.reset();
    }

    function layoutFor(w, h) {
        var res = cfg.terrain.resolution;
        var pad = Math.round(res / 24);
        var usable = res - 2 * pad;
        var tileSize = Math.max(2, Math.min(SV.terrain.maxTileSize(), Math.floor(Math.min(usable / w, usable / h))));
        return { pad: pad, tileSize: tileSize };
    }

    function markerSizeFor(cw, ch) {
        return Math.max(22, Math.min(56, Math.round(26 * Math.max(cw, ch) / 460)));
    }

    function draw() {
        var w = game.mapWidth(), h = game.mapHeight();
        var ready = SV.terrain.isAvailable();
        var lay = layoutFor(w, h);
        var pad = lay.pad, tileSize = lay.tileSize;

        var cw = w * tileSize + 2 * pad;
        var ch = h * tileSize + 2 * pad;
        if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }

        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, cw, ch);
        var ground = ready ? SV.terrain.render(tileSize) : null;
        if (ground) ctx.drawImage(ground, pad, pad);

        var markerSize = markerSizeFor(cw, ch);

        hits = [];
        SV.spawns.markers().forEach(function (m) {
            if (!SV.terrain.isOnLevel(m.z)) return;
            drawMarker(ctx, m, markerSize, tileSize, pad, ringColorOf(m), m.special || m.fixed ? 2 : 1);
        });

        var player = SV.spawns.playerMarker();
        if (player) drawMarker(ctx, player, markerSize, tileSize, pad, '#8bb8ff', 2);
    }

    SV.minimap = {
        attach: attach,
        resetCache: resetCache,
        draw: draw
    };

})(window.SpawnViewer = window.SpawnViewer || {});
