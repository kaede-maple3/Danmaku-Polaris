let pScene, pUILayer, pBGLayer, pBOLayer,pObjLayer;//シーンとレイヤー
let pSceneSTime;

let pText, pTBGFlame, pTBG;

let pLoRect, pLoID;

let stageRect;//ステージを区別するための背景
let stageName;//HPや敵の情報などを表示するとこ

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
        stageRect = new Fortis.Entity(new Fortis.RectShape(Fortis.Game.canvasCfg.size.x*4/5, Fortis.Game.canvasCfg.size.y), new Fortis.ColorMaterial(new Fortis.Color("black")));
        stageRect.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x*2 / 5, Fortis.Game.canvasCfg.size.y/2)
        stageRect.alpha = 0.4;
        pBGLayer.add(stageRect);
    }

    //スコア
    {
        stageName = new Fortis.Entity(new Fortis.TextShape(new Fortis.Font("DotGothic16", 25), stageIndexName[nowStage] + "ステージ"), new Fortis.ColorMaterial(new Fortis.Color("white")));
        stageName.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x *9/ 10, Fortis.Game.canvasCfg.size.y/1.1);
        pUILayer.add(stageName);
    }

    let test = new wow(pObjLayer, new Fortis.Vector2(200, 200));
}

let test;
function pUpdate(delta) {
    if (pLoRect.alpha == 0) {
        for(let ene in nowEnemies){
            nowEnemies[ene].update(delta);
        }
        for(let b in nowBullets){
            nowBullets[b].update(delta);
        }
    }
}