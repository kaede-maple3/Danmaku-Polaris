function invTimeReset() {
    player.invTime = false;
    player.entity.alpha = 1;
    invIcon.alpha = 0;
}

function dullReset() {
    player.dull = false;
    dullIcon.alpha = 0;
}

class Player {
    constructor(layer, pos, key) {
        this.id = Fortis.util.randomID();
        this.pos = pos.copy();

        this.defoSpeed = Fortis.Game.canvasCfg.size.x / 6;
        this.speed = Fortis.Game.canvasCfg.size.x / pSpeed[nowChara];

        this.invTime = false;
        this.dull = false;

        this.hp = 70;
        this.maxHp = 70;

        this.atTime = 0;
        this.canAt = true;
        this.atCoolTime = pAtSpeed[nowChara];

        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 35, Fortis.Game.canvasCfg.size.x / 35)), new Fortis.ImageMaterial(key));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(this.entity.shape.size.x / 10, this.entity.shape.size.y / 10);
        this.cg.add(this.c);
        this.cg.link(this.entity);
    }
    update(delta) {
        if (Fortis.InputKey["Space"] && this.canAt) {
            this.atTime = 0;
            this.canAt = false;
            let id = Fortis.Timer.add(this.atCoolTime, false, function () { player.canAt = true; });
            Fortis.Timer.start(id);
            switch (nowChara) {
                case 0:
                    new playerBullet1(pObjLayer, this.entity.pos.copy());
                    break;
                case 1:
                    let rand = Math.floor(Math.random() * 10);
                    if (rand == 0) {
                        new playerBullet2(pObjLayer, this.entity.pos.copy(), "netsu_br", 10);
                    } else {
                        let atrand = Math.floor(Math.random() * 3) + 2;
                        new playerBullet2(pObjLayer, this.entity.pos.copy(), "netsu_b", atrand);
                    }
                    break;
                case 2:
                    new playerBullet3(pObjLayer, this.entity.pos.copy());
                    break;
            }
        }

        if (Fortis.InputKey["ShiftLeft"] || Fortis.InputKey["ShiftRight"]) {
            //スペースを押している間は移動速度が半分になる
            this.speed = this.defoSpeed * 0.4;
        } else {
            this.speed = this.defoSpeed;
        }

        if (this.dull) {//鈍足huyo 
            this.speed = this.defoSpeed * 0.3;
        } else {
            this.speed = this.defoSpeed;
        }

        if (Fortis.InputKey["ArrowUp"] || Fortis.InputKey["KeyW"]) {
            this.pos.y -= this.speed * delta / 1000;
        }
        if (Fortis.InputKey["ArrowDown"] || Fortis.InputKey["KeyS"]) {
            this.pos.y += this.speed * delta / 1000;
        }
        if (Fortis.InputKey["ArrowLeft"] || Fortis.InputKey["KeyA"]) {
            this.pos.x -= this.speed * delta / 1000;
        }
        if (Fortis.InputKey["ArrowRight"] || Fortis.InputKey["KeyD"]) {
            this.pos.x += this.speed * delta / 1000;
        }

        if (this.pos.x < this.entity.shape.size.x / 2) this.pos.x = this.entity.shape.size.x / 2;
        if (this.pos.x > Fortis.Game.canvasCfg.size.x - this.entity.shape.size.x / 2) this.pos.x = Fortis.Game.canvasCfg.size.x - this.entity.shape.size.x / 2;
        if (this.pos.y < this.entity.shape.size.y / 2) this.pos.y = this.entity.shape.size.y / 2;
        if (this.pos.y > Fortis.Game.canvasCfg.size.y - this.entity.shape.size.y / 2) this.pos.y = Fortis.Game.canvasCfg.size.y - this.entity.shape.size.y / 2;
        this.entity.pos = this.pos.copy();
    }
}

let playerBullets = {};

class playerBullet1 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(11, 20);
        playerBullets[this.id] = this;

        this.damage = 3;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 80, this.aspect)), new Fortis.ImageMaterial("tensi_b"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 3);


        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 35, Fortis.Game.canvasCfg.size.y / 35);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = [];
        this.colEnemy = {};
        for (let key in nowEnemies) {
            let col = Fortis.CollisionManager.add(nowEnemies[key].cg, this.cg);
            this.colId.push(col);
            this.colEnemy[col] = nowEnemies[key];
        }
    }
    update(delta) {
        this.entity.pos.y -= this.speed.y * delta / 1000;

        if (this.entity.pos.y < 0) {//画面外まで行った
            this.layer.remove(this.entity);
            for (let key in this.colId) {
                    Fortis.CollisionManager.remove(this.colId[key]);
                }
            delete playerBullets[this.id];
            return false;
        }

        for (let key in this.colId) {
            if (Fortis.CollisionManager.get(this.colId[key])["result"]) {//敵にに当たった
                this.colEnemy[this.colId[key]].hp -= this.damage;
                changeEnemyHP();

                for (let key in this.colId) {
                    Fortis.CollisionManager.remove(this.colId[key]);
                }
                this.layer.remove(this.entity);
                delete playerBullets[this.id];
                break;
            }
        }
    }
}

class playerBullet2 {
    constructor(layer, pos, key, damage) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(11, 20);
        playerBullets[this.id] = this;

        this.damage = damage;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 60, this.aspect)), new Fortis.ImageMaterial(key));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 3);


        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 35, Fortis.Game.canvasCfg.size.y / 35);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = [];
        this.colEnemy = {};
        for (let key in nowEnemies) {
            let col = Fortis.CollisionManager.add(nowEnemies[key].cg, this.cg);
            this.colId.push(col);
            this.colEnemy[col] = nowEnemies[key];
        }
    }
    update(delta) {
        this.entity.pos.y -= this.speed.y * delta / 1000;

        if (this.entity.pos.y < 0) {//画面外まで行った
            this.layer.remove(this.entity);
            for (let key in this.colId) {
                Fortis.CollisionManager.remove(this.colId[key]);
            }
            delete playerBullets[this.id];
            return false;
        }

        for (let key in this.colId) {
            if (Fortis.CollisionManager.get(this.colId[key])["result"]) {//敵にに当たった
                this.colEnemy[this.colId[key]].hp -= this.damage;
                changeEnemyHP();

                for (let key in this.colId) {
                    Fortis.CollisionManager.remove(this.colId[key]);
                }
                this.layer.remove(this.entity);
                delete playerBullets[this.id];
                break;
            }
        }
    }
}

class playerBullet3 {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(11, 20);
        playerBullets[this.id] = this;

        this.damage = 5;

        this.pos = pos.copy();
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 40, this.aspect)), new Fortis.ImageMaterial("angel_b"));
        this.entity.pos = pos.copy();
        layer.add(this.entity);

        this.layer = layer;
        this.speed = new Fortis.Vector2(0, Fortis.Game.canvasCfg.size.y / 3);


        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(Fortis.Game.canvasCfg.size.x / 30, Fortis.Game.canvasCfg.size.y / 30);
        this.cg.add(this.c);
        this.cg.link(this.entity);
        this.colId = [];
        this.colEnemy = {};
        for (let key in nowEnemies) {
            let col = Fortis.CollisionManager.add(nowEnemies[key].cg, this.cg);
            this.colId.push(col);
            this.colEnemy[col] = nowEnemies[key];
        }
    }
    update(delta) {
        this.entity.pos.y -= this.speed.y * delta / 1000;

        if (this.entity.pos.y < 0) {//画面外まで行った
            this.layer.remove(this.entity);
            for (let key in this.colId) {
                    Fortis.CollisionManager.remove(this.colId[key]);
                }
            delete playerBullets[this.id];
            return false;
        }

        for (let key in this.colId) {
            if (Fortis.CollisionManager.get(this.colId[key])["result"]) {//敵にに当たった
                this.colEnemy[this.colId[key]].hp -= this.damage;
                changeEnemyHP();

                for (let key in this.colId) {
                    Fortis.CollisionManager.remove(this.colId[key]);
                }
                this.layer.remove(this.entity);
                delete playerBullets[this.id];
                break;
            }
        }
    }
}
