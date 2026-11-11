(function (SV) {
    'use strict';

    var game = SV.game;
    var cfg = SV.config;
    var sprites = SV.sprites;

    var canvas = null;
    var terrain = null; // { key, canvas }
    var hits = [];

    function buildTerrain(w, h, tileSize) {
        var c = document.createElement('canvas');
        c.width = w * tileSize;
        c.height = h * tileSize;
        var ctx = c.getContext('2d');

        ctx.fillStyle = '#0c0d12';
        ctx.fillRect(0, 0, c.width, c.height);

        ctx.fillStyle = '#2a2f40';
        var gap = tileSize >= 6 ? 1 : 0;
        for (var y = 0; y < h; y++) {
            for (var x = 0; x < w; x++) {
                if (game.isTilePassable(x, y)) {
                    ctx.fillRect(x * tileSize, y * tileSize, tileSize - gap, tileSize - gap);
                }
            }
        }
        return c;
    }

    function drawMarker(ctx, marker, size, tileSize, ringColor, ringWidth) {
        var cx = 20 + (marker.x + 0.5) * tileSize;
        var cy = 20 + (marker.y + 0.5) * tileSize;
        var half = size / 2;

        ctx.globalAlpha = marker.ghost ? 0.5 : 1;
        ctx.fillStyle = 'rgba(10, 11, 16, .82)';
        ctx.fillRect(cx - half - 2, cy - half - 2, size + 4, size + 4);

        var icon = marker.g && marker.g.name ? sprites.iconSync(marker.g, size) : null;
        if (icon) ctx.drawImage(icon, cx - half, cy - half);

        ctx.lineWidth = ringWidth;
        ctx.strokeStyle = ringColor;
        ctx.strokeRect(cx - half - 2, cy - half - 2, size + 4, size + 4);
        ctx.globalAlpha = 1;

        hits.push({
            cx: cx, cy: cy, r: half + 2,
            label: marker.id ? '#' + marker.id + ' — ' + marker.label : marker.label
        });
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
        terrain = null;
    }

    function draw() {
        var w = game.mapWidth(), h = game.mapHeight();
        var usable = 480 - 2 * 20;
        var tileSize = Math.max(2, Math.floor(Math.min(usable / w, usable / h)));
        var markerSize = Math.max(22, Math.min(32, tileSize));

        var cw = w * tileSize + 2 * 20;
        var ch = h * tileSize + 2 * 20;
        if (canvas.width !== cw || canvas.height !== ch) { canvas.width = cw; canvas.height = ch; }

        var key = game.mapId() + '|' + tileSize;
        if (!terrain || terrain.key !== key) terrain = { key: key, canvas: buildTerrain(w, h, tileSize) };

        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, cw, ch);
        ctx.drawImage(terrain.canvas, 20, 20);

        hits = [];
        SV.spawns.markers().forEach(function (m) {
            drawMarker(ctx, m, markerSize, tileSize, m.special ? '#e0b84c' : 'rgba(255, 255, 255, .4)', m.special ? 2 : 1);
        });

        var player = SV.spawns.playerMarker();
        if (player) drawMarker(ctx, player, markerSize, tileSize, '#5ec8ff', 2);
    }

    SV.minimap = { attach: attach, resetCache: resetCache, draw: draw };

})(window.SpawnViewer = window.SpawnViewer || {});
