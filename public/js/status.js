/* global TrelloPowerUp */
function parseCardDesc(desc) {

}

// const fetch = require('node-fetch');

var statusToId = {
    "inbox" : 0,
    "cooking" : 1,
    "to-deliver" : 2,
    "on-the-way" : 3,
    "delivered" : 4,
    "canceled" : 5
}

var opts = {
    appKey: 'fff4efd3f3ba3f0f515bd2aa84e97cd8',
    appName: 'Mikitaco business power up'
}

var t = TrelloPowerUp.iframe(opts);

$('.btn').click(function () {
    // t.sizeTo('#status_form');
    var selectedStatus = window.selected_status.value;
    console.log("selected value " + selectedStatus);

    return t.set('card', 'shared', 'status', selectedStatus)
        .then(function(){
            t.getRestApi()
                .getToken()
                .then(function (token) {
                        if (!token) {
                            t.popup({
                                title: 'Authorize to continue',
                                url: './restAuthorize.html'
                            })
                        }

                        var thisCard = t.card("all");
                        var neededListNum = statusToId[selectedStatus];
                        var newListId = t.lists("id")[neededListNum].id;
                        var currentListId = t.list("id");
                        // add twice then?
                        console.log(`list id: current ${currentListId}, new ${newListId}`);

                        var url = `https://api.trello.com/1/cards/${thisCard.id}?`;
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

t.render(function(){
    return t.get('card', 'shared', 'status')
        .then(function(status){
            window.selected_status.value = status;
        })
        .then(function(){
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