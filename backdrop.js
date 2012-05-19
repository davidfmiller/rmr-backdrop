/*jslint browser:true, indent:2,white:true,nomen:false,plusplus:false */
/*global YUI, window */


YUI.add('backdrop', function(Y) {

    "use strict";

    var Backdrop = function() {
      Backdrop.superclass.constructor.apply(this, arguments);
    };

    Y.Backdrop = Y.extend(Backdrop, Y.Base,
    {

      toString : function() {
        return '[Backdrop]';
      },

      initializer : function(config) {

        var url = config.url,
            id = config.hasOwnProperty('id') ? config.id : 'backdrop',
            img = new Image(),
            n = Y.Node.create('<div id="' + id + '"></div>'),
            resize = function(node) {
              var body = Y.one('body'),
                  region = null;
    
              body.setStyle('minHeight', body.get('winHeight') + 'px');
              region = body.get('region');
              node.setStyles({'width': region.width + 'px', 'height': region.height + 'px'});
            };
    
        img.onload = function() {
    
          Y.one('body').append(n);
          n.setStyle('backgroundImage', 'url(' + this.src + ')');
          resize(n);
          n.transition({
            'opacity' : 1,
            'duration' : config.hasOwnProperty('duration') ? parseFloat(config.duration, 10) : 0.5
          }, function() { });
    
          Y.on('windowresize', function() { resize(n); });
        };
        img.src = url;

      },

      'NAME' : 'backdrop',
      'ATTRS' : { }
    });

  }, '3.3.1', { requires : ['node', 'base', 'event', 'event-resize', 'transition' ] });