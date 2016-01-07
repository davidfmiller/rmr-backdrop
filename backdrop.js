/* jshint undef: true,strict:true,trailing:true */
/* global document,window,Image */


(function() {

  'use strict';

  var

  //
  RESIZE_LISTENED = false,

  //
  DEFAULT_STYLES = {
    'color' : 'transparent',
    'position' : 'top left',
    'repeat' : 'no-repeat',
    'attachment' : 'fixed',
    'size' : 'cover'
  },

  /*
   * Retrieve an object containing { top : xx, left : xx, bottom: xx, right: xx, width: xx, height: xx }
   *
   * @param node (DOMNode)
   */
  getRect = function(node) {

    var rect = node.getBoundingClientRect();

    // create a new object that is not read-only
    var ret = { top : rect.top, left : rect.left, bottom: rect.bottom, right : rect.right };

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
    var o = {};
    for (var i in a) {
      o[i] = a[i];
    }
    for (i in b) {
      o[i] = b[i];
    }
    return o;
  },

  setStyles = function(node, styles) {
    for (var key in styles) {
      node.style[key] = styles[key];
    }
  },

  _applyStyles = function(node, styles) {
    for (var s in styles) {
      if (styles.hasOwnProperty(s)) {

        var key = 'background' + s.charAt(0).toUpperCase() + s.substr(1),
        style = styles[s];

        node.style[key] = style;
      }
    }
  };


  window.Backdrop = function(config) {

    if (! config) { config = {}; }

    this.events = {
      'end' : function() { },
      'start' : function() { }
    };

    this.id = config.hasOwnProperty('id') ? config.id : 'backdrop';
    this.url = config.hasOwnProperty('url') ? config.url : null;
    this.styles = config.hasOwnProperty('styles') ? config.styles : null;

    if (this.url) {
      this.drop(this.url);
    }
  };


   /**
    * Assign handler for a Screen event
    *
    * @param {String} e - event name to attach to, one of 'fullscreen' or 'exit'
    * @param {Function} func - function to invoke when event occurs
    * @chainable
    */
  window.Backdrop.prototype.on = function(event, func) {
    this.events[event] = func;
    return this;
  };


  window.Backdrop.prototype.drop = function(config) {

    if (typeof config === 'string') {
      this.url = config;
      this.styles = null;
    } else if (config) {
      if (config.hasOwnProperty('url')) { this.url = config.url; }
      if (config.hasOwnProperty('styles')) { this.styles = config.styles; }
    }

    var img = new Image(), o = {};
    o.$ = this;
    o.node = document.createElement('div');
    o.node.setAttribute('id', this.id);

    o.$.resize();

    img.onload = function() {

      var styles = merge(DEFAULT_STYLES, o.$.styles),
          body = document.body;

      body.appendChild(o.node);
      o.$.resize();

      o.$.events.start(o.$.url);

      styles.image = 'url(' + this.src + ')';

      _applyStyles(o.node, styles);

      var val = 0;
      var anim = function() {

        val += 0.04;
        o.node.style.opacity = val;

        if (val >= 1) {

          var
          styles = merge(DEFAULT_STYLES, o.$.styles);

          styles.image = 'url(' + img.src  + ')';
          o.$.events.end(o.$.url);

          _applyStyles(document.body, styles);
          o.node.parentNode.removeChild(o.node);

          window.clearInterval(interval);
        }
      };

      var interval = window.setInterval(anim, 10);

      if (! RESIZE_LISTENED) {
        window.addEventListener('resize', function(e) {
          o.$.resize();
        });
      }
      RESIZE_LISTENED = true;
    };

    img.src = this.url;
    return this;
  };

  window.Backdrop.prototype.resize = function() {

    var
    body = document.body,
    rect = null,
    node = document.getElementById(this.id);

    rect = getRect(document.body);

    document.body.style.minHeight = window.innerHeight + 'px';

    if (node) {
      setStyles(node, { width : rect.width + 'px',  height : rect.height + 'px' });
    }

    return this;
  };

  window.Backdrop.prototype.toString = function() {
    return '[Backdrop v0.1]';
  };

}());
