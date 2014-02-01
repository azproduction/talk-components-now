var tpl = require('tpl'),
    decl = require('decl'),
    domify = require('domify');
 
var html = require('templates/my-share'),
    template = tpl(html);

function MyShare(el) {
    this.options = this.collectOptions(el);
    this.el = this.render();
    this.delegateEvents();
    this.replaceElement(el);
}

MyShare.prototype = {
    collectOptions: function (el) {
        return {
            href: tpl(el.getAttribute('data-href'), {
                title: encodeURIComponent(document.title),
                url: encodeURIComponent(location)
            }),
            icon: el.getAttribute('data-icon'),
            label: el.innerHTML
        };
    },

    render: function () {
        return domify(template(this.options));
    },

    delegateEvents: function () {
        this.el.addEventListener('click', function (e) {
            e.preventDefault();
            window.open(this.options.href, '', 'width=500,height=250');
        }.bind(this), false);
    },

    replaceElement: function (el) {
        el.parentNode.replaceChild(this.el, el);
    }
};

decl('.my-share', MyShare);
module.exports = MyShare;
