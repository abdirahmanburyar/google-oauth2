$(document).ready(function(){
    const socket = io()
    socket.on('connect', () => {
        console.log('cool connected to the server..')
    })
})