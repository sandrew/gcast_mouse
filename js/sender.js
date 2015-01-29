(function() {
  var appID, initializeCastApi, namespace, onError, onInitSuccess, onLaunchError, onMessageError, onRequestSessionSuccess, receiverListener, sessionListener, sessionUpdateListener, startCursor;

  appID = 'BDCCBA9B';

  namespace = 'urn:x-cast:com.google.cast.magnum.remote_control';

  window.session = null;

  startCursor = function() {
    if (!$('body').data('moving')) {
      $('body').data('moving', true).on('mousemove', (function(e) {
        return window.session.sendMessage(namespace, {
          x: e.clientX,
          y: e.clientY
        }, (function() {}), (function() {}));
      }).throttle(10)).on('click', function() {
        return window.session.sendMessage(namespace, {
          event: 'click'
        }, (function() {}), (function() {}));
      });
    }
    return $('.start-cast').replaceWith('<p>Casting!</p>');
  };

  receiverListener = function(e) {
    if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
      return $('.start-cast').removeClass('disabled').on('click', function() {
        chrome.cast.requestSession(onRequestSessionSuccess, onLaunchError);
        return false;
      });
    } else {
      return console.log('receiver list empty');
    }
  };

  onRequestSessionSuccess = function(e) {
    window.session = e;
    return startCursor();
  };

  sessionUpdateListener = function() {};

  onInitSuccess = function() {
    return console.log('onInitSuccess');
  };

  onMessageError = onLaunchError = onError = function(message) {
    console.log("onError");
    return console.log(message);
  };

  sessionListener = function(e) {
    window.session = e;
    if (e.status === 'connected') {
      startCursor();
    }
    return window.session.addUpdateListener(sessionUpdateListener);
  };

  initializeCastApi = function() {
    var apiConfig, sessionRequest;
    sessionRequest = new chrome.cast.SessionRequest(appID);
    apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);
    return chrome.cast.initialize(apiConfig, onInitSuccess, onError);
  };

  window['__onGCastApiAvailable'] = function(loaded, errorInfo) {
    if (loaded) {
      return initializeCastApi();
    } else {
      return console.log(errorInfo);
    }
  };

}).call(this);
