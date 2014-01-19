# Components Now!

## Goals

(visiter should understand this goals after talk)

 * Stop creating libraries, start creating modules
 * Components are cool
 * You should not wait for WebComponents to write components
 * All technologies are available

## Conflicts

(conflicts of techs, approaches and ideas, A vs B)

 * Use Polymer or X-Tag or jQuery UI or write in your own way
 * Libraries vs bunch of modules/components
 * Use all WebComponents stuff or use familiar tools

## Problems

(problems that are going to be solved during talk)

 * Goal of jQuery is to fix messy DOM, lodash - fix missing functions
  * Today almost everything is fixed
 * Most of great tools are libraries and it is hard to split them into parts
  * Use our Makefile or our compile web-service to extract features
 * Lack of real components
  * You have to install all deps manually, include all css
  * Have to read
  * Components are too powerful (are libraries)
 * npm, gem are cool because they are simple and similar
 * WebComponents is idea and bunch of APIs
  * Web - APIs
  * Components - great idea
  * Now it is a buzzword
 * Polymer is too havy

## Structure

 * About myself
 * Libraries (image)
   * jQuery was made to fix DOM
   * Underscore was made to fill ES3-5 gap
 * Today everything is library (image)
   * Libraries are big
     * Havy (example:size of lib)
     * Hard to understand (example:CC of jQuery)
     * Too powerful (example:$.ajax)
   * It is hard to use a part
     * Use Makefiles
     * Read HowTos
     * (?) Have somebody tried to extract part from jquery?
     * (?) And what about lodash?
   * Libraries requires other one
     * Most depend on jQuery
     * Backbone jQuery+Underscore
 * Everything is fixed*
   * ACID 3 - passed
   * DOM APIs
     * querySelector
   * ES5 everywhere
   * Polyfills fixes the rest
 * Component way (image)
   * Key features
     * Simple
       * KISS Principle
       * Single responsibility
     * Standalone
     * Isolated
   * Components are simple
     * Lightweight (example:size of some lib)
     * Only what you need (close to 100% of code usage)
     * Easy to understand (example:low CC)
   * Components are standalone
     * Contain all dependencies
       * Most of them are external
     * Easier to reuse
       * (example:bower i component-name)
       * (example:npm i component-name)
   * Components are isolated
     * Do not interfere with others
       * Scoped CSS
       * Flexible layout
     * Restricted access to others
       * No globals
       * `require()`
   * Others ingredients
     * Declarative
     * Data-driven
     * Lazy loaded
 * WebComponents
   * W3C way of components creation
   * Idea of Components
     * Custom declarative Elements
   * API (link to talk from MR 2013)
     * Shadow DOM
       * Encapsulation
       * Styles isolation
     * HTML Imports
     * Template Binding
 * Component Frameworks
   * Polymer
   * X-Tag
   * Component
   * jQuery UI Widgets
   * React
   * BEM Tools
 * Let's build the Component!
   * Let it be Open Graph Share button
   * Foundation is a package
     * Bower
     * bower.json
   * HTML
     * Layout
     * BEM helps to encapsulate (link to talk from MR 2013)

```html
<a href="{{ href }}" class="my-share">
    <img src="{{ icon }}" alt="" class="my-share__icon"/>
    <span class="my-share__label">{{ label }}</span>
</a>
```
    * Encapsulation

```html
<a class="my-share"
    data-href="{{ href }}"
    data-icon="{{ icon }}"
>{{ label }}</a>
```

Relative to w3c style

```html
<my-share
    href="{{ href }}"
    icon="{{ icon }}"
>{{ label }}</my-share>
```

Or handlebars helper

```
{{{my-share icon=twitter.icon href=twitter.href label=twitter.label}}}
```

   * CSS

```css
.my-share__icon {
    vertical-align: middle;
    height: 16px;
}

.my-share__label {
    padding-left: 5px;
}
```

   * JS

```js
var html = require('templates/my-share'),
    tpl = require('lodash-template'),
    domify = require('domify');

var template = tpl(html);

function MyShare(options) {
    this.options = options;
    this.el = domify(template(this.options));

    this._bindEvents();
}

MyShare.prototype._bindEvents = function () {
    this.el.addEventListener('click', function (e) {
        window.open(this.shareUrl());
        e.preventDefault();
    }.bind(this), false);
};

MyShare.prototype.shareUrl = function () {
    // TODO
};

module.exports = MyShare;
```

```js
// declare.js
var components = {};

exports.register = function (selector, Constructor) {
    components[selector] = Constructor;
};

exports.registerAll = function (registry) {
    for (var selector in registry) {
        exports.register(selector, registry[selector]);
    }
};

exports.init = function (root) {
    root = root || document;

    for (var selector in components) {
        var elements = root.querySelectorAll(selector),
            Constructor = components[selector];

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i],
                parent = el.parentNode;

            if (parent && !el.instance) {
                var instance = new Constructor(el.dataset);
                parent.replaceChild(instance.el, el);
                // back ref
                instance.el.instance = instance;
            }
        }
    }
};
```

```
// index.js
var declare = require('declare'),
    domready = require('domready'),
    registry = require('registry');

domready(function () {
    declare.registerAll(registry);
    declare.init();
});
```

     * Isolation

...Incomplete...

   * External libs
     * https://github.com/isaacs/node-url
     * twitter share url https://twitter.com/share?url=og:url&text=og:text

 * Conclusion
   * Stop propagation of Libraries
   * Write and use Components
   * WebComponents == API
   * Many Component approaches
