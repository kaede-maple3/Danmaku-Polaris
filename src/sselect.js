let ssScene, ssUILayer, ssBGLayer, ssBOLayer;//シーンとレイヤー
let ssSceneSTime;

let ssText, ssTBGFlame, ssTBG;

let ssLoRect, ssLoID;
let ssBoRect, ssBoTID;

let ssBGs = [];//キャラ選択の背景
let ssBGFlames = [];//キャラ選択の背景の枠
const stageIndex = ["arch", "scp", "girl"];//プレイアブルキャラの順番？
const stageIndexName = ["いて座", "さそり座", "おとめ座"]
let ssCharasImg = [];//キャラの画像
let ssCharaName = [];//キャラの名前

let nowStage;//現在選択中のキャラ
let ssExplTextSpace, ssExplTextAD;//操作説明
let ssCfm, ssCfmBG;//確認中
let ssCfmCharaImg, ssCfmCharaName, ssCfmText;

function sSelectReset() {
    ssScene = new Fortis.Scene();
    Fortis.Game.setScene(ssScene);
    ssBGLayer = ssScene.getBG();
    ssUILayer = ssScene.getUI();
    ssBOLayer = new Fortis.Layer();
    ssScene.add(ssBOLayer);

    ssSceneSTime = performance.now();

    //現在選択中のキャラ
    nowStage = 0;
    canNSKeyInput = true;
    canSelectKeyInputTime = 250;
    ssCfm = false;

    //最初の暗転
    {
        ssLoRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 2, Fortis.Game.canvasCfg.size.y * 2), new Fortis.ColorMaterial(new Fortis.Color("black")));
        ssLoRect.alpha = 0;
        ssBOLayer.add(ssLoRect);
        ssLoID = Fortis.TransitionManager.add(ssLoRect, "alpha", 500, 1, 0, Fortis.util.easing.inPower, 2);
        Fortis.TransitionManager.start(ssLoID);
    }

    //最後の暗転
    {
        ssBoRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 2, Fortis.Game.canvasCfg.size.y * 2), new Fortis.ColorMaterial(new Fortis.Color("black")));
        ssBoRect.alpha = 0;
        ssBOLayer.add(ssBoRect);
    }

    //アルファベット落下
    {
        letterFont = new Fortis.Font("Anton", Fortis.Game.canvasCfg.size.y / 27);
        letterSpnTimerId = Fortis.Timer.add(600, true, function () {
            ssSetFallingLetter();
        });
        Fortis.Timer.start(letterSpnTimerId);
    }

    //キャラセレクトの文字と背景
    {
        ssTBG = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y / 12), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
        ssTBG.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 9, Fortis.Game.canvasCfg.size.y / 12);
        ssTBG.alpha = 0.5;

        ssTBGFlame = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y / 12), new Fortis.ColorMaterial(null, new Fortis.Color("white")));
        ssTBGFlame.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 7, Fortis.Game.canvasCfg.size.y / 12);
        ssTBGFlame.material.thick = 3;

        ssText = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 25), "ステージセレクト"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        ssText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 7, Fortis.Game.canvasCfg.size.y / 12);

        ssExplTextSpace = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 25), "スペースキーで次へ"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        ssExplTextSpace.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 1.05);
        startAlpID = Fortis.TransitionManager.add(ssExplTextSpace, "alpha", 1100, 0.8, 0.1, Fortis.util.easing.inOutPower, 2);
        Fortis.TransitionManager.start(startAlpID);
        startRepID = Fortis.Timer.add(1150, true, setssExplRepTr);
        Fortis.Timer.start(startRepID);

        ssExplTextAD = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 23), "←A/D→"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        ssExplTextAD.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 6);

        ssUILayer.addEntities([ssTBG, ssTBGFlame, ssText, ssExplTextSpace, ssExplTextAD]);
    }

    //キャラセレクト
    {
        for (let i = 0; i < 3; i++) {
            let bg = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y / 1.5), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
            if (i == nowStage) {
                bg.material.fill = new Fortis.Color("#454545");
            }
            bg.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 16 + i * Fortis.Game.canvasCfg.size.x * 5 / 16, Fortis.Game.canvasCfg.size.y / 1.8);
            ssBGs.push(bg);

            let bgf = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y / 1.5), new Fortis.ColorMaterial(null, new Fortis.Color("white")));
            bgf.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 16 + i * Fortis.Game.canvasCfg.size.x * 5 / 16, Fortis.Game.canvasCfg.size.y / 1.8);
            ssBGFlames.push(bgf);

            let stageImg = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y / 2)), new Fortis.ImageMaterial(stageIndex[i]));
            stageImg.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 16 + i * Fortis.Game.canvasCfg.size.x * 5 / 16, Fortis.Game.canvasCfg.size.y / 1.8);
            ssCharasImg.push(stageImg);

            let name = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 22), stageIndexName[i]), new Fortis.ColorMaterial(new Fortis.Color("white")));
            name.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 16 + i * Fortis.Game.canvasCfg.size.x * 5 / 16, Fortis.Game.canvasCfg.size.y / 1.18);
            ssCharaName.push(name);
        }
        ssUILayer.addEntities([...ssBGs, ...ssBGFlames, ...ssCharasImg, ...ssCharaName]);
    }

    //かくにん
    {
        ssCfmBG = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y), new Fortis.ColorMaterial(new Fortis.Color("black")));
        ssCfmBG.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 2);
        ssCfmBG.alpha = 0;

        ssCfmCharaImg = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(1.5 * Fortis.Game.canvasCfg.size.x / 5, 1.5 * Fortis.Game.canvasCfg.size.y / 2)), new Fortis.ImageMaterial(stageIndex[nowStage]));
        ssCfmCharaImg.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 2);
        ssCfmCharaImg.alpha = 0;

        ssCfmCharaName = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 18), stageIndexName[nowStage]), new Fortis.ColorMaterial(new Fortis.Color("white")));
        ssCfmCharaName.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 12);
        ssCfmCharaName.alpha = 0;

        ssCfmText = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 25), "スペースキーでスタート、Qキーで戻る"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        ssCfmText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 1.1);
        ssCfmText.alpha = 0;

        ssUILayer.addEntities([ssCfmBG, ssCfmCharaImg, ssCfmCharaName, ssCfmText]);
    }
}

function sSUpdate(delta) {
    // 落下するアルファベットの更新
    for (let i = 0; i < fallingLetters.length; i++) {
        let speed = fallingLetters[i].speed.copy().mul(delta);
        fallingLetters[i].pos.add(speed);
        // 画面外に出たら削除
        if (fallingLetters[i].pos.y > Fortis.Game.canvasCfg.size.y + 50) {
            ssBGLayer.remove(fallingLetters[i]);
            fallingLetters.splice(i, 1);
            i--;
        }
    }

    if (ssLoRect.alpha == 0) {//開始0.5秒は何もしない
        
        if (canNSKeyInput) {
            if (ssCfm) {
                if (Fortis.InputKey["Space"]) {
                    canNSKeyInput = false;
                    ssBoTID = Fortis.TransitionManager.add(ssBoRect, "alpha", 1500, 0, 1, Fortis.util.easing.inPower, 2);
                    Fortis.TransitionManager.start(ssBoTID);
                }
                if (Fortis.InputKey["KeyQ"]) {
                    ssCfm = false;
                    canNSKeyInput = false;
                    canNSKIPTimerID = Fortis.Timer.add(canSelectKeyInputTime, false, function () {
                        canNSKeyInput = true;
                    });
                    Fortis.Timer.start(canNSKIPTimerID);
                    ssCfmBG.alpha = 0;
                    ssCfmCharaImg.alpha = 0;
                    ssCfmCharaName.alpha = 0;
                    ssCfmText.alpha = 0;
                }
            } else {
                if (Fortis.InputKey["Space"]) {
                    ssCfm = true;
                    canNSKeyInput = false;
                    canNSKIPTimerID = Fortis.Timer.add(canSelectKeyInputTime, false, function () {
                        canNSKeyInput = true;
                    });
                    Fortis.Timer.start(canNSKIPTimerID);
                    ssCfmBG.alpha = 0.8;
                    ssCfmCharaImg.alpha = 1;
                    ssCfmCharaName.alpha = 1;
                    ssCfmText.alpha = 1;
                    ssCfmCharaImg.material.key = stageIndex[nowStage];
                    ssCfmCharaName.shape.text = stageIndexName[nowStage];
                }
                if (Fortis.InputKey["KeyA"]) {
                    nowStage--;
                    if (nowStage < 0) nowStage = 0;
                    canNSKeyInput = false;
                    canNSKIPTimerID = Fortis.Timer.add(canSelectKeyInputTime, false, function () {
                        canNSKeyInput = true;
                    });
                    Fortis.Timer.start(canNSKIPTimerID);
                    for (let i = 0; i < ssBGs.length; i++) {
                        if (i == nowStage) {
                            ssBGs[i].material.fill = new Fortis.Color("#454545");
                        } else {
                            ssBGs[i].material.fill = new Fortis.Color("#252525");
                        }
                    }
                }
                if (Fortis.InputKey["KeyD"]) {
                    nowStage++;
                    if (nowStage > 2) nowStage = 2;
                    canNSKeyInput = false;
                    canNSKIPTimerID = Fortis.Timer.add(canSelectKeyInputTime, false, function () {
                        canNSKeyInput = true;
                    });
                    Fortis.Timer.start(canNSKIPTimerID);
                    for (let i = 0; i < ssBGs.length; i++) {
                        if (i == nowStage) {
                            ssBGs[i].material.fill = new Fortis.Color("#454545");
                        } else {
                            ssBGs[i].material.fill = new Fortis.Color("#252525");
                        }
                    }
                }
            }
        }
        //プレイ開始
        if (ssBoRect.alpha == 1) {
            ssScene.destroy();
            fallingLetters = [];
            nowScene = "play";
            playReset();
        }
    }
}

function ssSetFallingLetter() {
    //let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ★▲▶◀▼▷△▽◁☆✦★▲▶◀▼▷△▽◁☆✦★▲▶◀▼▷△▽◁☆✦".split("");
    let letters = "★☆✦".split("");
    let randomLetter = letters[Math.floor(Math.random() * letters.length)];
    let randomX = Math.random() * Fortis.Game.canvasCfg.size.x + Fortis.Game.canvasCfg.size.x / 8;
    //let randomRotation = Math.random() * 30 - 15;
    let randomRotation = 30;

    let letterEntity = new Fortis.Entity(
        new Fortis.TextShape(letterFont, randomLetter),
        new Fortis.ColorMaterial(new Fortis.Color("white"))
    );
    letterEntity.pos = new Fortis.Vector2(randomX, -Fortis.Game.canvasCfg.size.y / 100);
    letterEntity.angle = randomRotation;
    let speed = Fortis.Game.canvasCfg.size.y / 15000 + Math.random() * Fortis.Game.canvasCfg.size.y / 50000;
    letterEntity.speed = new Fortis.Vector2(speed * Math.cos(Fortis.util.degreeToRadian(randomRotation + 90)), speed * Math.sin(Fortis.util.degreeToRadian(randomRotation + 90)));
    letterEntity.alpha = 0.2;

    fallingLetters.push(letterEntity);
    ssBGLayer.add(letterEntity);
}

function setssExplRepTr() {
    if (ssExplTextSpace.alpha == 0.1) {
        startAlpID = Fortis.TransitionManager.add(ssExplTextSpace, "alpha", 1100, 0.1, 0.8, Fortis.util.easing.inOutPower, 2);
        Fortis.TransitionManager.start(startAlpID);
    } else {
        startAlpID = Fortis.TransitionManager.add(ssExplTextSpace, "alpha", 1100, 0.8, 0.1, Fortis.util.easing.inOutPower, 2);
        Fortis.TransitionManager.start(startAlpID);
    }
}