(function (SV) {
    'use strict';

    var game = SV.game;

    var iconCache = {};
    var iconPending = {};

    function create(name, index, dir, pattern, tileId) {
        return {
            name: name || '',
            index: index | 0,
            dir: dir || 2,
            pattern: pattern == null ? 1 : pattern,
            tileId: tileId | 0
        };
    }

    function fromEventImage(image) {
        return create(image.characterName, image.characterIndex, image.direction, image.pattern, image.tileId);
    }

    function isDrawable(g) {
        return !!g && (!!g.name || g.tileId > 0);
    }

    function iconKey(g, size) {
        return [g.name, g.index, g.dir, g.pattern, size].join('|');
    }

    function renderFrame(bitmap, g, size) {
        var src = bitmap._image || bitmap.image || bitmap._canvas || bitmap.canvas;
        var sw = src.naturalWidth || src.width;
        var sh = src.naturalHeight || src.height;

        var prefix = /^[!$]+/.exec(g.name);
        var isBig = !!prefix && prefix[0].indexOf('$') > -1;
        var cols = isBig ? 3 : 12, rows = isBig ? 4 : 8;
        var pw = sw / cols, ph = sh / rows;
        var n = isBig ? 0 : g.index;
        var sx = ((n % 4) * 3 + g.pattern) * pw;
        var sy = (Math.floor(n / 4) * 4 + (g.dir - 2) / 2) * ph;

        var fw = Math.max(1, Math.round(pw)), fh = Math.max(1, Math.round(ph));
        var frame = document.createElement('canvas');
        frame.width = fw; frame.height = fh;
        var fctx = frame.getContext('2d');
        fctx.drawImage(src, sx, sy, pw, ph, 0, 0, fw, fh);

        var box = trimTransparent(fctx, fw, fh);
        if (!box) return null;

        var out = document.createElement('canvas');
        out.width = out.height = size;
        var octx = out.getContext('2d');
        var scale = Math.min((size - 2) / box.w, (size - 2) / box.h);
        if (scale >= 1) scale = Math.floor(scale);
        var dw = box.w * scale, dh = box.h * scale;
        octx.imageSmoothingEnabled = false;
        octx.drawImage(frame, box.x, box.y, box.w, box.h, (size - dw) / 2, (size - dh) / 2, dw, dh);
        return out;
    }

    function trimTransparent(ctx, w, h) {
        try {
            var data = ctx.getImageData(0, 0, w, h).data;
            var x0 = w, y0 = h, x1 = -1, y1 = -1;
            for (var y = 0; y < h; y++) {
                for (var x = 0; x < w; x++) {
                    if (data[(y * w + x) * 4 + 3] > 8) {
                        if (x < x0) x0 = x;
                        if (x > x1) x1 = x;
                        if (y < y0) y0 = y;
                        if (y > y1) y1 = y;
                    }
                }
            }
            if (x1 < 0) return null;
            return { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
        } catch (err) {
            return { x: 0, y: 0, w: w, h: h };
        }
    }

    function loadIcon(g, size, done) {
        var key = iconKey(g, size);
        if (key in iconCache) { done(iconCache[key]); return; }
        var bitmap = game.loadCharacterBitmap(g.name);
        bitmap.addLoadListener(function () {
            var out = null;
            try {
                out = renderFrame(bitmap, g, size);
            } catch (err) {
                console.warn('[SpawnViewer] icon failed:', g.name, err);
            }
            iconCache[key] = out;
            done(out);
        });
    }

    function iconSync(g, size) {
        var key = iconKey(g, size);
        if (key in iconCache) return iconCache[key];
        if (!iconPending[key]) {
            iconPending[key] = true;
            loadIcon(g, size, function () { delete iconPending[key]; });
        }
        return null;
    }

    function paintIcon(canvas, g, size) {
        canvas.width = canvas.height = size;
        var ctx = canvas.getContext('2d');

        function drawBlank() {
            ctx.fillStyle = '#5b6174';
            ctx.font = Math.round(size * 0.5) + 'px serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('∅', size / 2, size / 2);
        }

        if (!g || !g.name) { drawBlank(); return; }
        loadIcon(g, size, function (out) {
            if (out) ctx.drawImage(out, 0, 0); else drawBlank();
        });
    }

    SV.sprites = {
        create: create,
        fromEventImage: fromEventImage,
        isDrawable: isDrawable,
        iconSync: iconSync,
        paintIcon: paintIcon
    };

})(window.SpawnViewer = window.SpawnViewer || {});
