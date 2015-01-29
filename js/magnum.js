(function() {
  this.Magnum = {
    namespace: 'urn:x-cast:com.google.cast.magnum.remote_control',
    currentHover: document.body,
    init: function(receiverManager) {
      this.cursor = document.createElement('div');
      this.cursor.style.position = 'absolute';
      this.cursor.classList.add('magnum-cursor');
      document.body.appendChild(this.cursor);
      this.messageBus = receiverManager.getCastMessageBus(this.namespace, cast.receiver.CastMessageBus.MessageType.JSON);
      return this.messageBus.onMessage = (function(_this) {
        return function(e) {
          if (e.data.x && e.data.y) {
            return _this.onMouseMove(e.data.x, e.data.y);
          } else if (e.data.event) {
            return _this.onEvent(e.data.event);
          }
        };
      })(this);
    },
    onMouseMove: function(x, y) {
      var element;
      this.cursor.style.left = x + 'px';
      this.cursor.style.top = y + 'px';
      element = document.elementFromPoint(x - 1, y - 1);
      if (this.currentHover !== element) {
        if (this.currentHover) {
          this.currentHover.dispatchEvent(new Event('mouseleave'));
          this.currentHover.classList.remove('hover');
        }
        this.currentHover = element;
        this.currentHover.dispatchEvent(new Event('mouseenter'));
        return this.currentHover.classList.add('hover');
      }
    },
    onEvent: function(e) {
      return this.currentHover.dispatchEvent(new Event(e));
    }
  };

}).call(this);
