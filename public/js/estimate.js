/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

window.status_form.addEventListener('submit', function(event){
    event.preventDefault();

    t.sizeTo('#content');

    return t.set('card', 'shared', 'status', window.status_form.value)
        .then(function(){
            t.closePopup();
        });
});

t.render(function(){
    return t.get('card', 'shared', 'status')
        .then(function(status){
            window.status_form.value = status;
        })
        .then(function(){
            t.sizeTo('#content').done();
        });
});