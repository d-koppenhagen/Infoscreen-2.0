function generateID() {
    var clientID = "";
    for (var i = 0; i < 23; i++) {
        clientID += Math.floor(Math.random() * 10);
    }
    return clientID;
}
