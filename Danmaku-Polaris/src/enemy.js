let nowEnemies = {};
//let stageWidth = Fortis.Game.canvasCfg.size.x*4/5;

class wow {
    constructor(layer,pos) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(21,16);
        nowEnemies[this.id] = this;
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 16, this.aspect)), new Fortis.ImageMaterial("wow"));
        layer.add(this.entity);
        this.layer = layer;
        this.entity.pos = pos.copy();
        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(this.entity.shape.size.x,this.entity.shape.size.y);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間

        this.hp = 100;
        this.maxHp = 100;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, 0);
    }
    update(delta){
        this.pos.add(this.speed.copy().mul(delta/1000));
        if(this.pos.x < this.size.x/2){
            this.pos.x = this.size.x/2;
            this.speed.x *= -1;
        }
        if(this.pos.x > Fortis.Game.canvasCfg.size.x*4/5 - this.size.x/2){
            this.pos.x = Fortis.Game.canvasCfg.size.x*4/5 - this.size.x/2;
            this.speed.x *= -1;
        }
        this.entity.pos = this.pos.copy();

        this.eTime += delta;
        if (this.eTime >= 1200) {
            this.eTime = 0;
            new wowBullet(pObjLayer, this.entity.pos.copy());
        }
    }
}