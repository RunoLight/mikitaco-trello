/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

window.estimate.addEventListener('submit', function(event){
    event.preventDefault();
    return t.set('card', 'shared', 'status', window.estimateSize.value)
        .then(function(){
            t.closePopup();
        });
});

t.render(function(){
    return t.get('card', 'shared', 'status')
        .then(function(estimate){
            window.estimateSize.value = estimate;
        })
        .then(function(){
            t.sizeTo('#content').done();
        });
});