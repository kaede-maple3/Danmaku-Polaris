let tScene, tUILayer,tBGLayer;//シーンとレイヤー
let tSceneSTime;

let titleText, titleTFont, sTitleText, startAlpID,startRepID;
let tBoRect, tBoTID;
let startFont, startText, sTTransID;


let fallingLetters = [];//落下するアルファベット
let letterSpnTimerId;//アルファベット出現タイマー
let letterFont;//アルファベット用フォント

function title() {
    tScene = new Fortis.Scene();
    Fortis.Game.setScene(tScene);
    tBGLayer = tScene.getBG();
    tUILayer = tScene.getUI();

    titleTFont = new Fortis.Font("DotGothic16", 100);
    titleText = new Fortis.Entity(new Fortis.TextShape(titleTFont, "弾幕ゲーム"), new Fortis.ColorMaterial(new Fortis.Color("white")));
    titleText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 3);

    sTitleTFont = new Fortis.Font("DotGothic16", 50);
    sTitleText = new Fortis.Entity(new Fortis.TextShape(sTitleTFont, "-Polaris-"), new Fortis.ColorMaterial(new Fortis.Color("white")));
    sTitleText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 2);

    startFont = new Fortis.Font("DotGothic16", 20);
    startText = new Fortis.Entity(new Fortis.TextShape(startFont, "Press space key to start."), new Fortis.ColorMaterial(new Fortis.Color("white")));
    startText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 2 / 3);
    startText.alpha = 0.8;
    startAlpID = Fortis.TransitionManager.add(startText, "alpha", 1100, 0.8, 0.1, Fortis.util.easing.inOutPower, 2);
    Fortis.TransitionManager.start(startAlpID);
    startRepID = Fortis.Timer.add(1150, true, setStartRepTr);
    Fortis.Timer.start(startRepID);

    tBoRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 2, Fortis.Game.canvasCfg.size.y * 2), new Fortis.ColorMaterial(new Fortis.Color("black")));
    tBoRect.alpha = 0;

    //アルファベット落下
    letterFont = new Fortis.Font("Anton", Fortis.Game.canvasCfg.size.y / 27);
    letterSpnTimerId = Fortis.Timer.add(600, true, function () {
        setFallingLetter();
    });
    Fortis.Timer.start(letterSpnTimerId);

    tUILayer.addEntities([titleText, sTitleText, startText,tBoRect]);
    tSceneSTime = performance.now();
}

function setStartRepTr() {
    if (startText.alpha == 0.1) {
        startAlpID = Fortis.TransitionManager.add(startText, "alpha", 1100, 0.1, 0.8, Fortis.util.easing.inOutPower, 2);
        Fortis.TransitionManager.start(startAlpID);
    } else {
        startAlpID = Fortis.TransitionManager.add(startText, "alpha", 1100, 0.8, 0.1, Fortis.util.easing.inOutPower, 2);
        Fortis.TransitionManager.start(startAlpID);
    }
}

function setFallingLetter() {
    //let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ★▲▶◀▼▷△▽◁☆✦★▲▶◀▼▷△▽◁☆✦★▲▶◀▼▷△▽◁☆✦".split("");
    let letters = "★☆✦".split("");
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    let randomX = Math.random() * Fortis.Game.canvasCfg.size.x+Fortis.Game.canvasCfg.size.x/8;
    //let randomRotation = Math.random() * 30 - 15;
    let randomRotation = 30;

    let letterEntity = new Fortis.Entity(
        new Fortis.TextShape(letterFont, randomLetter),
        new Fortis.ColorMaterial(new Fortis.Color("white"))
    );
    letterEntity.pos = new Fortis.Vector2(randomX, -Fortis.Game.canvasCfg.size.y / 100);
    letterEntity.angle = randomRotation;
    let speed = Fortis.Game.canvasCfg.size.y / 15000 + Math.random() * Fortis.Game.canvasCfg.size.y / 50000;
    letterEntity.speed = new Fortis.Vector2(speed*Math.cos(Fortis.util.degreeToRadian(randomRotation+90)),speed*Math.sin(Fortis.util.degreeToRadian(randomRotation+90)));
    letterEntity.alpha = 0.2;

    fallingLetters.push(letterEntity);
    tBGLayer.add(letterEntity);
}

function tUpdate(delta) {
    if (performance.now() - tSceneSTime >= 1000 && tBoRect.alpha == 0) {//開始１秒は反応しない
        if (Fortis.InputKey["Space"]) {
            tBoTID = Fortis.TransitionManager.add(tBoRect, "alpha", 500, 0, 1, Fortis.util.easing.inPower, 2);
            Fortis.TransitionManager.start(tBoTID);
        }
    }
    if (tBoRect.alpha == 1) {
        tScene.destroy();
        fallingLetters = [];
        nowScene = "cSelect";
        cSelectReset();
    }

    // 落下するアルファベットの更新
    for (let i = 0; i < fallingLetters.length; i++) {
        let speed = fallingLetters[i].speed.copy().mul(delta);
        fallingLetters[i].pos.add(speed);
        // 画面外に出たら削除
        if (fallingLetters[i].pos.y > Fortis.Game.canvasCfg.size.y + 50) {
            tBGLayer.remove(fallingLetters[i]);
            fallingLetters.splice(i, 1);
            i--;
        }
    }
}