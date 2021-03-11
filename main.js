const request = require("request");


function getChannel() {
    request.get({
        url: "http://192.168.0.98:8888/api/channels",
        headers: { "Content-type": "application/json" },
        json: true//これによりあとでJSON化する必要がなくなる。
    }, ((err, response, body) => {
        if (err) {
            throw err;
        } else {
            console.log(body.length);
            for (var i = 0; i < body.length; i++) {
                console.log(body[i].channel + " " + body[i].name);
            }

        }

    }))
};

function getID() {
    request.get({
        url: "http://192.168.0.98:8888/api/channels",
        headers: { "Content-type": "application/json" },
        json: true//これによりあとでJSON化する必要がなくなる。
    }, ((err, response, body) => {
        if (err) {
            throw err;
        } else {
            console.log(body.length);
            for (var i = 0; i < body.length; i++) {
                console.log(body[i].id + " " + body[i].name);
            }

        }

    }))
};

function getProgramName() {
    request.get({
        url: "http://192.168.0.98:8888/api/schedule/broadcasting?time=0",
        json: true
    }, ((err, response, body) => {
        if (err) {
            throw err;
        } else {
            console.log(body.length);
            for (var i = 0; i < body.length; i++) {
                console.log(body[i].channel.id);
            }
            //console.log(body[0].programs);
        }

    }))
};

getProgramName();

//出典: ラブライブ!虹ヶ咲学園スクールアイドル同好会 第10話「夏、はじまる