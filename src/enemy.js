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
        this.c = new Fortis.CircleCollider(this.entity.shape.size.x / 2, this.entity.shape.size.y / 2);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1200;//弾発射のクールタイム

        this.hp = 200;
        this.maxHp = 200;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, 0);
    }
    update(delta) {
        if (this.hp <= 0) {
            this.layer.remove(this.entity);
            delete nowEnemies[this.id];
            return false;
        }

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
        this.c = new Fortis.CircleCollider(this.entity.shape.size.x / 2, this.entity.shape.size.y / 2);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1000;//弾発射のクールタイム

        this.hp = 300;
        this.maxHp = 300;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, 0);
    }
    update(delta) {
        if (this.hp <= 0) {
            this.layer.remove(this.entity);
            delete nowEnemies[this.id];
            return false;
        }

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
        this.c = new Fortis.CircleCollider(this.entity.shape.size.x / 2, this.entity.shape.size.y / 2);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1000;//弾発射のクールタイム

        this.hp = 400;
        this.maxHp = 400;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
    }
    update(delta) {
        if (this.hp <= 0) {
            this.layer.remove(this.entity);
            delete nowEnemies[this.id];
            return false;
        }

        this.pos.add(this.speed.copy().mul(delta / 1000));
        if (this.pos.x < this.size.x / 2) {
            this.pos.x = this.size.x / 2;
            this.speed.x *= -1;
            this.entity.material.key = "sheep";
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.size.x / 2) {
            this.pos.x = Fortis.Game.canvasCfg.size.x * 4 / 5 - this.size.x / 2;
            this.speed.x *= -1;
            this.entity.material.key = "sheep_back";
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
        this.c = new Fortis.CircleCollider(this.entity.shape.size.x / 2, this.entity.shape.size.y / 2);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 700;//弾発射のクールタイム

        //HPなし動くだけ
        this.hp = 100000;
        this.maxHp = 100000;

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
        this.c = new Fortis.CircleCollider(this.entity.shape.size.x / 2, this.entity.shape.size.y / 2);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 500;//弾発射のクールタイム

        //HPなし動くだけ
        this.hp = 100000;
        this.maxHp = 100000;

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
        this.c = new Fortis.CircleCollider(this.entity.shape.size.x / 2, this.entity.shape.size.y / 2);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1500;//弾発射のクールタイム
        this.swTime = 0;//移動しながらの攻撃の経過時間
        this.swCoolTime = 200;

        this.hp = 750;
        this.maxHp = 750;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, 0);

        this.destination;
        this.traID;
        this.status = false;//falseで攻撃、trueで移動
        this.atacking = false;
    }
    update(delta) {
        if (this.hp <= 0) {
            this.layer.remove(this.entity);
            delete nowEnemies[this.id];
            return false;
        }

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
        this.c = new Fortis.CircleCollider(this.entity.shape.size.x / 2, this.entity.shape.size.y / 2);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1750;//弾発射のクールタイム
        this.swTime = 0;//移動しながらの攻撃の経過時間
        this.swCoolTime = 250;

        this.hp = 800;
        this.maxHp = 800;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, 0);

        this.destination;
        this.traID;
        this.status = false;//falseで攻撃、trueで移動
        this.atacking = false;
    }
    update(delta) {
        if (this.hp <= 0) {
            this.layer.remove(this.entity);
            delete nowEnemies[this.id];
            return false;
        }

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
                        if (Math.floor(Math.random() * 2) == 0) {
                            new broBullet2(pObjLayer, this.entity.pos.copy(), speedy, angle);
                        } else {
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

class girl {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(11, 18);
        nowEnemies[this.id] = this;
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 17, this.aspect)), new Fortis.ImageMaterial("girl"));
        layer.add(this.entity);
        this.layer = layer;
        this.entity.pos = pos.copy();
        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(this.entity.shape.size.x / 2, this.entity.shape.size.y / 2);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1750;//弾発射のクールタイム

        this.sw = false;//円上に広がるやつ
        this.swTime = 0;//移動しながらの攻撃の経過時間
        this.swCoolTime = 2400;
        this.swCount = 0;//4回

        this.hp = 1200;
        this.maxHp = 1200;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, 0);

        this.status = false;//falseで攻撃、trueで移動
        this.atacking = false;
    }
    update(delta) {
        if (this.hp <= 0) {
            this.layer.remove(this.entity);
            delete nowEnemies[this.id];
            return false;
        }

        if (this.status) {
            if (this.entity.alpha == 0) {
                this.traID = Fortis.TransitionManager.add(this.entity, "alpha", 600, 0, 1);
                Fortis.TransitionManager.start(this.traID);
                this.pos = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 2 / 5) + Fortis.Game.canvasCfg.size.x / 5, Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 5));
                this.entity.pos = this.pos.copy();

                let speedy = Fortis.Game.canvasCfg.size.y / 15 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                //ノーマル攻撃
                for (let i = 0; i < 5; i++) {
                    let angle = 30 * (1 + i);
                    new girlBullet4(pObjLayer, this.entity.pos.copy(), speedy, angle);
                }
            } else if (this.entity.alpha == 1 && this.sw == false) {
                //ランダム攻撃
                let atRand = Math.floor(Math.random() * 3);
                if (atRand >= 2) {//妨害するやつ
                    this.status = false;
                    for (let i = 0; i < 3; i++) {
                        let pos = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 2 / 5) + Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y / 2.25 + Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 5));
                        let speedy = Fortis.Game.canvasCfg.size.y / 30 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                        new girlBullet3(pObjLayer, this.entity.pos.copy(), speedy, pos);
                    }
                } else if (atRand >= 1) {//たくさんホーミング
                    this.status = false;
                    for (let i = 0; i < 25; i++) {
                        let randx = Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x);
                        let speedy = Fortis.Game.canvasCfg.size.y / 1.5 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                        let pos = this.entity.pos.copy();
                        pos.x = randx;
                        let angle = aheadPlayer(speedy, pos);
                        new girlBullet1(pObjLayer, pos, speedy, angle);
                    }
                } else if (atRand >= 0) {//円状に広がってくやつ
                    this.sw = true;
                    this.swTime = 0;
                    this.swCount = 0;
                }
            }

            if (this.sw) {
                this.swTime += delta;
                if (this.swTime >= this.swCoolTime) {
                    this.swTime = 0;
                    this.swCount++;
                    if (this.swCount == 4) {
                        this.sw = false;
                    }
                    //攻撃
                    let speedy = Fortis.Game.canvasCfg.size.y / 30;
                    for (let i = 0; i < 45; i++) {
                        let angle = Math.floor(Math.random() * 360);
                        new girlBullet2(pObjLayer, this.entity.pos.copy(), speedy, angle)
                    }
                }
            }
            /*
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
            */
        } else {
            this.eTime += delta;
            if (this.eTime >= this.eCoolTime) {
                this.status = true;
                this.eTime = 0;
                this.traID = Fortis.TransitionManager.add(this.entity, "alpha", 600, 1, 0);
                Fortis.TransitionManager.start(this.traID);
            }
        }
    }
}

class arch {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(1, 1);
        nowEnemies[this.id] = this;
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 5, this.aspect)), new Fortis.ImageMaterial("arch"));
        layer.add(this.entity);
        this.layer = layer;
        this.entity.pos = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x * 2 / 5, Fortis.Game.canvasCfg.size.y / 4.8);
        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(this.entity.shape.size.x/2, this.entity.shape.size.y/2);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1700;//弾発射のクールタイム
        this.sw = false;//やりが降ってくるやつ
        this.swTime = 0;//経過時間
        this.swCoolTime = 800;
        this.swCount = 0;//6回

        this.hp = 900;
        this.maxHp = 900;
        this.pos = this.entity.pos.copy();
        this.size = this.entity.shape.size.copy();
        this.status = false;
    }
    update(delta) {
        if (this.hp <= 0) {
            this.layer.remove(this.entity);
            delete nowEnemies[this.id];
            return false;
        }

        if (this.sw) {
            this.swTime += delta;
            if (this.swTime >= this.swCoolTime) {
                this.swTime = 0;
                this.swCount++;
                if (this.swCount == 6) {
                    this.sw = false;
                }
                //攻撃
                let speedy = Fortis.Game.canvasCfg.size.y / 2 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                let randx = Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 3 / 5 + Fortis.Game.canvasCfg.size.x / 10);
                let pos = this.entity.pos.copy();
                pos.x = randx;
                new archBullet4(pObjLayer, pos, speedy);

                if (this.swCount % 3 == 0) {
                    speedy = Fortis.Game.canvasCfg.size.y / 15 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                    let randan = (Math.floor(Math.random() * 10) - 5) * 2;
                    //ノーマル攻撃
                    for (let i = 0; i < 8; i++) {
                        let angle = 18 * (1 + i);
                        new archBullet1(pObjLayer, this.entity.pos.copy(), speedy, randan + angle);
                    }
                }

            }
        } else {
            this.eTime += delta;
            if (this.eTime >= this.eCoolTime) {
                this.eTime = 0;
                let rand = Math.floor(Math.random() * 10);
                //ノーマル攻撃はだいたいやる
                if (rand >= 5) {
                    let speedy = Fortis.Game.canvasCfg.size.y / 15 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                    let randan = (Math.floor(Math.random() * 10) - 5) * 2;
                    //ノーマル攻撃
                    for (let i = 0; i < 8; i++) {
                        let angle = 18 * (1 + i);
                        new archBullet1(pObjLayer, this.entity.pos.copy(), speedy, randan + angle);
                    }
                } else if (rand >= 4) {
                    //ビーム(1)
                    let speedy = Fortis.Game.canvasCfg.size.y / 1 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                    for (let i = 0; i < 15; i++) {
                        let tmpspeed = speedy * (1 - 0.05 * i)
                        let angle = aheadPlayer(speedy, this.entity.pos.copy());
                        new archBullet2(pObjLayer, this.entity.pos.copy(), tmpspeed, angle);
                    }
                } else if (rand >= 2) {//やりホーミング
                    for (let i = 0; i < 20; i++) {
                        let randx = Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x);
                        let speedy = Fortis.Game.canvasCfg.size.y / 1.2 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                        let pos = this.entity.pos.copy();
                        pos.x = randx;
                        let angle = aheadPlayer(speedy, pos);
                        new archBullet3(pObjLayer, pos, speedy, angle);
                    }

                    let speedy = Fortis.Game.canvasCfg.size.y / 15 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                    let randan = (Math.floor(Math.random() * 10) - 5) * 2;
                    //ノーマル攻撃
                    for (let i = 0; i < 8; i++) {
                        let angle = 18 * (1 + i);
                        new archBullet1(pObjLayer, this.entity.pos.copy(), speedy, randan + angle);
                    }
                } else if (rand >= 0) {//やりがたくさんふる
                    let speedy = Fortis.Game.canvasCfg.size.y / 15 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                    let randan = (Math.floor(Math.random() * 10) - 5) * 2;
                    //ノーマル攻撃
                    for (let i = 0; i < 8; i++) {
                        let angle = 18 * (1 + i);
                        new archBullet1(pObjLayer, this.entity.pos.copy(), speedy, randan + angle);
                    }

                    this.sw = true;
                    this.swTime = 0;
                    this.swCount = 0;
                }
            }
        }

    }
}

class bh {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(57, 22);
        nowEnemies[this.id] = this;
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 12, this.aspect)), new Fortis.ImageMaterial("arch_bh"));
        layer.add(this.entity);
        this.layer = layer;
        this.entity.pos = pos.copy();
        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(this.entity.shape.size.x / 2, this.entity.shape.size.y / 2);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1700;//弾発射のクールタイム

        this.hp = 250;
        this.maxHp = 250;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, 0);
    }
    update(delta) {
        if (this.hp <= 0) {
            this.layer.remove(this.entity);
            delete nowEnemies[this.id];
            return false;
        }

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
            if (rand > 3) {//レーザー
                let speedy = Fortis.Game.canvasCfg.size.y / 1 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                for (let i = 0; i < 8; i++) {
                    let tmpspeed = speedy * (1 - 0.05 * i)
                    let angle = aheadPlayer(speedy, this.entity.pos.copy());
                    new archBhBullet2(pObjLayer, this.entity.pos.copy(), tmpspeed, angle);
                }
            } else {//3way
                new archBhBullet1(pObjLayer, this.entity.pos.copy(), Fortis.Game.canvasCfg.size.y / 10, 0);
                new archBhBullet1(pObjLayer, this.entity.pos.copy(), Fortis.Game.canvasCfg.size.y / 10, -30);
                new archBhBullet1(pObjLayer, this.entity.pos.copy(), Fortis.Game.canvasCfg.size.y / 10, 30);
            }
        }
    }
}

class scp {
    constructor(layer, pos) {
        this.id = Fortis.util.randomID();
        this.aspect = new Fortis.Vector2(27, 23);
        nowEnemies[this.id] = this;
        this.entity = new Fortis.Entity(new Fortis.ImageShape(Fortis.util.calculateKeepingAspectSize(Fortis.Game.canvasCfg.size.x / 10, this.aspect)), new Fortis.ImageMaterial("scp"));
        layer.add(this.entity);
        this.layer = layer;
        this.entity.pos = pos.copy();
        this.cg = new Fortis.ColliderGroup();
        this.c = new Fortis.CircleCollider(this.entity.shape.size.x / 2, this.entity.shape.size.y / 2);
        this.cg.add(this.c);
        this.cg.link(this.entity);

        this.eTime = 0;//前回弾を発射させてからの経過時間
        this.eCoolTime = 1800;//弾発射のクールタイム

        this.hp = 650;
        this.maxHp = 650;
        this.pos = pos.copy();
        this.size = this.entity.shape.size.copy();
        this.speed = new Fortis.Vector2(Fortis.Game.canvasCfg.size.x / 15, Fortis.Game.canvasCfg.size.y / 12);
    }
    update(delta) {
        if (this.hp <= 0) {
            this.layer.remove(this.entity);
            delete nowEnemies[this.id];
            return false;
        }
        
        this.pos.add(this.speed.copy().mul(delta / 1000));
        if (this.pos.x < this.size.x / 2) {
            this.pos.x = this.size.x / 2;
            this.speed.x *= -1;
        }
        if (this.pos.x > Fortis.Game.canvasCfg.size.x * 4 / 5 - this.size.x / 2) {
            this.pos.x = Fortis.Game.canvasCfg.size.x * 4 / 5 - this.size.x / 2;
            this.speed.x *= -1;
        }
        if (this.pos.y < this.size.y / 2) {
            this.pos.y = this.size.y / 2;
            this.speed.y *= -1;
        }
        if (this.pos.y > Fortis.Game.canvasCfg.size.y / 4 - this.size.y / 2) {
            this.pos.y = Fortis.Game.canvasCfg.size.y / 4 - this.size.y / 2;
            this.speed.y *= -1;
        }
        this.entity.pos = this.pos.copy();

        this.eTime += delta;
        if (this.eTime >= this.eCoolTime) {
            this.eTime = 0;
            let rand = Math.floor(Math.random() * 20);
            if (rand >= 16) {//さそりホーミング
                for (let i = 0; i < 5; i++) {
                    let randx = Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x);
                    let speedy = Fortis.Game.canvasCfg.size.y / 3 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                    let pos = this.entity.pos.copy();
                    pos.x = randx;
                    let angle = aheadPlayer(speedy, pos);
                    new scpBullet4(pObjLayer, pos, speedy, angle);
                }
            } else if (rand >= 14) {//どくぎり
                new scpBullet1(pObjLayer, this.entity.pos.copy(), Fortis.Game.canvasCfg.size.y / 15, 0);
                new scpBullet1(pObjLayer, this.entity.pos.copy(), Fortis.Game.canvasCfg.size.y / 15, -30);
                new scpBullet1(pObjLayer, this.entity.pos.copy(), Fortis.Game.canvasCfg.size.y / 15, 30);

                for (let i = 0; i < 5; i++) {
                    let pos = new Fortis.Vector2(Math.floor(Math.random() * Fortis.Game.canvasCfg.size.x * 2 / 5) + Fortis.Game.canvasCfg.size.x / 5, Fortis.Game.canvasCfg.size.y / 2.25 + Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y / 5));
                    let speedy = Fortis.Game.canvasCfg.size.y / 30 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                    new scpBullet3(pObjLayer, this.entity.pos.copy(), speedy, pos);
                }
            } else if (rand >= 11) {//ビーム
                new scpBullet1(pObjLayer, this.entity.pos.copy(), Fortis.Game.canvasCfg.size.y / 15, 0);
                new scpBullet1(pObjLayer, this.entity.pos.copy(), Fortis.Game.canvasCfg.size.y / 15, -30);
                new scpBullet1(pObjLayer, this.entity.pos.copy(), Fortis.Game.canvasCfg.size.y / 15, 30);

                let speedy = Fortis.Game.canvasCfg.size.y / 1.2 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                for (let i = 0; i < 12; i++) {
                    let tmpspeed = speedy * (1 - 0.05 * i)
                    let angle = aheadPlayer(speedy, this.entity.pos.copy());
                    new scpBullet2(pObjLayer, this.entity.pos.copy(), tmpspeed, angle);
                }
            } else if (rand >= 1) {//3way
                new scpBullet1(pObjLayer, this.entity.pos.copy(), Fortis.Game.canvasCfg.size.y / 15, 0);
                new scpBullet1(pObjLayer, this.entity.pos.copy(), Fortis.Game.canvasCfg.size.y / 15, -30);
                new scpBullet1(pObjLayer, this.entity.pos.copy(), Fortis.Game.canvasCfg.size.y / 15, 30);
            } else if (rand >= 0) {
                //ライオンを横に流す
                for (let i = 0; i < 2; i++) {
                    let randy = Math.floor(Math.random() * Fortis.Game.canvasCfg.size.y * 2.2 / 5 + Fortis.Game.canvasCfg.size.y * 2 / 5);
                    let randspeed = Fortis.Game.canvasCfg.size.x / 15 * (Math.floor(Math.random() * 3) / 10 + 0.7);
                    new scpBullet5(pObjLayer, new Fortis.Vector2(0, randy), randspeed);
                }
            }
        }
    }
}