/* global TrelloPowerUp */
/* global Trello (client.js) */
const Promise = TrelloPowerUp.Promise;

let app_opts = {
    appKey: 'fff4efd3f3ba3f0f515bd2aa84e97cd8',
    appName: 'Mikitaco business power up'
};

//
// Resources
//
const WHITE_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-white.svg';
const BLACK_ICON = 'https://cdn.hyperdev.com/us-east-1%3A3d31b21c-01a0-4da2-8827-4bc6e88b7618%2Ficon-black.svg';
const BLACK_ROCKET_ICON = "https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421";
const GREY_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717';
const WHITE_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182';

//
// Trello capabilities
//

let capability_card_buttons = function (t, options) {
    return t.set("member", "shared", "hello", "world").then(function () {
        return [
            {
                icon: BLACK_ROCKET_ICON,
                text: "Set order status",
                callback: function (t) {
                    console.log("getAll");
                    console.log(t.getAll());
                    console.log("context");
                    console.log(t.getContext());
                    return t.popup({
                        title: "Set status",
                        url: "status.html"
                    });
                }
            },
            {
                icon: BLACK_ROCKET_ICON,
                text: "Lists",
                callback: function (t) {


                    console.log("Lists");
                    return t.lists("all").then(function (lists) {
                        console.log(JSON.stringify(lists, null, 2));
                    });

                }
            }
        ];
    }); //.then(console.log(t.get("member") + " " + t.get("shader")));
};


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

var onREST = function (t, opts) {
    var auth = t.getRestApi();
    if (auth) {
        console.log("auth");
    } else {
        console.log("not auth");
    }
    console.log(auth);
}

var authenticationSuccess = function () {
    console.log('Successful authentication');
};

var authenticationFailure = function () {
    console.log('Failed authentication');
};

// window.Trello.authorize({
//   type: 'popup',
//   return_url: window.location.href,
//   name: 'Mikitaco trello business power up',
//   scope: {
//     read: 'true',
//     write: 'true' },
//   expiration: 'never',
//   success: authenticationSuccess,
//   error: authenticationFailure
// });


let capability_card_badges = function (t, options) {
    return t.get('card', 'shared', 'status')
        .then(function (status) {
            return [{
                icon: status ? GREY_ROCKET_ICON : WHITE_ROCKET_ICON,
                text: status || 'No status!',
                color: status ? null : 'red',
            }];
        });
};
// 'card-badges': function(t, options) {
//   return [{
//     icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
//     text: '3'
//   }];
// }, // sets all cards to this badge

let capability_card_detail_badges = function (t, options) {
    return t.get('card', 'shared', 'status')
        .then(function (status) {
            return [{
                title: 'Current card status',
                text: status || 'No status!',
                color: status ? null : 'red',
                callback: function (t) {
                    return t.popup({
                        title: "Current card status",
                        url: 'status.html',
                    });
                }
            }]
        });
};

let capability_board_buttons = function (t, opts) {
    return [
        {
            // we can either provide a button that has a callback function
            icon: {
                dark: WHITE_ICON,
                light: BLACK_ICON
            },
            text: 'Callback',
            callback: onBtnClick,
            condition: 'edit'
        },
        {
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
        },
        {
            // we can either provide a button that has a callback function
            icon: {
                dark: WHITE_ICON,
                light: BLACK_ICON
            },
            text: 'Lists info',
            callback: onBtnCards,
            condition: 'edit'
        },
        {
            icon: {
                dark: WHITE_ICON,
                light: BLACK_ICON
            },
            text: 'REST',
            callback: onREST,
            condition: 'edit'
        }
    ];
};

let capability_authorization_status = function (t, options) {
    return t.get('member', 'private', 'token')
        .then(function (token) {
            return {authorized: token != null}
        });
};
let capability_show_authorization = function (t, options) {
    return t.popup({
        title: 'Authorize Account',
        url: './auth.html',
        height: 140,
    });
};

let capability_on_enable = function(t, options) {
    // This code will get triggered when a user enables your Power-Up
    return t.modal({
        url: './power-up-onboarding.html',
        height: 500,
        title: 'Mikitaco powerup overview'
    });
};
TrelloPowerUp.initialize(
    {
        'card-buttons': capability_card_buttons,
        'card-badges': capability_card_badges,
        'card-detail-badges': capability_card_detail_badges,
        'board-buttons': capability_board_buttons,
        'authorization-status': capability_authorization_status,
        'show-authorization': capability_show_authorization,
        'on-enable': capability_on_enable,
    },
    app_opts
);
