/* jshint undef: true,strict:true,trailing:true */
/* global YUI,document,window,Image */


(function() { 

  'use strict';

  var
  DEFAULT_STYLES = { 'color' : 'transparent', 'position' : 'top left', 'repeat' : 'no-repeat', 'attachment' : 'fixed', 'size' : 'cover' },

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
    var o = a;
    for (var i in b) {
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


  window.Backdrop = function() { 

    this.events = {
      'end' : function() { },
      'start' : function() { }
    };

    this.id = 'backdrop';
    this.url = 'http://davidfmiller.github.io/assets/img/backdrop/backdrop.jpg';
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


  window.Backdrop.prototype.drop = function(url) {

    var img = new Image(), o = {};
    o.$ = this;
    o.node = document.createElement('div');
    o.node.setAttribute('id', this.id);

    o.$.resize();

    img.onload = function() {

      var styles = DEFAULT_STYLES,
          body = document.body

      body.appendChild(o.node);
      o.$.resize();

      o.$.events.start(url);

      styles.image = 'url(' + this.src + ')';

      _applyStyles(o.node, styles);

      var val = 0;
      var anim = function() {

        val += 0.02;
        o.node.style.opacity = val;

        if (val >= 1) {

          var
          styles = DEFAULT_STYLES;

          styles.image = 'url(' + img.src  + ')';
          o.$.events.end(url);

          _applyStyles(document.body, styles);
          o.node.parentNode.removeChild(o.node);

          window.clearInterval(interval);
        }
      };

      var interval = window.setInterval(anim, 10);

      window.addEventListener('resize', function(e) {
        o.$.resize();
      });
    };

    img.src = url;
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
    return '[Backdrop]';
  };



}());



/*
YUI.add('backdrop', function(Y) {

    'use strict';

    /**
     @class Backdrop
     @constructor
     @param config {Object}
       'url' (string) - the path to the background image
       'id' (string, optional) - 
       'duration' (float, optional) - seconds

    var Backdrop = function(config) {
      Backdrop.superclass.constructor.apply(this, arguments);

      this.set('url', config.hasOwnProperty('url') ? config.url : null);
      this.set('id', config.hasOwnProperty('id') ? config.id : null);
      this.set('duration', config.hasOwnProperty('duration') ? config.duration : null);
      this.set('styles', config.hasOwnProperty('styles') ? config.styles : null);

      if (this.get('url')) { this.drop(); }

      return this;
    },
    DEFAULT_STYLES = { 'color' : 'transparent', 'position' : 'top left', 'repeat' : 'no-repeat', 'attachment' : 'fixed', 'size' : 'auto' };

    Backdrop.ATTRS = {

      /**
      The path to the background image 
      @property url
      @type {String}

      url : {
        value : null
      },

      /**
      The id attribute applied to the backdrop <div> 
      @property id
      @default 'backdrop'
      @type {String}

      id : {
        value : null,
        setter : function(id) { return id || 'backdrop'; },
        writeOnce : true
      },

      /**
      The CSS background styles applied to the <div> to allow background positioning, repeating, etc.
      @property styles
      @default null
      @type {Object}

      styles : {
        value : null
      },

      /**
      The length of time (in seconds) over which the backdrop's transition will occur
      @property duration
      @default 1
      @type {Number}

      duration : {
        value : 1,
        setter : function(i) { return (i ? parseFloat(i, 10) : 1); }
      }
    };


    Y.Backdrop = Y.extend(Backdrop, Y.Base,
    {

      /*
       * Clean up

      destructor : function() {
        this.set('id', null);
        this.set('duration', null);
        this.set('url', null);
        this.set('styles', null);
      },

      _applyStyles : function(node, styles) {
        for (var s in styles) {
          if (styles.hasOwnProperty(s)) {
            node.setStyle('background' + s.charAt(0).toUpperCase() + s.substr(1), styles[s]);
          }
        }
      },

      /**
       @method drop
       @chainable
       @param config {Object}

      drop : function(config) {

        if (typeof config === 'string') {
          this.set('url', config);
          this.set('styles', null)
        } else if (config) {
          if (config.hasOwnProperty('url')) { this.set('url', config.url); }
          if (config.hasOwnProperty('duration')) { this.set('duration', config.duration); }
          this.set('styles', config.hasOwnProperty('styles') ? config.styles : null);
        }

        var img = new Image(), o = {};

        o.$ = this;
        o.node = Y.Node.create('<div id="' + this.get('id') + '"></div>');

        img.onload = function() {
          Y.one('body').append(o.node);

          var s = Y.merge(DEFAULT_STYLES, o.$.get('styles'));

          o.$.fire('start', this.src);
          s.image = 'url(' + this.src + ')';
          o.$._applyStyles(o.node, s);

          o.$.resize();
          o.node.transition({
            'opacity' : 1,
            'duration' : o.$.get('duration')
          }, function() {
            o.$.fire('end', o.$.get('url') );

            var styles = Y.merge(DEFAULT_STYLES, o.$.get('styles')),
                body = Y.one('body');

            styles.image = 'url(' + img.src + ')';

            o.$._applyStyles(body, styles);

            o.node.remove();
          });

          Y.on('windowresize', function() { o.$.resize(); });
        };
        img.src = this.get('url');

        return this;
      },

      /**
       Update the size of the backdrop to match the window size (will be attached to window resize event)
       @method resize
       @chainable

      resize : function() {

        var body = Y.one(document.body),
            region = null,
            node = Y.one('#' + this.get('id'));

        body.setStyle('minHeight', body.get('winHeight') + 'px');

        region = body.get('region');
        if (node) { node.setStyles({'width': region.width + 'px', 'height': region.height + 'px'}); }

        return this;

      },

      /**
       Return a string representation of the object
       @method toString
       @return {String}

      toString : function() {
        return '[Backdrop]';
      }

    });

  }, '3.3.1', { requires : ['node', 'base', 'event', 'event-resize', 'transition' ] });
*/