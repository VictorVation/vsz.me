(function () {
  var $ = document.querySelector.bind(document);
  var $key = $('#key');
  var $domain = $('#domain');
  var $hash = $('#hash');

  var update = function() {
    console.log('hello');
    // Compute the first 16 base64 characters of iterated-SHA-256(domain + '/' + key, 2 ^ difficulty).
    var key = $key.value;
    var domain = $domain.value;

    if (!key || !domain) {
      $hash.value = '';
      return;
    }

    var rounds = Math.pow(2, 16);
    var bits = domain + '/' + key;
    for (var i = 0; i < rounds; i += 1) {
      bits = sjcl.hash.sha256.hash(bits);
    }

    var hash = sjcl.codec.base64.fromBits(bits).slice(0, 14);
    $hash.value = hash;
    return hash;
  };

  // A debounced version of update().
  var timeout = null;
  var debouncedUpdate = function() {
    if (timeout !== null) {
      clearInterval(timeout);
    }
    timeout = setTimeout((function() {
      update();
      timeout = null;
    }), 300);
  }

  // Add our event listeners.
  'propertychange change keyup input paste'.split(' ').map(function(e) {
    [$key, $domain].map(function(ev) {
      return this.addEventListener(e, debouncedUpdate, false)
    });
  });
})();
