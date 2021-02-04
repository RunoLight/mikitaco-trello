/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

$.getScript("icons.js")



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
var onREST = function (t, opts) {
  var auth = t.getRestApi();
  if (auth) {
    console.log("auth");
  }
  else {
    console.log("not auth");
  }
  console.log(auth);

}


var authenticationSuccess = function() {
  console.log('Successful authentication');
};

var authenticationFailure = function() {
  console.log('Failed authentication');
};

window.Trello.authorize({
  type: 'popup',
  return_url: window.location.href,
  name: 'Mikitaco trello business power up',
  scope: {
    read: 'true',
    write: 'true' },
  expiration: 'never',
  success: authenticationSuccess,
  error: authenticationFailure
});



TrelloPowerUp.initialize({
  //
  // CARD BUTTONS
  //
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
              url: "estimate.html"
            });
          }
        }
      ];
    }); //.then(console.log(t.get("member") + " " + t.get("shader")));
  },
  // 'card-badges': function(t, options) {
  //   return [{
  //     icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
  //     text: '3'
  //   }];
  // }, // sets all cards to this badge

  //
  // CARD BADGES
  //
  'card-badges': function(t, options) {
    return t.get('card', 'shared', 'estimate')
        .then(function(estimate) {
          return [{
            icon: estimate ? GREY_ROCKET_ICON : WHITE_ROCKET_ICON,
            text: estimate || 'No Estimate!',
            color: estimate ? null : 'red',
          }];
        });
  },

  //
  // CARD BADGES DETAILS
  //
  'card-detail-badges': function(t, options) {
    return t.get('card', 'shared', 'estimate')
        .then(function(estimate) {
          return [{
            title: 'Estimate',
            text: estimate || 'No Estimate!',
            color: estimate ? null : 'red',
            callback: function(t) {
              return t.popup({
                title: "Estimation",
                url: 'estimate.html',
              });
            }
          }]
        });
  },

  //
  // BOARD BUTTONS
  //
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
    }, {
      icon: {
        dark: WHITE_ICON,
        light: BLACK_ICON
      },
      text: 'REST',
      callback: onREST,
      condition: 'edit'
    }];
  },
  //
  // AUTH STATUS
  //
  'authorization-status': function(t, options){
    return t.get('member', 'private', 'authToken')
        .then(function(authToken) {
          return { authorized: authToken != null }
        });
  },
  'show-authorization': function(t, options){
    return t.popup({
      title: 'Authorize 🥑 Account',
      url: './auth.html',
      height: 140,
    });
  },
},
    // API KEYS
    {
      appKey: 'fff4efd3f3ba3f0f515bd2aa84e97cd8',
      appName: 'https://mikitaco-trello-power.glitch.me/'
    }
);
