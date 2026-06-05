let nowBullets = {};

class wowBullet1 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("wow_b1"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 50, Fortis.Game.canvasCfg.size.y / 50);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.entity.pos.y += this.speed.y * delta / 1000;

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class wowBullet2 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("wow_b2"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 45, Fortis.Game.canvasCfg.size.y / 45);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.entity.pos.y += this.speed.y * delta / 1000;

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class goatBullet1 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = new Fortis.Vector2(-Fortis.Game.canvasCfg.size.x / 13, Fortis.Game.canvasCfg.size.y * (4 / 7 + 1 / (1 + Math.floor(Math.random() * 10))));

        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 13, Fortis.Game.canvasCfg.size.x / 13)), new Fortis.ImageMaterial("goat_b1"));
        this.entity.pos = this.pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 7, 0);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 16, Fortis.Game.canvasCfg.size.y / 16);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.entity.pos.x += this.speed.x * delta / 1000;

        if (this.entity.pos.x > Fortis.Game.canvasCfg.size.x) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class goatBullet2 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("goat_b2"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 50, Fortis.Game.canvasCfg.size.y / 50);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.entity.pos.y += this.speed.y * delta / 1000;

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class sheepBullet1 {
    constructor(layer, pos, speedy) {
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
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 45, Fortis.Game.canvasCfg.size.y / 45);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.entity.pos.y += this.speed.y * delta / 1000;

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class sheepBullet2 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 1;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("sheep_b2"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Math.cos(Fortis.util.degreeToRadian(angle + 90)) * speedy, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 45, Fortis.Game.canvasCfg.size.y / 45);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
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

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);

                player.dull = true;
                let dullID = Fortis.Timer.add(4000, false, dullReset);
                Fortis.Timer.start(dullID);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class balanceBullet1 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();

        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("balance_b1"));
        this.entity.pos = this.pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        let speed = Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7);
        let decl = 30 + Math.floor(Math.random() * 30);
        this.speed = new Fortis.Vector2(speed * Math.cos(Fortis.util.degreeToRadian(decl)), speed * Math.sin(Fortis.util.degreeToRadian(decl)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.y / 60);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class balanceBullet2 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();

        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 37, Fortis.Game.canvasCfg.size.x / 37)), new Fortis.ImageMaterial("balance_b2"));
        this.entity.pos = this.pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        let speed = (Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7)) * 0.8;
        let decl = 30 + Math.floor(Math.random() * 30);
        this.speed = new Fortis.Vector2(speed * Math.cos(Fortis.util.degreeToRadian(decl)), speed * Math.sin(Fortis.util.degreeToRadian(decl)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.y / 60);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class balanceBullet3 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();

        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 37, Fortis.Game.canvasCfg.size.x / 37)), new Fortis.ImageMaterial("balance_b3"));
        this.entity.pos = this.pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        let speed = (Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7)) * 0.8;
        let decl = 30 + Math.floor(Math.random() * 30);
        this.speed = new Fortis.Vector2(speed * Math.cos(Fortis.util.degreeToRadian(decl)), speed * Math.sin(Fortis.util.degreeToRadian(decl)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.y / 60);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class mizuBullet1 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();

        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("balance_b1"));
        this.entity.pos = this.pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        let speed = Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7);
        let decl = 120 + Math.floor(Math.random() * 30);
        this.speed = new Fortis.Vector2(speed * Math.cos(Fortis.util.degreeToRadian(decl)), speed * Math.sin(Fortis.util.degreeToRadian(decl)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.y / 60);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class cowBullet1 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 40, Fortis.Game.canvasCfg.size.x / 40)), new Fortis.ImageMaterial("cow_b1"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.y / 60);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.entity.pos.y += this.speed.y * delta / 1000;

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class cowBullet2 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.x / 60)), new Fortis.ImageMaterial("cow_b2"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Math.cos(Fortis.util.degreeToRadian(angle)) * speedy, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.y / 60);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
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

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class broBullet1 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 5;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 12, Fortis.Game.canvasCfg.size.x / 12)), new Fortis.ImageMaterial("bro_b1"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 25, Fortis.Game.canvasCfg.size.y / 25);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.entity.pos.y += this.speed.y * delta / 1000;

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class broBullet2 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 1;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.x / 60)), new Fortis.ImageMaterial("bro_b2"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Math.cos(Fortis.util.degreeToRadian(angle)) * speedy, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 75, Fortis.Game.canvasCfg.size.y / 75);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
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

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class broBullet3 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 1;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.x / 60)), new Fortis.ImageMaterial("bro_b3"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Math.cos(Fortis.util.degreeToRadian(angle)) * speedy, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 75, Fortis.Game.canvasCfg.size.y / 75);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
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

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
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
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.y / 60);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.entity.pos.y += this.speed.y * delta / 1000;

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class girlBullet1 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(11, 19.5);
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 50, this.aspect)), new Fortis.ImageMaterial("girl_b1"));
        this.entity.pos = pos.copy();
        this.entity.angle = angle + 90;
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(speedy * Math.cos(Fortis.util.degreeToRadian(angle)), speedy * Math.sin(Fortis.util.degreeToRadian(angle)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 70, Fortis.Game.canvasCfg.size.y / 70);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class girlBullet2 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(1, 1);
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 75, this.aspect)), new Fortis.ImageMaterial("girl_b2"));
        this.entity.pos = pos.copy();
        this.entity.angle = angle + 90;
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(speedy * Math.cos(Fortis.util.degreeToRadian(angle)), speedy * Math.sin(Fortis.util.degreeToRadian(angle)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 90, Fortis.Game.canvasCfg.size.y / 90);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();


        if (this.pos.y < this.entity.shape.size.y / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class girlBullet3 {
    constructor(layer, pos, speedy, destination) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 1;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 30, Fortis.Game.canvasCfg.size.x / 30)), new Fortis.ImageMaterial("girl_b3"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, speedy);

        this.destination = destination;
        this.movingTime = 0;
        this.traID = Fortis.TransitionManager.add(this.entity, "pos", 1200, this.entity.pos.copy(), this.destination.copy());
        Fortis.TransitionManager.start(this.traID);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 45, Fortis.Game.canvasCfg.size.y / 45);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.movingTime += delta;
        this.pos = this.entity.pos.copy();
        if (this.movingTime > 1200) {
            this.pos.add(this.speed.copy().mul(delta / 1000));
            this.entity.pos = this.pos.copy();

            if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
                this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
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

            if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
                if (!player.invTime) {
                    player.hp -= this.damage;
                    changeHP();
                    player.invTime = true;
                    player.entity.alpha = 0.4;
                    let id = Fortis.Timer.add(1000, false, invTimeReset);
                    Fortis.Timer.start(id);
                }
            }
        }
    }
}

class girlBullet4 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.x / 60)), new Fortis.ImageMaterial("girl_b4"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Math.cos(Fortis.util.degreeToRadian(angle)) * speedy, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 75, Fortis.Game.canvasCfg.size.y / 75);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
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

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class archBullet1 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 1;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 70, Fortis.Game.canvasCfg.size.x / 70)), new Fortis.ImageMaterial("arch_b1"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Math.cos(Fortis.util.degreeToRadian(angle)) * speedy, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 85, Fortis.Game.canvasCfg.size.y / 85);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
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

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class archBullet2 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(1, 1);
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 50, this.aspect)), new Fortis.ImageMaterial("arch_bh_b1"));
        this.entity.pos = pos.copy();
        this.entity.angle = angle + 90;
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(speedy * Math.cos(Fortis.util.degreeToRadian(angle)), speedy * Math.sin(Fortis.util.degreeToRadian(angle)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 65, Fortis.Game.canvasCfg.size.y / 65);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class archBullet3 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(9, 16);
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 42, this.aspect)), new Fortis.ImageMaterial("arch_b2"));
        this.entity.pos = pos.copy();
        this.entity.angle = angle - 90;
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(speedy * Math.cos(Fortis.util.degreeToRadian(angle)), speedy * Math.sin(Fortis.util.degreeToRadian(angle)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.y / 60);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class archBullet4 {
    constructor(layer, pos, speedy) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(9, 16);
        nowBullets[this.id] = this;

        this.damage = 5;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 10, this.aspect)), new Fortis.ImageMaterial("arch_b2"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 25, Fortis.Game.canvasCfg.size.y / 25);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.entity.pos.y += this.speed.y * delta / 1000;

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class archBhBullet1 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(1, 1);
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 60, this.aspect)), new Fortis.ImageMaterial("arch_bh_b1"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Math.cos(Fortis.util.degreeToRadian(angle + 90)) * speedy, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 75, Fortis.Game.canvasCfg.size.y / 75);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
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

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class archBhBullet2 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(1, 1);
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 50, this.aspect)), new Fortis.ImageMaterial("arch_bh_b1"));
        this.entity.pos = pos.copy();
        this.entity.angle = angle + 90;
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(speedy * Math.cos(Fortis.util.degreeToRadian(angle)), speedy * Math.sin(Fortis.util.degreeToRadian(angle)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 70, Fortis.Game.canvasCfg.size.y / 70);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class scpBullet1 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(1, 1);
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 60, this.aspect)), new Fortis.ImageMaterial("scp_b1"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Math.cos(Fortis.util.degreeToRadian(angle + 90)) * speedy, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 75, Fortis.Game.canvasCfg.size.y / 75);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
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

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class scpBullet2 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(1, 1);
        nowBullets[this.id] = this;

        this.damage = 2;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 50, this.aspect)), new Fortis.ImageMaterial("scp_b2"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(speedy * Math.cos(Fortis.util.degreeToRadian(angle)), speedy * Math.sin(Fortis.util.degreeToRadian(angle)));

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 70, Fortis.Game.canvasCfg.size.y / 70);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x < this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.entity.shape.size.x / 2) {
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class scpBullet3 {
    constructor(layer, pos, speedy, destination) {
        this.id = Fortis.util.randomID();
        nowBullets[this.id] = this;

        this.damage = 1;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 30, Fortis.Game.canvasCfg.size.x / 30)), new Fortis.ImageMaterial("scp_doku"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, speedy);

        this.destination = destination;
        this.movingTime = 0;
        this.traID = Fortis.TransitionManager.add(this.entity, "pos", 1200, this.entity.pos.copy(), this.destination.copy());
        Fortis.TransitionManager.start(this.traID);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 60, Fortis.Game.canvasCfg.size.y / 60);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.movingTime += delta;
        this.pos = this.entity.pos.copy();
        if (this.movingTime > 1200) {
            this.pos.add(this.speed.copy().mul(delta / 1000));
            this.entity.pos = this.pos.copy();

            if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
                this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
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

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);

                player.dull = true;
                let dullID = Fortis.Timer.add(4000, false, dullReset);
                Fortis.Timer.start(dullID);
            }
        }
    }
}

class scpBullet4 {
    constructor(layer, pos, speedy, angle) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(28, 24);
        nowBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 20, this.aspect)), new Fortis.ImageMaterial("scp_homing"));
        this.entity.pos = pos.copy();
        this.entity.angle = angle - 90;
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(Math.cos(Fortis.util.degreeToRadian(angle)) * speedy, speedy);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 35, Fortis.Game.canvasCfg.size.y / 35);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        this.entity.pos = this.pos.copy();

        if (this.entity.pos.y > Fortis.Game.canvasCfg.size.y * 1.1) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
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

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);

                player.dull = true;
                let dullID = Fortis.Timer.add(4000, false, dullReset);
                Fortis.Timer.start(dullID);
            }

            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
        }
    }
}

class scpBullet5 {
    constructor(layer, pos, speedx) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(19, 12);
        nowBullets[this.id] = this;

        this.damage = 15;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 7, this.aspect)), new Fortis.ImageMaterial("lion"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(speedx, 0);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 15, Fortis.Game.canvasCfg.size.y / 15);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = Fortis.CollisionManager.add(player.cg, this.cg);
    }
    update(delta) {
        this.entity.pos.x += this.speed.x * delta / 1000;

        if (this.entity.pos.x > Fortis.Game.canvasCfg.size.x) {//画面外まで行った
            this.layer.remove(this.entity);
            Fortis.CollisionManager.remove(this.colId);
            delete nowBullets[this.id];
            return false;
        }

        if (Fortis.CollisionManager.get(this.colId)["result"]) {//プレイヤーに当たった
            if (!player.invTime) {
                player.hp -= this.damage;
                changeHP();
                player.invTime = true;
                player.entity.alpha = 0.4;
                let id = Fortis.Timer.add(1000, false, invTimeReset);
                Fortis.Timer.start(id);

                player.dull = true;
                let dullID = Fortis.Timer.add(4000, false, dullReset);
                Fortis.Timer.start(dullID);
            }
        }
    }
}