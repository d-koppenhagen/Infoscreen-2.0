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
        /*
            todo: ring
        */
        $('#ringingSound').play();

        $("#remoteVideoPanel").removeClass("hidden");
        $("#ownVideoContainer").removeClass("hidden");
        //$location.path( "/call" );
    });

    webrtc.on('videoAdded', function (video, peer) {

        console.log('video added', peer);
        var remotes = document.getElementById('remotes');
        if (remotes) {
            var pan = document.createElement('div');
            pan.className = 'panel panel-primary';

            var panHeading = document.createElement('div');
            panHeading.className = 'panel-heading';

            var btn = document.createElement('button');
            btn.className = 'close';
            btn.setAttribute ('type','button');
            btn.setAttribute ('data-dismiss','remoteVideoPanel');

            var panHeadingText = document.createElement('h3');
            panHeadingText.className = 'panel-title';
            panHeadingText.textContent = 'Peer "'+peer.id+'"';

            panHeading.appendChild(panHeadingText);
            panHeading.appendChild(btn);
            pan.appendChild(panHeading)

            var d = document.createElement('div');
            d.className = 'videoContainer embed-responsive embed-responsive-4by3';
            d.id = 'container_' + webrtc.getDomId(peer);
            video.className = 'embed-responsive-item';
            d.appendChild(video);
            pan.appendChild(d);
            var vol = document.createElement('div');
            vol.id = 'volume_' + peer.id;
            vol.className = 'volume_bar';
            video.onclick = function () {
                video.style.width = video.videoWidth + 'px';
                video.style.height = video.videoHeight + 'px';
            };
            pan.appendChild(vol);
            remotes.appendChild(pan);
        }
    });

    webrtc.on('videoRemoved', function (video, peer) {
        console.log('video removed ', peer);
        var remotes = document.getElementById('remotes');
        var el = document.getElementById('container_' + webrtc.getDomId(peer));
        if (remotes && el) {
            remotes.removeChild(el.parent().parent().parent());
        }
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
