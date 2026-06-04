let nowEnemies = {};
//let stageWidth = Fortis.Game.canvasCfg.size.x*4/5;

class wow {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(21, 16);
        nowEnemies[this.id] = this;
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 16, this.aspect)), new Fortis.ImageMaterial("wow"));
        layer.add(this.entity);
        this.layer = layer;
        this.entity.pos = pos.copy();
        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(this.entity.shape.size.x, this.entity.shape.size.y);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1200;//弾発射のクールタイム

        this.hp = 100;
        this.maxHp = 100;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, 0);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        if (this.pos.x < this.size.x / 2) {
            this.pos.x = this.size.x / 2;
            this.speed.x *= -1;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.size.x / 2) {
            this.pos.x = Fortis.Game.canvasCfg.size.x * 4 / 5 - this.size.x / 2;
            this.speed.x *= -1;
        }
        this.entity.pos = this.pos.copy();

        this.eTime += delta;
        if (this.eTime >= this.eCoolTime) {
            this.eTime = 0;
            let rand = Math.floor(Math.random() * 7);
            if (rand > 5) {
                new wowBullet2(pObjLayer, this.entity.pos.copy());
            } else {
                new wowBullet1(pObjLayer, this.entity.pos.copy());
            }

        }
    }
}

class goat {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowEnemies[this.id] = this;
        this.entity = new Fortis.Entity(new Fortis.ImageShape(new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 16, Fortis.Game.canvasCfg.size.x / 16)), new Fortis.ImageMaterial("goat"));
        layer.add(this.entity);
        this.layer = layer;
        this.entity.pos = pos.copy();
        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(this.entity.shape.size.x, this.entity.shape.size.y);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1000;//弾発射のクールタイム

        this.hp = 100;
        this.maxHp = 100;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, 0);
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        if (this.pos.x < this.size.x / 2) {
            this.pos.x = this.size.x / 2;
            this.speed.x *= -1;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.size.x / 2) {
            this.pos.x = Fortis.Game.canvasCfg.size.x * 4 / 5 - this.size.x / 2;
            this.speed.x *= -1;
        }
        this.entity.pos = this.pos.copy();

        this.eTime += delta;
        if (this.eTime >= this.eCoolTime) {
            this.eTime = 0;
            let rand = Math.floor(Math.random() * 7);
            if (rand > 2) {
                new goatBullet1(pObjLayer, this.entity.pos.copy());
            } else {
                new goatBullet2(pObjLayer, this.entity.pos.copy());
            }
        }
    }
}

class sheep {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        nowEnemies[this.id] = this;
        this.aspect = new Fortis.Vector2(17, 10);
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 16, this.aspect)), new Fortis.ImageMaterial("sheep"));
        layer.add(this.entity);

        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, Fortis.Game.canvasCfg.size.y / 4 + (Fortis.Game.canvasCfg.size.y / 9) * Math.sin(5 * Math.PI * pos.x / (Fortis.Game.canvasCfg.size.x * 4 / 5)));
        pos.y = this.speed.y;
        this.layer = layer;
        this.entity.pos = pos.copy();
        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(this.entity.shape.size.x, this.entity.shape.size.y);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1000;//弾発射のクールタイム

        this.hp = 100;
        this.maxHp = 100;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
    }
    update(delta) {
        this.pos.add(this.speed.copy().mul(delta / 1000));
        if (this.pos.x < this.size.x / 2) {
            this.pos.x = this.size.x / 2;
            this.speed.x *= -1;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.size.x / 2) {
            this.pos.x = Fortis.Game.canvasCfg.size.x * 4 / 5 - this.size.x / 2;
            this.speed.x *= -1;
        }
        this.speed.y = (Fortis.Game.canvasCfg.size.y / 9) * Math.sin(5 * Math.PI * this.pos.x / (Fortis.Game.canvasCfg.size.x * 4 / 5));
        this.pos.y = Fortis.Game.canvasCfg.size.y / 4 + this.speed.y;
        this.entity.pos = this.pos.copy();

        this.eTime += delta;
        if (this.eTime >= this.eCoolTime) {
            this.eTime = 0;
            let speedy = Fortis.Game.canvasCfg.size.y / 6 * (Math.floor(Math.random() * 3) / 10 + 0.7);
            new sheepBullet1(pObjLayer, this.entity.pos.copy(), speedy * 1.1);
            new sheepBullet2(pObjLayer, this.entity.pos.copy(), speedy / 1.2, -30);
            new sheepBullet2(pObjLayer, this.entity.pos.copy(), speedy / 1.2, 30);
        }
    }
}

class balance {
    constructor(layer, pos, anVelo) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(18, 13);
        nowEnemies[this.id] = this;
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 13, this.aspect)), new Fortis.ImageMaterial("balance"));
        layer.add(this.entity);
        this.layer = layer;
        this.entity.pos = pos.copy();
        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(this.entity.shape.size.x, this.entity.shape.size.y);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 700;//弾発射のクールタイム

        /*HPなし動くだけ
        this.hp = 100;
        this.maxHp = 100;
        */
        this.iniPos = pos.copy();
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.angVelo = anVelo;
        this.angle = -90;
        this.radius = Fortis.Game.canvasCfg.size.x / 8;

        this.alivingTime = 16000;//10秒間出現
        let id = this.id;
        this.timerID = Fortis.Timer.add(this.alivingTime, false, function () {
            nowEnemies[id].layer.remove(nowEnemies[id].entity);
            delete nowEnemies[id];
        });
        Fortis.Timer.start(this.timerID);
    }
    update(delta) {
        this.angle += this.angVelo * delta / 1000;
        let velocity = new Fortis.Vector2(this.radius * Math.cos(Fortis.util.degreeToRadian(this.angle)), this.radius * Math.sin(Fortis.util.degreeToRadian(this.angle)));
        this.pos = velocity.copy().add(this.iniPos);

        this.entity.pos = this.pos.copy();

        this.eTime += delta;
        if (this.eTime >= this.eCoolTime) {
            this.eTime = 0;
            let rand = Math.floor(Math.random() * 10);
            if (rand > 7) {
                new balanceBullet1(pObjLayer, this.entity.pos.copy());
            } else if (rand > 4) {
                new balanceBullet2(pObjLayer, this.entity.pos.copy());
            } else {
                new balanceBullet3(pObjLayer, this.entity.pos.copy());
            }

        }
    }
}

class mizu {
    constructor(layer, pos, anVelo) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(11, 17);
        nowEnemies[this.id] = this;
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 25, this.aspect)), new Fortis.ImageMaterial("mizu"));
        layer.add(this.entity);
        this.layer = layer;
        this.entity.pos = pos.copy();
        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(this.entity.shape.size.x, this.entity.shape.size.y);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 500;//弾発射のクールタイム

        /*HPなし動くだけ
        this.hp = 100;
        this.maxHp = 100;
        */
        this.iniPos = pos.copy();
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.angVelo = anVelo;
        this.angle = -90;
        this.radius = Fortis.Game.canvasCfg.size.x / 8;

        this.alivingTime = 16000;//10秒間出現
        let id = this.id;
        this.timerID = Fortis.Timer.add(this.alivingTime, false, function () {
            nowEnemies[id].layer.remove(nowEnemies[id].entity);
            delete nowEnemies[id];
        });
        Fortis.Timer.start(this.timerID);
    }
    update(delta) {
        this.angle += this.angVelo * delta / 1000;
        let velocity = new Fortis.Vector2(this.radius * Math.cos(Fortis.util.degreeToRadian(this.angle)), this.radius * Math.sin(Fortis.util.degreeToRadian(this.angle)));
        this.pos = velocity.copy().add(this.iniPos);

        this.entity.pos = this.pos.copy();

        this.eTime += delta;
        if (this.eTime >= this.eCoolTime) {
            this.eTime = 0;
            new mizuBullet1(pObjLayer, this.entity.pos.copy());
        }
    }
}

class cow {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(10, 9);
        nowEnemies[this.id] = this;
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 10, this.aspect)), new Fortis.ImageMaterial("cow"));
        layer.add(this.entity);
        this.layer = layer;
        this.entity.pos = pos.copy();
        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(this.entity.shape.size.x, this.entity.shape.size.y);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1500;//弾発射のクールタイム
        this.swTime = 0;//移動しながらの攻撃の経過時間
        this.swCoolTime = 200;

        this.hp = 100;
        this.maxHp = 100;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, 0);

        this.destination;
        this.traID;
        this.status = false;//falseで攻撃、trueで移動
        this.atacking = false;
    }
    update(delta) {
        if (this.status) {
            this.swTime += delta;
            if ((this.entity.pos.x == this.destination.x) && (this.entity.pos.y == this.destination.y) && this.atacking == false) {
                this.swTime = 0;
                this.atacking = true;
                //リング攻撃
                for (let i = 0; i < 12; i++) {
                    let speedy = Fortis.Game.canvasCfg.size.y / 15 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                    let angle = Math.floor(Math.random() * 170) + 5;
                    new cowBullet2(pObjLayer, this.entity.pos.copy(), speedy, angle);
                }
            }
            if (this.swTime >= this.swCoolTime) {
                this.swTime = 0;
                if (this.atacking) {
                    this.status = false;
                    this.atacking = false;
                } else {
                    new cowBullet1(pObjLayer, this.entity.pos.copy());
                }
            }

        } else {
            this.eTime += delta;
            if (this.eTime >= this.eCoolTime) {
                this.status = true;
                this.eTime = 0;
                this.destination = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 2 / 5) + Fortis.Game.canvasCfg.size.x / 5, Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 5));
                this.traID = Fortis.TransitionManager.add(this.entity, "pos", 1200, this.entity.pos.copy(), this.destination.copy());
                Fortis.TransitionManager.start(this.traID);
            }
        }
    }
}

class bro {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(29, 16);
        nowEnemies[this.id] = this;
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 6.2, this.aspect)), new Fortis.ImageMaterial("bro"));
        layer.add(this.entity);
        this.layer = layer;
        this.entity.pos = pos.copy();
        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.RectCollider(this.entity.shape.size.x, this.entity.shape.size.y);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1750;//弾発射のクールタイム
        this.swTime = 0;//移動しながらの攻撃の経過時間
        this.swCoolTime = 250;

        this.hp = 100;
        this.maxHp = 100;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, 0);

        this.destination;
        this.traID;
        this.status = false;//falseで攻撃、trueで移動
        this.atacking = false;
    }
    update(delta) {
        if (this.status) {
            this.swTime += delta;
            if ((this.entity.pos.x == this.destination.x) && (this.entity.pos.y == this.destination.y) && this.atacking == false) {
                this.swTime = 0;
                this.atacking = true;
                let atRand = Math.floor(Math.random() * 4);
                if (atRand != 0) {//たくさんのやつ
                    for (let i = 0; i < 8; i++) {
                        let speedy = Fortis.Game.canvasCfg.size.y / 20 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                        let angle = Math.floor(Math.random() * 170) + 5;
                        if(Math.floor(Math.random()*2)==0){
                            new broBullet2(pObjLayer, this.entity.pos.copy(), speedy, angle);
                        }else{
                            new broBullet3(pObjLayer, this.entity.pos.copy(), speedy, angle);
                        }
                    }
                } else {//でかいやつ
                    let speedy = Fortis.Game.canvasCfg.size.y / 3 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                    new broBullet1(pObjLayer, this.entity.pos.copy(), speedy);
                }
            }
            if (this.swTime >= this.swCoolTime) {
                this.swTime = 0;
                if (this.atacking) {
                    this.status = false;
                    this.atacking = false;
                } else {
                    new broBullet4(pObjLayer, this.entity.pos.copy());
                }
            }

        } else {
            this.eTime += delta;
            if (this.eTime >= this.eCoolTime) {
                this.status = true;
                this.eTime = 0;
                this.destination = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 2 / 5) + Fortis.Game.canvasCfg.size.x / 5, Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 5));
                this.traID = Fortis.TransitionManager.add(this.entity, "pos", 1200, this.entity.pos.copy(), this.destination.copy());
                Fortis.TransitionManager.start(this.traID);
            }
        }
    }
}