(function (SV) {
    'use strict';

    var game = SV.game;
    var cfg = SV.config;

    var TYPE_VOID = 0, TYPE_FLOOR = 1, TYPE_WALL = 2;
    var BACKGROUND = '#060a14';

    var state = {
        data: null,
        level: { lo: 0, hi: 0, ch: 1 }
    };

    function setting(name, fallback) {
        var t = cfg.terrain || {};
        return t[name] != null ? t[name] : fallback;
    }

    function mapKey() {
        return game.mapId() + '|' + game.tilesetId();
    }

    function isObjectShape(E, shape) {
        return !!shape && shape !== E.FLAT && shape !== E.SLOPE;
    }

    function slopeGradient(M, rec, conf, rampData) {
        try {
            var opts = { data: conf, slopeData: rampData.data };
            var d = 0.4;
            var hxp = M.getSlopeHeight(rec.x + d, rec.y, rec.l, opts);
            var hxm = M.getSlopeHeight(rec.x - d, rec.y, rec.l, opts);
            var hyp = M.getSlopeHeight(rec.x, rec.y + d, rec.l, opts);
            var hym = M.getSlopeHeight(rec.x, rec.y - d, rec.l, opts);
            var gx = hxp - hxm, gy = hyp - hym;
            if (isFinite(gx) && isFinite(gy) && Math.abs(gx) + Math.abs(gy) > 1e-4) {
                return { x: gx, y: gy };
            }
        } catch (err) { }
        return null;
    }

    function buildCell(M, x, y) {
        var E = M.enumShapes, P = M.enumPassage;
        var tiles = M.getTileData(x, y);

        var recs = [];
        var ground = { z1: -Infinity, z2: 0, l: 0 };
        var boxes = [ground];
        var last = ground;
        var zv = 0;
        var zc = 0;

        for (var l = 0; l < 4; l++) {
            var id = tiles[l] || 0;
            var empty = M.isTileEmpty(id);
            if (empty && l > 0) continue;

            var conf = M.getTileConfig(id, x, y, l);
            if (conf.tileOffset) continue;

            var passage = M.getTilePassage(id, conf);
            var fringe = M.getTileFringe(x, y, l, conf) || 0;
            var hh = M.getTileHeight(x, y, l, conf) || 0;
            var shape = conf.shape;
            var isSlope = shape === E.SLOPE;
            var slopeH = isSlope ? (M.getConfig(conf, 'slopeHeight', 1) || 1) : 0;

            var skip = passage === P.THROUGH;
            var hc = hh;
            if (skip) hc = 0; else if (isSlope) hc = hh - slopeH;
            zc += fringe;
            if (!skip) {
                if (hc < 0) {
                    if (fringe + hc < 0) last.z2 += fringe + hc;
                } else if (l === 0) {
                    ground.z2 = zc + hc;
                } else {
                    last = { z1: zc, z2: zc + hc, l: l };
                    boxes.push(last);
                }
                zc += hc;
                last.l = l;
            }

            zv += fringe + hh;
            if (empty) continue;

            var rec = {
                l: l, id: id, x: x, y: y,
                top: zv, base: zv - hh,
                a: zv, b: zv,
                pass: passage,
                obj: isObjectShape(E, shape),
                slope: null,
                tex: null
            };
            if (isSlope) {
                var ramp = M.getRampData(x, y, l, conf);
                if (ramp) {
                    rec.a = ramp.z1;
                    rec.b = ramp.z2;
                    rec.slope = { grad: slopeGradient(M, rec, conf, ramp) };
                }
            }
            recs.push(rec);
        }

        return recs.length ? { recs: recs, boxes: boxes } : null;
    }

    function buildFlatCell(M, x, y) {
        var tiles = M.getTileData(x, y);
        var recs = [];
        for (var l = 0; l < 4; l++) {
            var id = tiles[l] || 0;
            if (M.isTileEmpty(id)) continue;
            recs.push({
                l: l, id: id, x: x, y: y,
                top: 0, base: 0, a: 0, b: 0,
                pass: 1, obj: false, slope: null,
                flat: true, tex: null
            });
        }
        if (!recs.length) return null;
        return { recs: recs, boxes: [], blockedFlat: !game.isTilePassable(x, y) };
    }

    function buildData() {
        var M = game.mz3d();
        var d = {
            key: mapKey(),
            w: game.mapWidth(), h: game.mapHeight(),
            tw: game.tileWidth(),
            active: game.mz3dActive(),
            cells: null, sheets: {}, levels: [],
            failed: !M
        };
        if (!M) return d;

        var total = d.w * d.h;
        d.cells = new Array(total);
        var errors = 0;
        for (var y = 0; y < d.h; y++) {
            for (var x = 0; x < d.w; x++) {
                var cell = null;
                try {
                    cell = d.active ? buildCell(M, x, y) : buildFlatCell(M, x, y);
                } catch (err) {
                    if (++errors > 25) {
                        console.warn('[SpawnViewer] terrain: слишком много ошибок, откат на простую карту', err);
                        d.failed = true;
                        return d;
                    }
                }
                d.cells[y * d.w + x] = cell;
            }
        }
        return d;
    }

    function ensureData() {
        var key = mapKey();
        if (!state.data || state.data.key !== key) {
            try {
                state.data = buildData();
            } catch (err) {
                console.warn('[SpawnViewer] terrain: не удалось разобрать карту', err);
                state.data = { key: key, failed: true };
            }
        }
        return state.data;
    }

    function num(v) { return typeof v === 'number' && isFinite(v); }

    function round2(v) { return Math.round(v * 100) / 100; }

    function computeLevel() {
        var level = { lo: 0, hi: 0, ch: 1 };
        var M = game.mz3d();
        var player = game.player();
        if (!M || !player || !game.mz3dActive()) return level;

        var spr = player.mv3d_sprite;
        if (!spr) return level;

        var z = num(spr.platformHeight) ? spr.platformHeight : (num(spr.z) ? spr.z : 0);
        var lo = z, hi = z;

        try {
            var rx = Math.round(player._realX), ry = Math.round(player._realY);
            var ramp = M.isRampAt(rx, ry, z) || M.isRampAt(rx, ry, z - 0.02) || M.isRampAt(rx, ry, z + 0.02);
            if (ramp && num(ramp.z1) && num(ramp.z2)) {
                lo = Math.min(z, ramp.z1);
                hi = Math.max(z, ramp.z2);
            }
        } catch (err) { }

        try {
            var ch = spr.getCHeight();
            if (num(ch)) level.ch = Math.max(0.5, ch);
        } catch (err2) { }

        level.lo = round2(lo);
        level.hi = round2(hi);
        return level;
    }

    function refreshLevel() {
        state.level = computeLevel();
        return state.level;
    }

    function isOnLevel(z) {
        if (!num(z)) return true;
        var lvl = state.level;
        var tol = setting('charTolerance', 0.6);
        return z >= lvl.lo - tol && z <= lvl.hi + tol;
    }

    function settingsFor(lvl, M) {
        var stair = (M && num(M.STAIR_THRESH)) ? M.STAIR_THRESH : 0.1;
        return {
            stair: stair,
            eps: stair + 1e-4,
            below: setting('belowTolerance', 0.6),
            low: setting('lowObstacle', 0.75),
            ch: lvl.ch
        };
    }

    function recOfLayer(recs, l) {
        for (var i = 0; i < recs.length; i++) if (recs[i].l === l) return recs[i];
        return null;
    }

    function byLayer(a, b) { return a.l - b.l; }

    function classify(d, M, cell, lvl, S) {
        var recs = cell.recs;
        var lo = lvl.lo, hi = lvl.hi;
        var WALL = M.enumPassage.WALL;

        if (!d.active) {
            return { type: TYPE_FLOOR, draw: recs, ramp: false, blocked: !!cell.blockedFlat };
        }

        var draw = [], floor = false, ramp = false, blocked = false;
        for (var i = 0; i < recs.length; i++) {
            var rec = recs[i];
            if (rec.obj) {
                if (rec.base >= lo - S.below && rec.base <= hi + S.eps) draw.push(rec);
            } else if (rec.a <= hi + S.eps && rec.b >= lo - S.below) {
                draw.push(rec);
                floor = true;
                if (rec.slope) ramp = true;
            }
            if (rec.pass === WALL && rec.top <= hi + S.eps && rec.top >= lo - S.below) blocked = true;
        }

        var worst = null;
        for (var b = 0; b < cell.boxes.length; b++) {
            var box = cell.boxes[b];
            if (box.z1 < hi + S.ch && box.z2 > hi + S.stair) {
                if (!worst || box.z2 > worst.z2) worst = box;
            }
        }

        if (floor) {
            if (worst) {
                blocked = true;
                if (worst.z2 - hi <= S.low) {
                    var low = recOfLayer(recs, worst.l);
                    if (low && draw.indexOf(low) < 0) { draw.push(low); draw.sort(byLayer); }
                }
            }
            return { type: TYPE_FLOOR, draw: draw, ramp: ramp, blocked: blocked };
        }

        if (worst) {
            var wallRec = recOfLayer(recs, worst.l) || recs[recs.length - 1];
            return { type: TYPE_WALL, wallRec: wallRec, asTop: worst.z2 - hi <= S.low };
        }
        return { type: TYPE_VOID };
    }

    function texRef(conf, side) {
        var r = conf[side + '_rect'];
        return {
            id: conf[side + '_id'],
            img: conf[side + '_img'],
            rect: r ? { x: r.x, y: r.y, w: Math.abs(r.width), h: Math.abs(r.height) } : null
        };
    }

    function texOf(M, rec) {
        if (rec.tex) return rec.tex;
        var t;
        if (rec.flat) {
            t = { top: { id: rec.id }, alpha: 1 };
        } else {
            var conf = M.getTileTextureOffsets(rec.id, rec.x, rec.y, rec.l);
            t = {
                top: texRef(conf, 'top'),
                side: texRef(conf, 'side'),
                slopeTop: rec.slope ? texRef(conf, 'slopeTop') : null,
                alpha: (num(conf.alpha) && conf.alpha < 1) ? Math.max(0, conf.alpha) : 1
            };
        }
        rec.tex = t;
        return t;
    }

    function sheetFor(d, M, name, setN) {
        var key = name ? 'n:' + name : 's:' + setN;
        var s = d.sheets[key];
        if (!s) {
            s = d.sheets[key] = { state: 'loading', src: null, bmp: null };
            try {
                if (name && !(name in M.SETNUMBERS)) {
                    var img = new Image();
                    img.onload = function () { s.src = img; s.state = 'ready'; };
                    img.onerror = function () { s.state = 'failed'; };
                    img.src = M.getTsImgUrl(name);
                } else {
                    var n = name ? M.SETNUMBERS[name] : setN;
                    var file = game.tilesetName(n);
                    if (!file) s.state = 'failed'; else s.bmp = game.loadTileset(file);
                }
            } catch (err) {
                s.state = 'failed';
            }
        }
        if (s.state === 'ready') return s.src;
        if (s.state === 'failed') return null;
        if (s.bmp) {
            if (s.bmp.isError && s.bmp.isError()) { s.state = 'failed'; return null; }
            if (!s.bmp.isReady || s.bmp.isReady()) {
                s.src = s.bmp._image || s.bmp.image || s.bmp._canvas || s.bmp.canvas || null;
                s.state = s.src ? 'ready' : 'failed';
                return s.src;
            }
        }
        return undefined;
    }

    function drawRef(ctx, d, M, ref, px, py, size) {
        if (!ref || M.isTileEmpty(ref.id)) return true;

        if (ref.rect) {
            var img = sheetFor(d, M, ref.img, M.getSetNumber(ref.id));
            if (img === undefined) return false;
            if (img && ref.rect.w > 0 && ref.rect.h > 0) {
                ctx.drawImage(img, ref.rect.x, ref.rect.y, ref.rect.w, ref.rect.h, px, py, size, size);
            }
            return true;
        }

        var scale = size / d.tw;
        var ok = true;
        var rects = M.getTileRects(ref.id);
        for (var i = 0; i < rects.length; i++) {
            var r = rects[i];
            var src = sheetFor(d, M, null, r.setN);
            if (src === undefined) { ok = false; continue; }
            if (!src) continue;
            ctx.drawImage(src, r.x, r.y, r.width, r.height,
                px + r.ox * scale, py + r.oy * scale, r.width * scale, r.height * scale);
        }
        return ok;
    }

    function paintRamp(ctx, rec, px, py, size) {
        var g = rec.slope && rec.slope.grad;
        ctx.save();
        ctx.beginPath();
        ctx.rect(px, py, size, size);
        ctx.clip();

        if (!g) {
            ctx.fillStyle = 'rgba(255, 214, 110, .28)';
            ctx.fillRect(px, py, size, size);
            ctx.restore();
            return;
        }

        var len = Math.sqrt(g.x * g.x + g.y * g.y);
        var ux = g.x / len, uy = g.y / len;
        var cx = px + size / 2, cy = py + size / 2;
        var half = size / 2 * (Math.abs(ux) + Math.abs(uy));

        var grad = ctx.createLinearGradient(cx - ux * half, cy - uy * half, cx + ux * half, cy + uy * half);
        grad.addColorStop(0, 'rgba(0, 0, 0, .58)');
        grad.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
        grad.addColorStop(1, 'rgba(255, 255, 255, .5)');
        ctx.fillStyle = grad;
        ctx.fillRect(px, py, size, size);

        if (size >= 12) {
            var r = size * 0.24;
            var vx = -uy, vy = ux;
            ctx.beginPath();
            ctx.moveTo(cx + ux * r * 1.1, cy + uy * r * 1.1);
            ctx.lineTo(cx - ux * r * 0.7 + vx * r * 0.9, cy - uy * r * 0.7 + vy * r * 0.9);
            ctx.lineTo(cx - ux * r * 0.7 - vx * r * 0.9, cy - uy * r * 0.7 - vy * r * 0.9);
            ctx.closePath();
            ctx.fillStyle = 'rgba(255, 255, 255, .92)';
            ctx.strokeStyle = 'rgba(10, 14, 30, .85)';
            ctx.lineWidth = Math.max(1, size * 0.05);
            ctx.fill();
            ctx.stroke();
        }
        ctx.restore();
    }

    function paintRec(ctx, d, M, rec, px, py, size, useSide) {
        var tex = texOf(M, rec);
        var ref = useSide ? (tex.side || tex.top) : (rec.slope ? (tex.slopeTop || tex.top) : tex.top);

        var prev = ctx.globalAlpha;
        if (tex.alpha < 1) ctx.globalAlpha = prev * tex.alpha;
        var ok = drawRef(ctx, d, M, ref, px, py, size);
        ctx.globalAlpha = prev;

        if (rec.slope && !useSide) paintRamp(ctx, rec, px, py, size);
        return ok;
    }

    function makeHatch() {
        var c = document.createElement('canvas');
        c.width = c.height = 6;
        var g = c.getContext('2d');
        g.strokeStyle = 'rgba(0, 0, 0, .5)';
        g.lineWidth = 1.4;
        g.beginPath();
        g.moveTo(-1, 7); g.lineTo(7, -1);
        g.moveTo(-1, 1); g.lineTo(1, -1);
        g.moveTo(5, 7); g.lineTo(7, 5);
        g.stroke();
        return c;
    }

    function paintLevel(d, M, lvl, size) {
        var canvas = document.createElement('canvas');
        canvas.width = d.w * size;
        canvas.height = d.h * size;
        var ctx = canvas.getContext('2d');
        ctx.fillStyle = BACKGROUND;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = true;
        if ('imageSmoothingQuality' in ctx) ctx.imageSmoothingQuality = 'high';

        var S = settingsFor(lvl, M);
        var wallShade = setting('wallShade', 0.45);
        var blockedShade = setting('blockedShade', 0.4);
        var hatch = size >= 10 ? ctx.createPattern(makeHatch(), 'repeat') : null;

        var types = new Uint8Array(d.w * d.h);
        var ramps = [];
        var complete = true;

        for (var y = 0; y < d.h; y++) {
            for (var x = 0; x < d.w; x++) {
                var i = y * d.w + x;
                var cell = d.cells[i];
                if (!cell) continue;

                var st;
                try {
                    st = classify(d, M, cell, lvl, S);
                } catch (err) { continue; }
                if (st.type === TYPE_VOID) continue;

                var px = x * size, py = y * size;
                types[i] = st.type;

                if (st.type === TYPE_FLOOR) {
                    for (var k = 0; k < st.draw.length; k++) {
                        try {
                            if (!paintRec(ctx, d, M, st.draw[k], px, py, size, false)) complete = false;
                        } catch (err2) { }
                    }
                    if (st.ramp) ramps.push(i);
                    if (st.blocked) {
                        ctx.fillStyle = 'rgba(8, 12, 28, ' + blockedShade + ')';
                        ctx.fillRect(px, py, size, size);
                        if (hatch) { ctx.fillStyle = hatch; ctx.fillRect(px, py, size, size); }
                    }
                } else {
                    try {
                        var rec = st.wallRec;
                        if (rec) {
                            if (!paintRec(ctx, d, M, rec, px, py, size, !st.asTop)) complete = false;
                        }
                    } catch (err3) { }
                    ctx.fillStyle = 'rgba(8, 12, 28, ' + wallShade + ')';
                    ctx.fillRect(px, py, size, size);
                    if (hatch) { ctx.fillStyle = hatch; ctx.fillRect(px, py, size, size); }
                }
            }
        }

        ctx.strokeStyle = 'rgba(0, 0, 0, .7)';
        ctx.lineWidth = Math.max(1, size * 0.1);
        ctx.beginPath();
        for (var wy = 0; wy < d.h; wy++) {
            for (var wx = 0; wx < d.w; wx++) {
                if (types[wy * d.w + wx] !== TYPE_WALL) continue;
                var x0 = wx * size, y0 = wy * size;
                if (wy === 0 || types[(wy - 1) * d.w + wx] !== TYPE_WALL) { ctx.moveTo(x0, y0); ctx.lineTo(x0 + size, y0); }
                if (wy === d.h - 1 || types[(wy + 1) * d.w + wx] !== TYPE_WALL) { ctx.moveTo(x0, y0 + size); ctx.lineTo(x0 + size, y0 + size); }
                if (wx === 0 || types[wy * d.w + wx - 1] !== TYPE_WALL) { ctx.moveTo(x0, y0); ctx.lineTo(x0, y0 + size); }
                if (wx === d.w - 1 || types[wy * d.w + wx + 1] !== TYPE_WALL) { ctx.moveTo(x0 + size, y0); ctx.lineTo(x0 + size, y0 + size); }
            }
        }
        ctx.stroke();

        if (ramps.length) {
            var lw = Math.max(1, size * 0.07);
            ctx.strokeStyle = 'rgba(255, 214, 110, .9)';
            ctx.lineWidth = lw;
            for (var r = 0; r < ramps.length; r++) {
                var rx = (ramps[r] % d.w) * size, ry = Math.floor(ramps[r] / d.w) * size;
                ctx.strokeRect(rx + lw / 2, ry + lw / 2, size - lw, size - lw);
            }
        }

        return { canvas: canvas, complete: complete };
    }

    function isAvailable() {
        if (!game.mz3d()) return false;
        var d = ensureData();
        return !!d && !d.failed;
    }

    function render(size) {
        if (!isAvailable()) return null;
        var d = state.data;
        var M = game.mz3d();
        var lvl = refreshLevel();

        var key = size + '|' + lvl.lo + '|' + lvl.hi + '|' + lvl.ch;
        for (var i = 0; i < d.levels.length; i++) {
            if (d.levels[i].key === key) {
                var hit = d.levels.splice(i, 1)[0];
                d.levels.unshift(hit);
                return hit.canvas;
            }
        }

        var out = paintLevel(d, M, lvl, size);
        if (out.complete) {
            d.levels.unshift({ key: key, canvas: out.canvas });
            if (d.levels.length > 4) d.levels.length = 4;
        }
        return out.canvas;
    }

    function reset() {
        state.data = null;
    }

    SV.terrain = {
        isAvailable: isAvailable,
        render: render,
        isOnLevel: isOnLevel,
        reset: reset,
        maxTileSize: function () { var d = state.data; return d && d.tw ? d.tw : 48; }
    };

})(window.SpawnViewer = window.SpawnViewer || {});
