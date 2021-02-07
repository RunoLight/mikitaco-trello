/* global TrelloPowerUp */
function parseCardDesc(desc) {

}

const statusToId = {
    "inbox": 0,
    "cooking": 1,
    "to-deliver": 2,
    "on-the-way": 3,
    "delivered": 4,
    "canceled": 5
};

const opts = {
    appKey: 'fff4efd3f3ba3f0f515bd2aa84e97cd8',
    appName: 'Mikitaco business power up'
};

var t = TrelloPowerUp.iframe(opts);

window.status_form.addEventListener('submit', function (event) {
    event.preventDefault();

    t.sizeTo('#status_form');

    var selectedStatus = window.selected_status.value;
    console.log("selected value " + selectedStatus);

    return t.set('card', 'shared', 'status', selectedStatus)
        .then(function () {
            t.getRestApi()
                .getToken()
                .then(function (token) {
                        if (!token) {
                            t.popup({
                                title: 'Authorize to continue',
                                url: './restAuthorize.html'
                            })
                        }

                        console.log("here");
                        var neededListNum = statusToId[selectedStatus];

                        return t.lists("id")
                            .then(function (lists) {
                                var newListId = lists[neededListNum].id;

                                return t.card("all")
                                    .then(function (cardInfo) {

                                        console.log(cardInfo);

                                        var parsedCardInfo = parseCardDesc(cardInfo);


                                        var url = `https://api.trello.com/1/cards/${cardInfo.id}?`;
                                        var bodyParams = {
                                            key: opts.appKey,
                                            token: token,
                                            name: "miki ta co :)"
                                        }
                                        console.log('body: ' + bodyParams.toString());

                                        $.ajax({
                                            type: 'PUT',
                                            url: url,
                                            contentType: 'application/json',
                                            data: JSON.stringify(bodyParams)
                                        })
                                            .done(function () {
                                                console.log('SUCCESS');
                                            }).fail(function (msg) {
                                            console.log('FAIL');
                                        }).always(function (msg) {
                                            console.log('ALWAYS');
                                        });

                                    })
                            });


                        // fetch(url, {
                        //     method: 'PUT',
                        //     headers: {
                        //         'Accept': 'application/json'
                        //     },
                        //     body: bodyParams
                        // })
                        //     .then(response => {
                        //         console.log(`Response: ${response.status} ${response.statusText}`);
                        //         return response.text();
                        //     })
                        //     .then(text => console.log(text))
                        //     .then(err => console.error(err));
                    }
                );
            t.closePopup();
        });
})

// window.status_refresh.addEventListener('submit', function(event){
//     event.preventDefault();
// });

t.render(function () {
    return t.get('card', 'shared', 'status')
        .then(function (status) {
            window.selected_status.value = status;
        })
        .then(function () {
            t.sizeTo('#status_form').done();
        })
        .then(
            t.getRestApi()
                .getToken()
                .then(function (token) {
                    if (!token) {
                        t.popup({
                            title: 'Authorize to continue',
                            url: './restAuthorize.html'
                        })
                    }
                })
        );
});