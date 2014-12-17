(function () {
  var $     = document.querySelector.bind(document),
    $time   = $('[role=time]'),
    $hex    = $('[role=hex]'),
    $body   = $('body'),
    $canvas = $('canvas'),
    $favicon= $('link[rel="shortcut icon"]');

  var formatTime = function(date) {
    var left = new Date(2014, 11, 18, 18, 30) - date;
    var hours = left / (1000 * 3600) | 0;
    left = left - hours * 1000 * 3600;

    var minutes = left / (1000 * 60) | 0;
    left = left - minutes * 1000 * 60;

    var seconds = left / 1000 | 0;

    return [hours, minutes, seconds]
      .map(function(t) {
        return t < 10 ? '0' + t : t;
      });
  };

  var swapFavicon = function(color) {
    context = $canvas.getContext('2d');
    context.fillStyle = color;
    context.fillRect(0, 0, 16, 16);
    $favicon.href = $canvas.toDataURL();
    $favicon.type = "image/x-icon";
  };

  var tick = function() {
    var now = formatTime(new Date()),
      colourNow = '#' + now.join(''),
      timeNow = now[0] + '<small>h</small> ' + now[1] + '<small>m</small> ' + now[2] + '<small>s</small>';
    $time.innerHTML = timeNow;
    $hex.innerHTML = colourNow;
    $body.style.background = colourNow;
    document.title = now[0] + 'h ' + now[1] + 'm ' + now[2] + 's' + ' LEFT IN 2A';
    swapFavicon(colourNow);

    setTimeout(tick, 1000);
  };

  tick();
})();
