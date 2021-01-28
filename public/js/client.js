/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var BLACK_ROCKET_ICON =
  "https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421";

var WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
var BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';

var onBtnClick = function (t, opts) {
  console.log('Someone clicked the button');
  console.log(t);
  console.log(opts);

  console.log("boards");
  t.board("id", "name").then(function (board) {
    console.log(JSON.stringify(board, null, 2));
  });
};

var onBtnCards = function (t, opts) {
  console.log("lists");

  var lists = t.lists("all");
  console.log(JSON.stringify(lists, null, 2));

  console.log("list inbox");

  var list = t.list("1. Inbox");
  console.log(JSON.stringify(list, null, 2));

  console.log("list all");

  var list2 = t.list("all");
  console.log(JSON.stringify(list2, null, 2));

  console.log("cards all");

  var cards = t.cards("all");
  console.log(JSON.stringify(cards, null, 2));

};
// TrelloPowerUp.getall


TrelloPowerUp.initialize({
  // Start adding handlers for your capabilities here!
  "card-buttons": function(t, options) {
    return t.set("member", "shared", "hello", "world").then(function() {
      return [
        {
          icon: BLACK_ROCKET_ICON,
          text: "Estimate Size 4",
          callback: function(t) {
            console.log("getAll");
            console.log(t.getAll());
            console.log("context");
            console.log(t.getContext());
            return t.popup({
              title: "Estimation",
              url: "../../views/estimate.html"
            });
          }
        }
      ];
    }); //.then(console.log(t.get("member") + " " + t.get("shader")));
  },

  'board-buttons': function (t, opts) {
    return [{
      // we can either provide a button that has a callback function
      icon: {
        dark: WHITE_ICON,
        light: BLACK_ICON
      },
      text: 'Callback',
      callback: onBtnClick,
      condition: 'edit'
    }, {
      // or we can also have a button that is just a simple url
      // clicking it will open a new tab at the provided url
      icon: {
        dark: WHITE_ICON,
        light: BLACK_ICON
      },
      text: 'URL',
      condition: 'always',
      url: 'https://trello.com/inspiration',
      target: 'Inspiring Boards' // optional target for above url
    }, {
        // we can either provide a button that has a callback function
        icon: {
          dark: WHITE_ICON,
          light: BLACK_ICON
        },
        text: 'Lists info',
        callback: onBtnCards,
        condition: 'edit'
    }];
  }
});
