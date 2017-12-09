
(function() {
  'use strict';

  // prevent duplicate declaration
//  if (window.Backdrop) { return; }

  let
  //
  RESIZE_LISTENED = false;

  const
  //
  DEFAULT_STYLES = {
    'color': 'transparent',
    'position': 'top left',
    'repeat': 'no-repeat',
    'attachment': 'fixed',
    'size': 'cover'
  },

  /*
   * Generate a unique string suitable for id attributes
   *
   * @param basename (String)
   * @return string
   */
  guid = function(basename) {
    return basename + '-' + parseInt(Math.random() * 100, 10) + '-' + parseInt(Math.random() * 1000, 10);
  },

  /*
   * Retrieve an object containing { top: xx, left: xx, bottom: xx, right: xx, width: xx, height: xx }
   *
   * @param node (DOMNode)
   */
  getRect = function(node) {
    const rect = node.getBoundingClientRect();

    // create a new object that is not read-only
    const ret = { top: rect.top, left: rect.left, bottom: rect.bottom, right: rect.right };

    ret.top += window.pageYOffset;
    ret.left += window.pageXOffset;

    ret.bottom += window.pageYOffset;
    ret.right += window.pageYOffset;

    ret.width = rect.right - rect.left;
    ret.height = rect.bottom - rect.top;

    return ret;
  },

  /*
   *
   * @param a
   * @param b

   * @return Object
   */
  merge = function(a, b) {
    let i;
    const o = {};
    for (i in a) {
      if (a.hasOwnProperty(i)) {
        o[i] = a[i];
      }
    }
    for (i in b) {
      if (b.hasOwnProperty(i)) {
        o[i] = b[i];
      }
    }
    return o;
  },

  setStyles = function(node, styles) {
    for (const key in styles) {
      if (styles.hasOwnProperty(key)) {
        node.style[key] = styles[key];
      }
    }
  },

  /*
   apply background-* style attributes to a node
  */
  _applyStyles = function(node, styles) {
    for (const s in styles) {
      if (styles.hasOwnProperty(s)) {
        const key = 'background' + s.charAt(0).toUpperCase() + s.substr(1),
        style = styles[s];
        node.style[key] = style;
      }
    }
  };


  const Backdrop = function(config) {
    if (! config) {
      config = {};
    }

    this.events = {
      'end': function() { },
      'start': function() { }
    };

    this.node = config.hasOwnProperty('node') ? (typeof config.node === 'string' ? document.querySelector(config.node) : config.node) : document.body;
    this.id = config.hasOwnProperty('id') ? config.id : guid('backdrop');
    this.src = config.hasOwnProperty('url') ? config.url : config.src;
    this.styles = config.hasOwnProperty('styles') ? config.styles : null;

    if (this.src) {
      this.drop(this.src);
    }
  };


   /**
    * Assign handler for a Screen event
    *
    * @param {String} eventName - event name to attach to, one of 'fullscreen' or 'exit'
    * @param {Function} func - function to invoke when event occurs
    * @return {Object} Instance of backdrop for chaining
    * @chainable
    */
  Backdrop.prototype.on = function(eventName, func) {
    this.events[eventName] = func;
    return this;
  };


  Backdrop.prototype.drop = function(config) {
    if (typeof config === 'string') {
      this.src = config;
      this.styles = null;
    } else if (config) {
      if (config.hasOwnProperty('url')) {
        this.src = config.url;
      } else if (config.hasOwnProperty('src')) {
        this.src = config.src;
      }

      if (config.hasOwnProperty('styles')) {
        this.styles = config.styles;
      }
    }

    const img = new Image(), o = {};
    o.$ = this;
    o.node = document.createElement('div');
    o.node.setAttribute('id', this.id);
    o.node.classList.add('rmr-backdrop');

    o.$.resize();

    img.onload = function() {
      const
      styles = merge(DEFAULT_STYLES, o.$.styles);

      o.$.node.appendChild(o.node);
      o.$.resize();

      o.$.events.start(o.$.src);

      styles.image = 'url(' + (this.currentSrc ? this.currentSrc : this.src) + ')';

      _applyStyles(o.node, styles);

      let val = 0,
      interval;

      const anim = function() {
        val += 0.04;
        o.node.style.opacity = val;

        if (val >= 1) {
          const
          styles = merge(DEFAULT_STYLES, o.$.styles);

          styles.image = 'url(' + (img.currentSrc ? img.currentSrc : img.src)  + ')';
          o.$.events.end(o.$.src);

          _applyStyles(o.$.node, styles);
          o.node.parentNode.removeChild(o.node);

          window.clearInterval(interval);
          interval = null;
        }
      };

      interval = window.setInterval(anim, 10);

      if (! RESIZE_LISTENED) {
        window.addEventListener('resize', function() {
          o.$.resize();
        });
      }
      RESIZE_LISTENED = true;
    };

    img.srcset = this.src;
    return this;
  };

  Backdrop.prototype.resize = function() {
    const
    node = document.getElementById(this.id),
    rect = getRect(this.node);

    if (this.node === document.body) {
      document.body.style.minHeight = window.innerHeight + 'px';
    }

    if (node) {
      setStyles(node, { width: rect.width + 'px',  height: rect.height + 'px' });
    }

    return this;
  };

  Backdrop.prototype.toString = function() {
    return '[Backdrop v0.1]';
  };

  module.exports = Backdrop;
})();
