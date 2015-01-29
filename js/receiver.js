(function() {
  document.addEventListener('DOMContentLoaded', function() {
    window.castReceiverManager = cast.receiver.CastReceiverManager.getInstance();
    Magnum.init(window.castReceiverManager);
    return window.castReceiverManager.start();
  });

}).call(this);
