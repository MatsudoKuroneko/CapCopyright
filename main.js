const request = require("request");
const chokidar = require("chokidar"); // フォルダ監視
const { registerFont } = require("canvas");
const { createCanvas, loadImage }= require("canvas");
const fs = require('fs');
const sec = process.argv[2];
const copy = process.argv[3];
const ch = process.argv[4];
var pname = "";

registerFont('Makinas-4-Square.otf', { family: 'Makinas 4 Square' })

const canvas = createCanvas(1440,810);// 出力されるアスペクト比
const ctx = canvas.getContext("2d");


function help(){
    console.log("Usage: npm start commands");
    console.log("Most used commands");
    console.log("   create <freetext> <channel> <fontsize> - [RECCOMEND] Create Capture with freetext and program title.");
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

function stamp(f){
    loadImage(f).then((image) => {
        ctx.drawImage(image, 0, 0);
        ctx.font = "bold " + fontsize + "px 'Makinas 4 Square'";
        ctx.textAlign = "end";
        ctx.strokeStyle = "white";
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;
        ctx.strokeText("出典:  " + copy,1430 + 2,794 - fontsize * 1.25 + 2);
        ctx.strokeText(pname,1430 + 2,794 + 2);
        ctx.fillText("出典:  " + copy,1430 + 2,794 - fontsize * 1.25 + 2);
        ctx.fillText(pname,1430 + 2,794 + 2);
        ctx.strokeText("出典:  " + copy,1430,794 - fontsize * 1.25);
        ctx.strokeText(pname,1430,794);
        ctx.fillText("出典:  " + copy,1430,794 - fontsize * 1.25);
        ctx.fillText(pname,1430,794);


        const rf = f.replace("InComplete_","")
        console.log(rf);
        fs.unlinkSync(f);
        const out = fs.createWriteStream(rf);
        const stream = canvas.createJPEGStream();
        stream.pipe(out)
        out.on("finish",() => console.log("完了"));
      })
}

function watch(){
    watcher = chokidar.watch(__dirname,{
        persistent:true,
        ignoreInitial:true,
        depth:0
    });
    watcher.on("add",f => {console.log(`file ${f} has been added`);
    if(f.indexOf("InComplete"))
    setTimeout(() => {
        stamp(f);
    }, 500);

            })
            .on("change",f => console.log(`file ${f} has been changed`))
            .on("unlink",f => console.log(`file ${f} has been removed`));
}

function getProgramName() {
    request.get({
        url: "http://192.168.0.98:8888/api/schedule/broadcasting?time=0",
        json: true
    }, ((err, response, body) => {
        if (err) {
            throw err;
        } else {
            pname = body.find(element => element.channel.id == ch).programs[0].name;
            console.log(pname);
            //console.log(body[0].programs);
            watch();
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