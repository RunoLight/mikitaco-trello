/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

window.status_refresh.addEventListener('submit', function(event){
    event.preventDefault();

    t.sizeTo('#status_form');

    return t.set('card', 'shared', 'status', window.status_form.value)
        .then(function(){
            t.closePopup();
        });
});

t.render(function(){
    return t.get('card', 'shared', 'status')
        .then(function(status){
            window.selected_status.value = status;
        })
        .then(function(){
            t.sizeTo('#status_form').done();
        });
});