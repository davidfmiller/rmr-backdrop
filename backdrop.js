/*jslint browser:true, indent:2,white:true,nomen:false,plusplus:false */
/*global YUI, window */


YUI.add('backdrop', function(Y) {

    'use strict';

    var Backdrop = function() {
      Backdrop.superclass.constructor.apply(this, arguments);
    };

    Y.Backdrop = Y.extend(Backdrop, Y.Base,
    {

      /* 
       *
       * @param config (object)
       *  'node' (selector) - the element that will become the parent of the 
       *  'id' (string, optional) - 
       */
      initializer : function(config) {

        var url = config.url,
            id = config.hasOwnProperty('id') ? config.id : 'backdrop',
            img = new Image(),
            resize = function(node) {
              var body = Y.one('body'),
                  region = null;

              body.setStyle('minHeight', body.get('winHeight') + 'px');
              region = body.get('region');
              node.setStyles({'width': region.width + 'px', 'height': region.height + 'px'});
            };

        config.$ = this,
        config.n = Y.Node.create('<div id="' + id + '"></div>'),

        img.onload = function() {

          Y.one('body').append(config.n);

          config.n.setStyle('backgroundImage', 'url(' + this.src + ')');
          resize(config.n);
          config.n.transition({
            'opacity' : 1,
            'duration' : config.hasOwnProperty('duration') ? parseFloat(config.duration, 10) : 0.5
          }, function() { config.$.fire('load'); });

          Y.on('windowresize', function() { resize(config.n); });
        };
        img.src = url;

      },

      /*
       *
       * @return string
       */
      toString : function() {
        return '[Backdrop]';
      },

      'NAME' : 'backdrop',
      'ATTRS' : { }
    });

  }, '3.3.1', { requires : ['node', 'base', 'event', 'event-resize', 'transition' ] });