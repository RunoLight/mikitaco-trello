/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var BLACK_ROCKET_ICON =
  "https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421";



TrelloPowerUp.initialize({



  // Start adding handlers for your capabilities here!
  // 'board-buttons': function (t, opts) {
  //   return [{
  //     icon: {
  //       dark: BLACK_ROCKET_ICON,
  //       light: BLACK_ROCKET_ICON
  //     },
  //     text: 'Callback',
  //     callback: function () {
  //       console.log("sex");
  //     },
  //
  //   }];
  // },

  "card-buttons": function(t, options) {
    return t.set("member", "shared", "hello", "world").then(function() {
      return [
        {
          icon: BLACK_ROCKET_ICON,
          text: "Estimate Size 2",
          callback: function(t) {
            return t.popup({
              title: "Estimation",
              url: "estimate.html"
            });
          }
        }
      ];
    });
  }
});