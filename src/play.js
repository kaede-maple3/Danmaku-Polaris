let pScene, pUILayer, pBGLayer, pBOLayer, pObjLayer;//シーンとレイヤー
let pSceneSTime;

let pText, pTBGFlame, pTBG;//ステージとかの背景

let pLoRect, pLoID;//暗転

let stageRect;//ステージを区別するための背景
let scoreRect;//スコアを表示するとこの背景
let stageName;//HPや敵の情報などを表示するとこ

//プレイヤー
let player;
let pSpeed = [6, 7, 8];//キャラ事の移動速度(分母)
let pAtSpeed = [100, 150, 250];//キャラごとの攻撃速度(ミリ秒)

let playerPos;//仮設

let phase;//ステージの進行具合

function playReset() {
    pScene = new Fortis.Scene();
    Fortis.Game.setScene(pScene);
    pBGLayer = pScene.getBG();
    pObjLayer = pScene.getObj();
    pUILayer = pScene.getUI();
    pBOLayer = new Fortis.Layer();
    pScene.add(pBOLayer);

    pSceneSTime = performance.now();

    //最初の暗転
    {
        pLoRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 2, Fortis.Game.canvasCfg.size.y * 2), new Fortis.ColorMaterial(new Fortis.Color("black")));
        pLoRect.alpha = 0;
        pBOLayer.add(pLoRect);
        pLoID = Fortis.TransitionManager.add(pLoRect, "alpha", 500, 1, 0, Fortis.util.easing.inPower, 2);
        Fortis.TransitionManager.start(pLoID);
    }

    //ステージ
    {
        stageRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 4 / 5, Fortis.Game.canvasCfg.size.y), new Fortis.ColorMaterial(new Fortis.Color("black")));
        stageRect.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 2)
        stageRect.alpha = 0.2;
        pBGLayer.add(stageRect);
    }

    //スコア
    {
        scoreRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y), new Fortis.ColorMaterial(new Fortis.Color("#252525")));
        scoreRect.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 9 / 10, Fortis.Game.canvasCfg.size.y / 2)
        stageName = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", 25), stageIndexName[nowStage] + "ステージ"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        stageName.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 9 / 10, Fortis.Game.canvasCfg.size.y / 1.1);
        pUILayer.addEntities([scoreRect, stageName]);
    }

    //test = new wow(pObjLayer, new Fortis.Vector2(200, 200));

    //test = new goat(pObjLayer, new Fortis.Vector2(200, 200));

    //test = new sheep(pObjLayer, new Fortis.Vector2(0, 200));

    //test = new balance(pObjLayer, new Fortis.Vector2(0, 200),45);//3つ目は角速度

    //test = new mizu(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x*4/5, 200),-45);//3つめは角速度

    //test = new cow(pObjLayer, new Fortis.Vector2(200, 200));

    //test = new bro(pObjLayer, new Fortis.Vector2(200, 200));

    //test = new girl(pObjLayer, new Fortis.Vector2(200, 200));

    //test = new arch(pObjLayer, new Fortis.Vector2(200, 200));
    //test2 = new bh(pObjLayer, new Fortis.Vector2(200, 300));

    //test = new scp(pObjLayer, new Fortis.Vector2(200, 200));
    //test2 = new scp(pObjLayer, new Fortis.Vector2(400, 200));

    playerPos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y / 1.5);
    player = new Player(pObjLayer, playerPos, ["tensi", "netsu_ura", "angel"][nowChara]);
    phase = 0;
}

let test;
function pUpdate(delta) {
    if (pLoRect.alpha == 0) {
        for (let ene in nowEnemies) {
            nowEnemies[ene].update(delta);
        }
        for (let b in nowBullets) {
            nowBullets[b].update(delta);
        }

        player.update(delta);
        for (let pb in playerBullets) {
            playerBullets[pb].update(delta);
        }

        if (Object.keys(nowEnemies).length == 0) {
            phase++;
            spawn();
        }
    }
}

function spawn() {
    switch (nowStage) {
        case 0:
                switch (phase) {
                    case 1:
                        new sheep(pObjLayer, new Fortis.Vector2(0, 200));
                        break;
                }
            break;
    }
}

function aheadPlayer(speed, pos) {
    let pp = player.pos.copy();
    let bp = pos.copy();
    let vector = pp.copy().sub(bp);
    return vector.getDegree();
}

function changeHP() {
    console.log(player.hp);
}

function changeEnemyHP() {
    console.log("attack");
}