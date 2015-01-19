function initWebRTC() {
    var webrtc = new SimpleWebRTC({
        // the id/element dom element that will hold "our" video
        localVideoEl: 'localVideo',
        // the id/element dom element that will hold remote videos
        remoteVideosEl: 'remotesVideos',
        // immediately ask for camera access
        autoRequestMedia: true
    });
    webrtc.on('readyToCall', function () {
        console.log("incoming call, changing route...");
        // you can name it anything
        webrtc.joinRoom('wg_call');
    });
    webrtc.on('message', function () {
        console.log("a answer received, changing path...");
        $("#remoteVideoPanel").removeClass("hidden");
        $("#ownVideoContainer").removeClass("hidden");
        //$location.path( "/call" );
    });
}

function generateID() {
    var clientID = "";
    for (var i = 0; i < 23; i++) {
        clientID += Math.floor(Math.random() * 10);
    }
    return clientID;
}

$(".close").click(function () {
    $(this).parent().parent().addClass('hidden');
});
