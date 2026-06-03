let nowBullets = {};

class wowBullet{
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("wow_b1"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 80, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 80, 3));
        this.cg.add(this.c);
        this.cg.link(this.entity);
        //this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.entity.pos.y += this.speed.y * delta / 1000;

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
    }
}