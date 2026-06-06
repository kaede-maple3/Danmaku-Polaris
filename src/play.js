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
let playreHPText;//体力のテキスト
let invIcon, dullIcon;//状態アイコン
let enemyHPText;//敵の体力テキスト
let enemyHP, enemyfullHP;
let gameover;//ゲームオーバーか

let playerPos;//仮設

let phase;//ステージの進行具合
let mizuCreate, mizuTime, mizuCoolTime, balanceCreate, balanceTime, balanceCoolTime;

//ゲームオーバー
let GOBG, goText, goThanksText, goReloadText;

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
        stageName = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 30), stageIndexName[nowStage] + "ステージ"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        stageName.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 9 / 10, Fortis.Game.canvasCfg.size.y / 1.1);

        invIcon = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 30, Fortis.Game.canvasCfg.size.x / 30)), new Fortis.ImageMaterial("shield"));
        invIcon.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 17 / 20, Fortis.Game.canvasCfg.size.y / 10);
        invIcon.alpha = 0;

        dullIcon = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 30, Fortis.Game.canvasCfg.size.x / 30)), new Fortis.ImageMaterial("dull"));
        dullIcon.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 18 / 20, Fortis.Game.canvasCfg.size.y / 10);
        dullIcon.alpha = 0;

        playreHPText = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 40), "プレイヤー体力:"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        playreHPText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 9 / 10, Fortis.Game.canvasCfg.size.y / 6);

        enemyHPText = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 40), "プレイヤー体力:"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        enemyHPText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 9 / 10, Fortis.Game.canvasCfg.size.y / 1.3);

        pUILayer.addEntities([scoreRect, stageName, invIcon, dullIcon, playreHPText, enemyHPText]);
    }

    //ゲームオーバー
    {
        GOBG = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x * 2, Fortis.Game.canvasCfg.size.y * 2), new Fortis.ColorMaterial(new Fortis.Color("black")));
        GOBG.alpha = 0;

        goText = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 6), "Game Over"), new Fortis.ColorMaterial(new Fortis.Color("#4ab840")));
        goText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 3 / 10);
        goText.alpha = 0;

        goThanksText = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 12), "Thank you for playing!"), new Fortis.ColorMaterial(new Fortis.Color("#4ab840")));
        goThanksText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 6 / 10);
        goThanksText.alpha = 0;

        goReloadText = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", Fortis.Game.canvasCfg.size.y / 20), "Reload/Space key to replay"), new Fortis.ColorMaterial(new Fortis.Color("#4ab840")));
        goReloadText.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 2, Fortis.Game.canvasCfg.size.y * 8 / 10);
        goReloadText.alpha = 0;

        pBOLayer.addEntities([GOBG, goText, goThanksText, goReloadText]);
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
    changeHP();

    phase = 0;
    mizuCreate = false;
    mizuTime = 0;
    mizuCoolTime = 17000;
    balanceCreate = false;
    balanceTime = 0;
    balanceCoolTime = 17000;
    gameover = false;
    canNSKeyInput = true;
}

let test;
function pUpdate(delta) {
    if (pLoRect.alpha == 0) {
        if (gameover && canNSKeyInput) {
            GOBG.alpha = 0.6;
            goText.alpha = 1;

            goReloadText.alpha = 1;
            goThanksText.alpha = 1;
            if (phase == 5) {//クリア
                goText.shape.text = "Game Clear"
            }

            if (Fortis.InputKey["Space"]) {
                location.reload();
            }
        } else {
            if (player.invTime) invIcon.alpha = 1;
            if (player.dull) dullIcon.alpha = 1;

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
                if (phase == 4) {
                    gameover = true;
                    canNSKeyInput = false;
                    canNSKIPTimerID = Fortis.Timer.add(2000, false, function () {
                        canNSKeyInput = true;
                    });
                    Fortis.Timer.start(canNSKIPTimerID);
                };
                phase++;
                mizuCreate = false;
                mizuTime = 0;
                balanceCreate = false;
                balanceTime = 0;
                spawn();
                changeEnemyHP();
            }

            if (mizuCreate) {
                mizuTime += delta;
                if (mizuTime >= mizuCoolTime) {
                    mizuTime = 0;
                    new mizu(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 4 / 5, Fortis.Game.canvasCfg.size.y / 5), -45);
                }
            }
            if (balanceCreate) {
                balanceTime += delta;
                if (balanceTime >= balanceCoolTime) {
                    balanceTime = 0;
                    new balance(pObjLayer, new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 5), 45);
                }
            }
        }

    }
}

function spawn() {
    switch (nowStage) {
        case 0:
            switch (phase) {
                case 1:
                    new wow(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 10));
                    new wow(pObjLayer, new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 10));
                    new goat(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10, Fortis.Game.canvasCfg.size.y / 8));
                    break;
                case 2:
                    mizuCreate = true;

                    new wow(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 10));
                    new wow(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y / 10));
                    new wow(pObjLayer, new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 10));
                    new goat(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10, Fortis.Game.canvasCfg.size.y / 8));
                    new goat(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 3, Fortis.Game.canvasCfg.size.y / 8));
                    break;
                case 3:
                    balanceCreate = true;
                    mizuCreate = true;

                    new bro(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 5));
                    break;
                case 4:
                    new arch(pObjLayer, new Fortis.Vector2(-Fortis.Game.canvasCfg.size.x * 2 / 5, -Fortis.Game.canvasCfg.size.y / 5));
                    new bh(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 3 / 5, Fortis.Game.canvasCfg.size.y / 2.75));
                    new bh(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 2.75));
                    break;
            }
            break;
        case 1:
            switch (phase) {
                case 1:
                    new wow(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 10));
                    new wow(pObjLayer, new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 10));
                    new sheep(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10, Fortis.Game.canvasCfg.size.y / 8));
                    break;
                case 2:
                    mizuCreate = true;

                    new goat(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y / 10));
                    new goat(pObjLayer, new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 10));
                    new goat(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10, Fortis.Game.canvasCfg.size.y / 8));
                    new goat(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 3, Fortis.Game.canvasCfg.size.y / 8));
                    break;
                case 3:
                    balanceCreate = true;
                    mizuCreate = true;

                    new bro(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 5));
                    break;
                case 4:
                    new scp(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y / 10));
                    new scp(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 10));
                    break;
            }
            break;
        case 2:
            switch (phase) {
                case 1:
                    new wow(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 10));
                    new wow(pObjLayer, new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 10));
                    new sheep(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10, Fortis.Game.canvasCfg.size.y / 8));
                    break;
                case 2:
                    mizuCreate = true;

                    new sheep(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y / 10));
                    new sheep(pObjLayer, new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 10));
                    new goat(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 10, Fortis.Game.canvasCfg.size.y / 8));
                    new goat(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 3, Fortis.Game.canvasCfg.size.y / 8));
                    break;
                case 3:
                    balanceCreate = true;
                    mizuCreate = true;

                    new cow(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 5));
                    break;
                case 4:
                    balanceCreate = true;

                    new girl(pObjLayer, new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y / 10));
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
    playreHPText.shape.text = "プレイヤー体力:" + player.hp + "/" + player.maxHp;
    if (player.hp <= 0) {
        gameover = true;
        canNSKeyInput = false;
        canNSKIPTimerID = Fortis.Timer.add(2000, false, function () {
            canNSKeyInput = true;
        });
        Fortis.Timer.start(canNSKIPTimerID);
    }
}

function changeEnemyHP() {
    //console.log("attack");
    enemyfullHP = 0;
    enemyHP = 0;
    for (let enemy in nowEnemies) {
        if (nowEnemies[enemy].maxHp != 100000) {
            enemyfullHP += nowEnemies[enemy].maxHp;
            enemyHP += nowEnemies[enemy].hp;
        }
    }
    enemyHPText.shape.text = "敵の体力合計:" + enemyHP + "/" + enemyfullHP;
}
