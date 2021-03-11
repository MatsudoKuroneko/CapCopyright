const request = require("request");
const canvas = require("canvas");
const sec = process.argv[2];
const thi = process.argv[3];

function help(){
    console.log("Usage: npm start commands");
    console.log("Most used commands");
    console.log("   create - [RECCOMEND] Create Capture with freetext and program title.");
    console.log("   onlyid - Create Capture with program title");
    console.log("   onlytext - Create Capture with freetext");
    console.log("   listId - list all Channel IDs");
    console.log("   listChannel - list all Channel IDs");
}

function getChannel() {
    request.get({
        url: "http://192.168.0.98:8888/api/channels",
        headers: { "Content-type": "application/json" },
        json: true//これによりあとでJSON化する必要がなくなる。
    }, ((err, response, body) => {
        if (err) {
            throw err;
        } else {
            for (var i = 0; i < body.length; i++) {
                console.log(body[i].channel + " " + body[i].name);
            }

        }

    }))
};

function getId() {
    request.get({
        url: "http://192.168.0.98:8888/api/channels",
        headers: { "Content-type": "application/json" },
        json: true//これによりあとでJSON化する必要がなくなる。
    }, ((err, response, body) => {
        if (err) {
            throw err;
        } else {
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
            console.log(body.find(element => element.channel.id == thi).programs[0].name);
            //console.log(body[0].programs);
        }

    }))
};


if (sec == "help") {
    help();
} else if (sec == "listId") {
    getId();
} else if (sec == "listChannel") {
    getChannel();
} else if (sec == "create") {
    getProgramName();
}else{
    help();
}


//出典: ラブライブ!虹ヶ咲学園スクールアイドル同好会 第10話「夏、はじまる