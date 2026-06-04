let nowBullets = {};

class wowBullet1 {
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

class wowBullet2 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 5;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("wow_b2"));
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


class goatBullet1 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = new Fortis.Vector2(-Fortis.Game.canvasCfg.size.x/13,Fortis.Game.canvasCfg.size.y*( 4/7+1/(1+Math.floor(Math.random()*10))));

        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 13, Fortis.Game.canvasCfg.size.x / 13)), new Fortis.ImageMaterial("goat_b1"));
        this.entity.pos = this.pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x/7, 0);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 80, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 80, 3));
        this.cg.add(this.c);
        this.cg.link(this.entity);
        //this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.entity.pos.x += this.speed.x * delta / 1000;

        if (this.entity.pos.x > Fortis.Game.canvasCfg.size.x) {//画面外まで行った
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
    }
}

class goatBullet2 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("goat_b2"));
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

class sheepBullet1 {
    constructor(layer, pos,speedy) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();

        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 35, Fortis.Game.canvasCfg.size.x / 35)), new Fortis.ImageMaterial("sheep_b1"));
        this.entity.pos = this.pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, speedy);

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

class sheepBullet2 {
    constructor(layer, pos,speedy,angle) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("sheep_b2"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Math.cos(Fortis.util.degreeToRadian(angle+90))*speedy, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 80, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 80, 3));
        this.cg.add(this.c);
        this.cg.link(this.entity);
        //this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta/1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.pos.x = this.entity.shape.size.x / 2;
            this.speed.x *= -1;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.pos.x = Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2;
            this.speed.x *= -1;
        }
    }
}

class balanceBullet1 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();

        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("balance_b1"));
        this.entity.pos = this.pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        let speed = Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7);
        let decl = 30+Math.floor(Math.random()*30);
        this.speed = new Fortis.Vector2(speed*Math.cos(Fortis.util.degreeToRadian(decl)), speed*Math.sin(Fortis.util.degreeToRadian(decl)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 80, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 80, 3));
        this.cg.add(this.c);
        this.cg.link(this.entity);
        //this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta/1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
    }
}

class balanceBullet2 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();

        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 37, Fortis.Game.canvasCfg.size.x / 37)), new Fortis.ImageMaterial("balance_b2"));
        this.entity.pos = this.pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        let speed = (Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7))*0.8;
        let decl = 30+Math.floor(Math.random()*30);
        this.speed = new Fortis.Vector2(speed*Math.cos(Fortis.util.degreeToRadian(decl)), speed*Math.sin(Fortis.util.degreeToRadian(decl)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 80, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 80, 3));
        this.cg.add(this.c);
        this.cg.link(this.entity);
        //this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta/1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
    }
}

class balanceBullet3 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();

        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 37, Fortis.Game.canvasCfg.size.x / 37)), new Fortis.ImageMaterial("balance_b3"));
        this.entity.pos = this.pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        let speed = (Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7))*0.8;
        let decl = 30+Math.floor(Math.random()*30);
        this.speed = new Fortis.Vector2(speed*Math.cos(Fortis.util.degreeToRadian(decl)), speed*Math.sin(Fortis.util.degreeToRadian(decl)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 80, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 80, 3));
        this.cg.add(this.c);
        this.cg.link(this.entity);
        //this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta/1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
    }
}

class mizuBullet1 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();

        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("balance_b1"));
        this.entity.pos = this.pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        let speed = Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7);
        let decl = 120+Math.floor(Math.random()*30);
        this.speed = new Fortis.Vector2(speed*Math.cos(Fortis.util.degreeToRadian(decl)), speed*Math.sin(Fortis.util.degreeToRadian(decl)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 80, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 80, 3));
        this.cg.add(this.c);
        this.cg.link(this.entity);
        //this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta/1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
    }
}

class cowBullet1 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("cow_b1"));
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

class cowBullet2 {
    constructor(layer, pos,speedy,angle) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.x / 60)), new Fortis.ImageMaterial("cow_b2"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Math.cos(Fortis.util.degreeToRadian(angle))*speedy, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 80, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 80, 3));
        this.cg.add(this.c);
        this.cg.link(this.entity);
        //this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta/1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.pos.x = this.entity.shape.size.x / 2;
            this.speed.x *= -1;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.pos.x = Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2;
            this.speed.x *= -1;
        }
    }
}

class broBullet1 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 12, Fortis.Game.canvasCfg.size.x / 12)), new Fortis.ImageMaterial("bro_b1"));
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

class broBullet2 {
    constructor(layer, pos,speedy,angle) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.x / 60)), new Fortis.ImageMaterial("bro_b2"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Math.cos(Fortis.util.degreeToRadian(angle))*speedy, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 80, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 80, 3));
        this.cg.add(this.c);
        this.cg.link(this.entity);
        //this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta/1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.pos.x = this.entity.shape.size.x / 2;
            this.speed.x *= -1;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.pos.x = Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2;
            this.speed.x *= -1;
        }
    }
}

class broBullet3 {
    constructor(layer, pos,speedy,angle) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.x / 60)), new Fortis.ImageMaterial("bro_b3"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Math.cos(Fortis.util.degreeToRadian(angle))*speedy, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.x / 80, 3), Fortis.util.cleanFloat(Fortis.Game.canvasCfg.size.y / 80, 3));
        this.cg.add(this.c);
        this.cg.link(this.entity);
        //this.colId = Fortis.CollisionManager.add(pChara.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta/1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.pos.x = this.entity.shape.size.x / 2;
            this.speed.x *= -1;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.pos.x = Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2;
            this.speed.x *= -1;
        }
    }
}

class broBullet4 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 45, Fortis.Game.canvasCfg.size.x / 45)), new Fortis.ImageMaterial("bro_b4"));
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