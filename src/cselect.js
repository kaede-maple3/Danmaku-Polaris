let csScene, csUILayer, csBGLayer, csBOLayer;//シーンとレイヤー
let csSceneSTime;

let csText, csTBGFlame, csTBG;

let csLoRect, csLoID;
let csBoRect, csBoTID;

let csBGs = [];//キャラ選択の背景
let csBGFlames = [];//キャラ選択の背景の枠
const charaIndex = ["tensi", "netsu", "angel"];//プレイアブルキャラの順番？
const charaIndexName = ["天使", "アマテラス", "エンジェル"]
let csCharasImg = [];//キャラの画像
let csCharaName = [];//キャラの名前

let nowChara;//現在選択中のキャラ
let canNSKeyInput, canNSKIPTimerID, canSelectKeyInputTime;//現在キー入力が受付中か
let csExplTextSpace, csExplTextAD;//操作説明
let csCfm, csCfmBG;//確認中
let csCfmCharaImg, csCfmCharaName, csCfmText;

function cSelectReset() {
    csScene = new Fortis.Scene();
    Fortis.Game.setScene(csScene);
    csBGLayer = csScene.getBG();
    csUILayer = csScene.getUI();
    csBOLayer = new Fortis.Layer();
    csScene.add(csBOLayer);

    csSceneSTime = performance.now();

    //現在選択中のキャラ
    nowChara = 0;
    canNSKeyInput = true;
    canSelectKeyInputTime = 250;
    csCfm = false;

    //最初の暗転
    {
        csLoRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 2, Fortis.Game.canvasCfg.size.y * 2), new Fortis.ColorMaterial(new Fortis.Color("black")));
        csLoRect.alpha = 0;
        csBOLayer.add(csLoRect);
        csLoID = Fortis.TransitionManager.add(csLoRect, "alpha", 500, 1, 0, Fortis.util.easing.inPower, 2);
        Fortis.TransitionManager.start(csLoID);
    }

    //最後の暗転
    {
        csBoRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 2, Fortis.Game.canvasCfg.size.y * 2), new Fortis.ColorMaterial(new Fortis.Color("black")));
        csBoRect.alpha = 0;
        csBOLayer.add(csBoRect);
    }

    //アルファベット落下
    {
        letterFont = new Fortis.Font("Anton", Fortis.Game.canvasCfg.size.y / 27);
        letterSpnTimerId = Fortis.Timer.add(600, true, function () {
            csSetFallingLetter();
        });
        Fortis.Timer.start(letterSpnTimerId);
    }

    //キャラセレクトの文字と背景
    {
        csTBG = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y / 12), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
        csTBG.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 9, Fortis.Game.canvasCfg.size.y / 12);
        csTBG.alpha = 0.5;

        csTBGFlame = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y / 12), new Fortis.ColorMaterial(null, new Fortis.Color("white")));
        csTBGFlame.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 7, Fortis.Game.canvasCfg.size.y / 12);
        csTBGFlame.material.thick = 3;

        csText = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 25), "キャラクターセレクト"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        csText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 7, Fortis.Game.canvasCfg.size.y / 12);

        csExplTextSpace = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 25), "スペースキーで次へ"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        csExplTextSpace.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 1.05);
        startAlpID = Fortis.TransitionManager.add(csExplTextSpace, "alpha", 1100, 0.8, 0.1, Fortis.util.easing.inOutPower, 2);
        Fortis.TransitionManager.start(startAlpID);
        startRepID = Fortis.Timer.add(1150, true, setExplRepTr);
        Fortis.Timer.start(startRepID);

        csExplTextAD = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 23), "←A/D→"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        csExplTextAD.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 6);

        csUILayer.addEntities([csTBG, csTBGFlame, csText, csExplTextSpace, csExplTextAD]);
    }

    //キャラセレクト
    {
        for (let i = 0; i < 3; i++) {
            let bg = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y / 1.5), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
            if (i == nowChara) {
                bg.material.fill = new Fortis.Color("#454545");
            }
            bg.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 16 + i * Fortis.Game.canvasCfg.size.x * 5 / 16, Fortis.Game.canvasCfg.size.y / 1.8);
            csBGs.push(bg);

            let bgf = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 4, Fortis.Game.canvasCfg.size.y / 1.5), new Fortis.ColorMaterial(null, new Fortis.Color("white")));
            bgf.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 16 + i * Fortis.Game.canvasCfg.size.x * 5 / 16, Fortis.Game.canvasCfg.size.y / 1.8);
            csBGFlames.push(bgf);

            let charaImg = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y / 2)), new Fortis.ImageMaterial(charaIndex[i]));
            charaImg.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 16 + i * Fortis.Game.canvasCfg.size.x * 5 / 16, Fortis.Game.canvasCfg.size.y / 1.8);
            csCharasImg.push(charaImg);

            let name = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 22), charaIndexName[i]), new Fortis.ColorMaterial(new Fortis.Color("white")));
            name.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 16 + i * Fortis.Game.canvasCfg.size.x * 5 / 16, Fortis.Game.canvasCfg.size.y / 1.18);
            csCharaName.push(name);
        }
        csUILayer.addEntities([...csBGs, ...csBGFlames, ...csCharasImg, ...csCharaName]);
    }

    //かくにん
    {
        csCfmBG = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x, Fortis.Game.canvasCfg.size.y), new Fortis.ColorMaterial(new Fortis.Color("black")));
        csCfmBG.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 2);
        csCfmBG.alpha = 0;

        csCfmCharaImg = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(1.5 * Fortis.Game.canvasCfg.size.x / 5, 1.5 * Fortis.Game.canvasCfg.size.y / 2)), new Fortis.ImageMaterial(charaIndex[nowChara]));
        csCfmCharaImg.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 2);
        csCfmCharaImg.alpha = 0;

        csCfmCharaName = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 18), charaIndexName[nowChara]), new Fortis.ColorMaterial(new Fortis.Color("white")));
        csCfmCharaName.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 12);
        csCfmCharaName.alpha = 0;

        csCfmText = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 25), "スペースキーでスタート、Qキーで戻る"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        csCfmText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 1.1);
        csCfmText.alpha = 0;

        csUILayer.addEntities([csCfmBG, csCfmCharaImg, csCfmCharaName, csCfmText]);
    }
}

function cSUpdate(delta) {
    // 落下するアルファベットの更新
    for (let i = 0; i < fallingLetters.length; i++) {
        let speed = fallingLetters[i].speed.copy().mul(delta);
        fallingLetters[i].pos.add(speed);
        // 画面外に出たら削除
        if (fallingLetters[i].pos.y > Fortis.Game.canvasCfg.size.y + 50) {
            csBGLayer.remove(fallingLetters[i]);
            fallingLetters.splice(i, 1);
            i--;
        }
    }

    if (csLoRect.alpha == 0) {//開始0.5秒は何もしない
        if (canNSKeyInput) {
            if (csCfm) {
                if (Fortis.InputKey["Space"]) {
                    canNSKeyInput = false;
                    csBoTID = Fortis.TransitionManager.add(csBoRect, "alpha", 1500, 0, 1, Fortis.util.easing.inPower, 2);
                    Fortis.TransitionManager.start(csBoTID);
                }
                if (Fortis.InputKey["KeyQ"]) {
                    csCfm = false;
                    canNSKeyInput = false;
                    canNSKIPTimerID = Fortis.Timer.add(canSelectKeyInputTime, false, function () {
                        canNSKeyInput = true;
                    });
                    Fortis.Timer.start(canNSKIPTimerID);
                    csCfmBG.alpha = 0;
                    csCfmCharaImg.alpha = 0;
                    csCfmCharaName.alpha = 0;
                    csCfmText.alpha = 0;
                }
            } else {
                if (Fortis.InputKey["Space"]) {
                    csCfm = true;
                    canNSKeyInput = false;
                    canNSKIPTimerID = Fortis.Timer.add(canSelectKeyInputTime, false, function () {
                        canNSKeyInput = true;
                    });
                    Fortis.Timer.start(canNSKIPTimerID);
                    csCfmBG.alpha = 0.8;
                    csCfmCharaImg.alpha = 1;
                    csCfmCharaName.alpha = 1;
                    csCfmText.alpha = 1;
                    csCfmCharaImg.material.key = charaIndex[nowChara];
                    csCfmCharaName.shape.text = charaIndexName[nowChara];
                }
                if (Fortis.InputKey["KeyA"]) {
                    nowChara--;
                    if (nowChara < 0) nowChara = 0;
                    canNSKeyInput = false;
                    canNSKIPTimerID = Fortis.Timer.add(canSelectKeyInputTime, false, function () {
                        canNSKeyInput = true;
                    });
                    Fortis.Timer.start(canNSKIPTimerID);
                    for (let i = 0; i < csBGs.length; i++) {
                        if (i == nowChara) {
                            csBGs[i].material.fill = new Fortis.Color("#454545");
                        } else {
                            csBGs[i].material.fill = new Fortis.Color("#252525");
                        }
                    }
                }
                if (Fortis.InputKey["KeyD"]) {
                    nowChara++;
                    if (nowChara > 2) nowChara = 2;
                    canNSKeyInput = false;
                    canNSKIPTimerID = Fortis.Timer.add(canSelectKeyInputTime, false, function () {
                        canNSKeyInput = true;
                    });
                    Fortis.Timer.start(canNSKIPTimerID);
                    for (let i = 0; i < csBGs.length; i++) {
                        if (i == nowChara) {
                            csBGs[i].material.fill = new Fortis.Color("#454545");
                        } else {
                            csBGs[i].material.fill = new Fortis.Color("#252525");
                        }
                    }
                }
            }
        }
        //プレイ開始
        if (csBoRect.alpha == 1) {
            csScene.destroy();
            fallingLetters = [];
            nowScene = "sSelect";
            sSelectReset();
        }
    }
}

function csSetFallingLetter() {
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
    csBGLayer.add(letterEntity);
}

function setExplRepTr() {
    if (csExplTextSpace.alpha == 0.1) {
        startAlpID = Fortis.TransitionManager.add(csExplTextSpace, "alpha", 1100, 0.1, 0.8, Fortis.util.easing.inOutPower, 2);
        Fortis.TransitionManager.start(startAlpID);
    } else {
        startAlpID = Fortis.TransitionManager.add(csExplTextSpace, "alpha", 1100, 0.8, 0.1, Fortis.util.easing.inOutPower, 2);
        Fortis.TransitionManager.start(startAlpID);
    }
}