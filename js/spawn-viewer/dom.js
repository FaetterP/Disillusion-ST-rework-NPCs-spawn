(function (SV) {
    'use strict';

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (text != null) node.textContent = text;
        return node;
    }

    function clear(node) {
        node.textContent = '';
    }

    function fromHtml(html) {
        var tpl = document.createElement('template');
        tpl.innerHTML = html.trim();
        return tpl.content.firstChild;
    }

    SV.dom = { el: el, clear: clear, fromHtml: fromHtml };

})(window.SpawnViewer = window.SpawnViewer || {});
