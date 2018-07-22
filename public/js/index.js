var socket = io();
socket.on('connect', ()=>{
    console.log('socket connect js');

    

});

socket.on('newMessage', (message)=>{
    console.log(message);
    var li = `<li>${message.from}: ${message.text}</li>`;
    $('#message-list').append(li);
});

socket.on('newLocationMessage', (message)=>{
    var li = `<li>${message.from}: <a target="_blank" href="${message.url}">My location </li>`;
    $('#message-list').append(li);  
});

socket.on('disconnect', ()=>{
    console.log('socket disconnect');
});



$('#message-from').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'user',
        text: $('input[name="message-text"]').val()
    }, (res)=>{
        $('input[name="message-text"]').val('');
        console.log(res);
    });
});

$('#send-location').click(function(e){
    e.preventDefault();

    var el = $(this);
    if(!navigator.geolocation){
        return alert('browser not supported this function');
    }
    el.attr('disabled', true).text('Sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position.coords);

        socket.emit('createLocationMessage', {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }, (res)=>{    
            el.prop('disabled', false).text('Send location');
            console.log(res);
        })

    },  function(e){
         el.prop('disabled', false).text('Send location');
        alert('unable to get location', e);
    });
})