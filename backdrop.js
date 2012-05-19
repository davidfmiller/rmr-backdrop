/* */

YUI.add('backdrop', function(Y) {

    "use strict";

    var Backdrop = function() {
      Backdrop.superclass.constructor.apply(this, arguments);
    };

    Y.Backdrop = Y.extend(Backdrop, Y.Base,
    {
      toString : function() {
        return 'Backdrop';
      },

      initializer : function(config) {

        var url = config.url,
            img = new Image(),
            n = Y.Node.create('<div id="backdrop"></div>'),
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
            'duration' : 0.5
          }, function() { });
    
          Y.on('windowresize', function(e) { resize(n); });
        };
        img.src = url;

      },

      'NAME' : 'backdrop',
      'ATTRS' : { }
    });

  }, '3.3.1', { requires : ['node', 'base', 'event', 'event-resize', 'transition' ] });