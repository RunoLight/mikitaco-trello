/* global TrelloPowerUp */
function parseCardDesc(desc) {

}

const statusToId = {
    "Inbox": 0,
    "Cooking": 1,
    "To deliver": 2,
    "On the way": 3,
    "Delivered": 4,
    "Canceled": 5
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
            return t.getRestApi()
                .getToken()
                .then(async function (token) {
                        if (!token) {
                            t.popup({
                                title: 'Authorize to continue',
                                url: './restAuthorize.html'
                            })
                        }

                        var neededListNum = statusToId[selectedStatus];

                        var cardInfo = await t.card('all');
                        var listIds = await t.lists('all'); // get ids instead

                        var listId = await cardInfo.idList;
                        var cardId = await cardInfo.id;

                        var newListId = listIds[neededListNum].id; // await
                        console.log('lists');
                        await console.log(listIds);
                        console.log('needed list number');
                        console.log(neededListNum);
                        console.log('needed list id');
                        console.log(newListId);
                        console.log(listIds[neededListNum]);
                        console.log("card");
                        console.log(cardInfo);

                        var parsedCardInfo = parseCardDesc(cardInfo);

                        var url = `https://api.trello.com/1/cards/${cardId}?`;
                        var bodyParams = {
                            key: opts.appKey,
                            token: token,
                            name: "miki ta co :)",
                            desc: "lol!",
                            idList: newListId
                        }
                        console.log('body');
                        console.log(bodyParams);
                        console.log('url');
                        console.log(url);

                    $.ajax({
                        type: 'PUT',
                        url: url,
                        //contentType: 'application/json',
                        //data: JSON.stringify(bodyParams)
                        data: bodyParams
                        ,
                        success: function (response) {
                            console.log("okie");
                            console.log(response);
                            t.closePopup();
                        },
                        error: function (response) {
                            console.log('error');
                            console.log(response);
                            t.closePopup();
                        }
                    });


                     //       .done(function () {
                     //           console.log('SUCCESS');
                     //       }).fail(function (msg) {
                     //       console.log('FAIL');
                     //   }).always(function (msg) {
                     //       console.log('ALWAYS');
                     //   });


                        // t.closePopup();



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