function Init() {
    Fortis.Game.config.debug = true;
    Fortis.Game.canvasCfg.size = new Fortis.Vector2(1200, 675);
    Fortis.Game.canvasCfg.BGColor = new Fortis.Color("#252525");
    Fortis.Game.canvasCfg.autoResize = false;

    Fortis.FontLoader.addFonts({
        "Anton": "https://fonts.googleapis.com/css2?family=Anton&display=swap",
        "Smooch Sans": "https://fonts.googleapis.com/css2?family=Smooch+Sans:wght@450&display=swap",
        "Outfit": "https://fonts.googleapis.com/css2?family=Outfit:wght@450&display=swap",
        "Playwrite DK Loopet": "https://fonts.googleapis.com/css2?family=Playwrite+DK+Loopet&display=swap",
        "Inconsolata": "https://fonts.googleapis.com/css2?family=Inconsolata&display=swap",
        "Kaisei Opti": "https://fonts.googleapis.com/css2?family=Kaisei+Opti&display=swap",
        "Yusei Magic": "https://fonts.googleapis.com/css2?family=Yusei+Magic&display=swap",
        "DotGothic16": "https://fonts.googleapis.com/css2?family=DotGothic16&display=swap",
        "Yuji Mai": "https://fonts.googleapis.com/css2?family=Yuji+Mai&display=swap",
        "Shippori Antique": "https://fonts.googleapis.com/css2?family=Shippori+Antique&display=swap",//ひらがな、カタカナのみ
        "Yuji Boku": "https://fonts.googleapis.com/css2?family=Yuji+Boku&display=swap",
        "Reggae One": "https://fonts.googleapis.com/css2?family=Reggae+One&display=swap",
        "Yuji Syuku": "https://fonts.googleapis.com/css2?family=Yuji+Syuku&display=swap",
        "Kaisei Decol": "https://fonts.googleapis.com/css2?family=Kaisei+Decol&display=swap",
        "Rampart One": "https://fonts.googleapis.com/css2?family=Rampart+One&display=swap",
        "Noto Serif": "https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap",
        "Martian Mono": "https://fonts.googleapis.com/css2?family=Martian+Mono&display=swap",
        "Mochiy Pop One": "https://fonts.googleapis.com/css2?family=Mochiy+Pop+One&display=swap",
        "WDXL Lubrifont TC": "https://fonts.googleapis.com/css2?family=WDXL+Lubrifont+TC&display=swap",
    });
    Fortis.ImageLoader.addImages({
        //プレイアブル
        //テンプレ
        //"": "img/playable/.png",
        //天使
        "tensi": "img/playable/tensi.png",
        "tensi_b": "img/playable/tensi_bullet.png",
        //エンジェル
        "angel": "img/playable/angel.png",
        "angel_b": "img/playable/angel_bullet.png",
        //ねつ
        "netsu": "img/playable/netsu_himono.png",
        "netsu_b": "img/playable/netsu_bullet.png",
        "netsu_ura": "img/playable/netsu_ura.png",

        //敵
        //テンプレ
        //"": "img/enemy/.png",
        //ひつじ
        "sheep": "img/enemy/hituzi.png",
        "sheep_b1": "img/enemy/hituzi_bullet.png",
        "sheep_b2": "img/enemy/hituzi_bullet2.png",

        //かに
        "crab": "img/enemy/kani.png",
        "crab_b1": "img/enemy/kani_bullet.png",
        "crab_b2": "img/enemy/kani_bullet2.png",

        //おとめ
        "girl": "img/enemy/otome.png",
        "girl_b1": "img/enemy/otome_bullet.png",
        "girl_b2": "img/enemy/otome_bullet2.png",
        "girl_b3": "img/enemy/otome_bullet3.png",
        "girl_b4": "img/enemy/otome_bullet4.png",

        //ふたご
        "bro": "img/enemy/hutago.png",
        "bro_b1": "img/enemy/hutago_bullet.png",
        "bro_b2": "img/enemy/hutago_bullet2.png",
        "bro_b3": "img/enemy/hutago_bullet3.png",
        "bro_b4": "img/enemy/hutago_bullet4.png",

        //さそり
        "scp": "img/enemy/sasori.png",
        "scp_b1": "img/enemy/sasori_bullet.png",
        "scp_b2": "img/enemy/sasori_bullet2.webp",
        "scp_doku": "img/enemy/sasori_dokugiri.png",
        "scp_homing": "img/enemy/sasori_homing.png",

        //いて
        "arch": "img/enemy/ite.png",
        "arch_b1": "img/enemy/ite_bullet.png",
        "arch_b2": "img/enemy/ite_bullet2.png",
        "arch_setti1": "img/enemy/ite_setti.png",
        "arch_setti2": "img/enemy/ite_setti_bullet.png",

        //てんびん
        "balance": "img/enemy/tenbinn.png",
        "balance_b1": "img/enemy/tenbinn_bullet.png",
        "balance_b2": "img/enemy/tenbinn_bullet2.png",
        "balance_b3": "img/enemy/tenbinn_bullet3.png",

        //うぉw
        "wow": "img/enemy/uo.png",
        "wow_b1": "img/enemy/uo_bullet.png",
        "wow_b2": "img/enemy/uo_bullet2.png",

        //やぎ
        "goat": "img/enemy/yagi.png",
        "goat_b1": "img/enemy/yagi_bullet.png",
        "goat_b2": "img/enemy/yagi_bullet2.png",

        //うし
        "cow": "img/enemy/usi.png",
        "cow_b1": "img/enemy/usi_bullet.png",
        "cow_b2": "img/enemy/usi_bullet2.png",

        //みずかめ
        "mizu": "img/enemy/mizu.png",
        "mizu_b1": "img/enemy/mizu_bullet.png",
    });
}

let nowScene;

function Ready() {
    //タイトル
    
    nowScene = "title";
    title();
    

    //ステージセレクト
    /*
    nowScene = "sSelect";
    sSelectReset();
    */

    //キャラセレクト
    /*
    nowScene = "cSelect";
    cSelectReset();
    */

    //プレイ
    /*
    nowScene = "play";
    ResetToPlay();
    */
}

function Update(delta) {
    switch (nowScene) {
        case "title":
            tUpdate(delta);
            break;
        case "sSelect":
            sSUpdate(delta);
            break;
        case "cSelect":
            cSUpdate(delta);
            break;
        case "play":
            pUpdate(delta);
    }
}

function EngineLoaded() { }