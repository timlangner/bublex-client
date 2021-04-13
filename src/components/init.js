import * as PIXI from 'pixi.js';

export function init() {
    // start observing a DOM node

    var initBase = 0x27272727;
    var initVersion = 21002;
    var protocolVersion = 6;
    var init2 = [0xB00327C8, 0x98FB213F, 0xBF597FC7, 0xBEEF0EE4];
    var pa = ((initBase ^ initVersion) ^ protocolVersion) << (Math.imul(0x27272727, initVersion ^ initBase));
    //window.canSendMouse = false;
    //window.mouseInterval = null;

    let cameraC;
    let cameraX = 0;
    let cameraY = 0;
    let cameraLX = 0;
    let cameraLY = 0;
    let cameraScale = 1;
    let cameraLScale = 1;
    let core = {
        animation: 10,
        socket: null,
        entities: [],
        players: [],
        scoreboard: [],
        spritelist: [],
        actualSprie: [],
        textCache: {},
        cellCache: {},
        spawned: false,
        spectate: false,
        border: {
            left: -7071,
            top: -7071
        }
    };

    //http://135.125.183.75:8081/api/v1/shop/skins

    // console.log(xhttp.response);
    const virusSkin = PIXI.Texture.from('Virus.png'),
        alienSkin = PIXI.Texture.from('Alien.png'),
        canvas = document.getElementById('mycanvas'),
        renderer = new PIXI.Renderer({
            view: canvas,
            width: document.body.innerWidth,
            height: document.body.innerHeight,
            resolution: window.devicePixelRatio,
            forceCanvas: false,
            antialias: true,
            powerPreference: "high-performance",

        }),
        resizeObserver = new ResizeObserver(entries =>
            renderer.resize(window.innerWidth, window.innerHeight)
        ),
        loader = PIXI.Loader.shared,
        skinsList = [];
    resizeObserver.observe(document.body);
    const xhttp = new XMLHttpRequest();
    let syncUpdStamp = Date.now();
    xhttp.open("GET", "http://135.125.183.75:8081/api/v1/shop/skins", true);
    xhttp.send();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(typeof this.responseText);
            // skinsList = this.responseText;
        }
    };
    Array.prototype.remove = function(a) {
        const i = this.indexOf(a);
        return i !== -1 && this.splice(i, 1);
    }

    function lerp(start, end, amt) {
        return (1 - amt) * start + amt * end
    }

    var mouseX = 0;
    var mouseY = 0;
    canvas.onmousemove = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }
    let _w = window.innerWidth;
    let _h = window.innerHeight;
    renderer.backgroundColor = 0x0a0a0a;
    // loader.add('Alien', 'Alien.png');
    loader.onProgress.add((loader, resource) => {
        // called once for each file
        console.log('progress: ' + loader.progress + '%');
    });
    loader.onError.add((message, loader, resource) => {
        // called once for each file, if error
        console.log('Error: ' + resource.name + ' ' + message);
    });
    loader.onLoad.add((loader, resource) => {
        // called once per loaded file
        console.log(resource.name + ' loaded');
    });
    loader.onComplete.add((loader, resources) => {
        // called once all queued resources has been loaded
        // triggered before load method callback
        console.log('loading complete!');
    });
    var nameCache = [];
    window.addEventListener('resize', resize);

    function resize() {

        _w = window.innerWidth;
        _h = window.innerHeight;

        renderer.resize(_w, _h);
        //setInterval(core.sendMouseMove((mouseX - innerWidth * 0.5) / cameraScale + cameraX, (mouseY - innerHeight * 0.5) / cameraScale + cameraY), 40);
    }

    const stage = new PIXI.Container();
    const playerCells = new PIXI.Container();
    const food = new PIXI.Container();
    const leaderboard = new PIXI.Container();
    const minimap = new PIXI.Container();
    var grid = new PIXI.Graphics();
    stage.addChild(grid);
    stage.addChild(playerCells);
    const ticker = new PIXI.Ticker();
    ticker.add(animate);
    ticker.start();
    //const testSkin = new PIXI.Sprite.from('Alien.png');
    /*const loader = PIXI.Loader.shared;
    loader.onProgress.add((loader, resource) => {
        // called once for each file
        let testSkin = new PIXI.Sprite('Alien.png');
        console.log('progress: ' + loader.progress + '%');
    });
    loader.onError.add((message, loader, resource) => {
        // called once for each file, if error
        console.log('Error: ' + resource.name + ' ' + message);
    });
    loader.onLoad.add((loader, resource) => {
        // called once per loaded file
        console.log(resource.name + ' loaded');
    });
    loader.onComplete.add((loader, resources) => {
        // called once all queued resources has been loaded
        // triggered before load method callback
        console.log('loading complete!');
    });*/
    let constrain;
    constrain = function(n, low, high) {
        return Math.max(Math.min(n, high), low);
    };

    function animate() {

        core.clearPixi();
        cameraScale = constrain(cameraScale, 0.1, 1);
        cameraLScale = lerp(cameraLScale, cameraScale, 0.07);
        cameraLX = lerp(cameraLX, cameraX, 0.07);
        cameraLY = lerp(cameraLY, cameraY, 0.07);

        stage.position.x = window.innerWidth / 2;
        stage.position.y = window.innerHeight / 2;
        stage.scale.x = cameraLScale;
        stage.scale.y = cameraLScale;
        stage.pivot.x = cameraLX;
        stage.pivot.y = cameraLY;
        // core.drawGrid();



        /*let sorted = core.entities.slice(0).sort((a, b) => {
            return (a.dr ? a.dr : a.r) === (b.dr ? b.dr : b.r) ? a.id - b.id : (a.dr ? a.dr : a.r) - (b.dr ? b.dr : b.r);
        });*/
        //  for(var i = 0; i < playerCells.children; i++){
        //    playerCells.children.setChildIndex(i, -playerCells[i].r);
        //}
        //console.log(playerCells.children[0]);
        // return a.r === b.r ? a.id - b.id : a.r - b.r;
        //return (a.dr ? a.dr : a.r) === (b.dr ? b.dr : b.r) ? a.id - b.id : (a.dr ? a.dr : a.r) - (b.dr ? b.dr : b.r);
        // return (a.cSize) - (b.cSize);
        //return (b.cSize ? b.cSize : b.cSize) ===  (a.cSize ? a.cSize : a.cSize);
        // console.log(a.dr, b.dr)

        // console.log(playerCells.children);
        for (let i = 0; i < core.entities.length; i++) {
            // playerCells.setChildIndex(core.entities[i].graphics, core.entities[i].r / 10000)
            // if (!(core.entities[i] instanceof Pellet)) {
            core.entities[i].update();
            // }

            //core.entities[i].graphics.setChildIndex(, );

            core.entities[i].render();
            if (core.entities[i].toremove) {
                core.entities[i].remove();
            }
        }
        // for (let i = 0; i < core.entities.length; i++) {
        //     if (core.entities[i].toremove) {
        //         core.entities[i].remove();
        //     }
        // }
        playerCells.children.sort((a, b) => {
            return a.height / 2 - b.height / 2; // ASC -> a - b; DESC -> b - a
        });
        renderer.render(stage);
        core.sendMouseMove((mouseX - window.innerWidth * 0.5) / cameraScale + cameraX, (mouseY - window.innerHeight * 0.5) / cameraScale + cameraY)
    }



    //            core.WebK = 0;
    //core.StartWebK = false;
    /*core.rotate = (key) => {
        key = Math.imul(key, 1540483477) >> 0;
        key = (Math.imul(key >>> 24 ^ key, 1540483477) >> 0) ^ 114296087;
        key = Math.imul(key >>> 13 ^ key, 1540483477) >> 0;
        key = key >>> 15 ^ key;
        key = key ^ init2[0];
        key = init2[1] ^ key;
        key = key >>> 2;
        return key;
    }
    core.dring = (msg) => {

        msg = new Uint8Array(msg.buffer);

        if (core.StartWebK == false) {

            return msg.buffer;

        } else {

            var ArrayB = new Uint8Array(msg.length);

            var keyBytes = [

                (core.WebK & 255),
                (core.WebK >>> 8) & 255,
                (core.WebK >>> 16) & 255,
                (core.WebK >>> 24) & 255

            ];

            var keyBytes2 = [

                (keyBytes[0] << 2) & 255,
                (keyBytes[1] << 2) & 255,
                (keyBytes[2] << 2) & 255,

            ];

            for (var i = 0; i < msg.length; i++) {

                ArrayB[i] = (msg[i] ^ keyBytes[i % 4]) ^ keyBytes2[i % 3];

            };

            return ArrayB.buffer;

        };

    }*/
    var _appendBuffer = function(buffer1, buffer2) {
        var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
        tmp.set(new Uint8Array(buffer1), 0);
        tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
        return tmp.buffer;
    };

    var __buf = new DataView(new ArrayBuffer(8));

    function Writer(littleEndian) {
        this.reset(littleEndian);
        return this;
    }
    Writer.prototype = {
        writer: true,
        reset: function(littleEndian) {
            this._e = littleEndian;
            this._b = [];
            this._o = 0;
        },
        setUint8: function(a) {
            if (a >= 0 && a < 256) this._b.push(a);
            // this._move(1);
            return this;
        },
        setInt8: function(a) {
            if (a >= -128 && a < 128) this._b.push(a);
            //   this._move(1);
            return this;
        },
        setUint16: function(a) {
            __buf.setUint16(0, a, this._e);
            this._move(2);
            return this;
        },
        setInt16: function(a) {
            __buf.setInt16(0, a, this._e);
            this._move(2);
            return this;
        },
        setUint32: function(a) {
            __buf.setUint32(0, a, this._e);
            this._move(4);
            return this;
        },
        setInt32: function(a) {
            __buf.setInt32(0, a, this._e);
            this._move(4);
            return this;
        },
        setFloat32: function(a) {
            __buf.setFloat32(0, a, this._e);
            this._move(4);
            return this;
        },
        setFloat64: function(a) {
            __buf.setFloat64(0, a, this._e);
            this._move(8);
            return this;
        },
        _move: function(b) {
            for (var i = 0; i < b; i++) this._b.push(__buf.getUint8(i));
        },
        setStringUTF8: function(s) {
            var bytesStr = unescape(encodeURIComponent(s));
            for (var i = 0, l = bytesStr.length; i < l; i++) this._b.push(bytesStr.charCodeAt(i));
            this._b.push(0);
            return this;
        },
        build: function() {
            return new Uint8Array(this._b);
        }
    };

    function Reader(view, offset, littleEndian) {
        this.repurpose(view, offset, littleEndian);
    }
    Reader.prototype = {
        reader: true,
        repurpose: function(view, offset, littleEndian) {
            this._e = littleEndian;
            this.view = view;
            this._o = offset || 0;
        },
        getUint8: function() {
            return this.view.getUint8(this._o++, this._e);
        },
        getInt8: function() {
            return this.view.getInt8(this._o++, this._e);
        },
        getUint16: function() {
            return this.view.getUint16((this._o += 2) - 2, this._e);
        },
        getInt16: function() {
            return this.view.getInt16((this._o += 2) - 2, this._e);
        },
        getUint32: function() {
            return this.view.getUint32((this._o += 4) - 4, this._e);
        },
        getInt32: function() {
            return this.view.getInt32((this._o += 4) - 4, this._e);
        },
        getFloat32: function() {
            return this.view.getFloat32((this._o += 4) - 4, this._e);
        },
        getFloat64: function() {
            return this.view.getFloat64((this._o += 8) - 8, this._e);
        },
        skipBytes: function(bytes) {
            this._o += bytes;
        },
        getStringUTF8: function() {
            var s = "",
                b;
            while ((b = this.view.getUint8(this._o++)) !== 0) s += String.fromCharCode(b);

            return decodeURIComponent(escape(s));
        }
    };

    class Cell {
        constructor(id, nick, x, y, r, hex) {
            this.id = id;
            this.setNick(nick);
            this.x = x;
            this.y = y;
            this.r = r;
            this.dx = x;
            this.dy = y;
            this.dr = r;
            this.hex = hex;
            this.checked = false;
            this.tick = 0;
            this.optimized = Math.floor((this.dr * this.dr) / 1e2);
            this.graphics = new PIXI.Container();
            this.graphics.id = this.id;
            this.graphics.type = 'Cell';
            //this.graphics.addChild(this.skin);
            //
            this.born = syncUpdStamp;
            this.points = [];
            this.pointsVel = [];
            this.destroyed = false;
            this.toremove = false;
            this.diedBy = 0;
            this.dead = null;
            playerCells.addChild(this.graphics);
            this.graphicsCell = new PIXI.Graphics();
            //this.graphicsCell.beginFill(this.hex);
            this.border = new PIXI.Graphics();

            //this.graphicsCell.beginTextureFill({texture: alienSkin, matrix: new PIXI.matrix});
            //this.mySkinSprite = alienSkin.clone();
            //this.mySkinSprite.height = this.dr * 2;
            //this.mySkinSprite.width = this.dr * 2;
            // this.graphicsCell.beginTextureFill(alienSkin, this.hex, 1, new PIXI.Matrix(alienSkin.height, this.r));
            //this.mySkin = new PIXI.Texture.from('Alien.png');
            //this.mySkin.scale.x = this.r * 2;
            //this.mySkin.width = this.r * 2;
            //this.graphicsCell.beginTextureFill(alienSkin);
            //this.graphicsCell.lineStyle(this.r / 20, 0xFFFFFF);
            //this.graphicsCell.drawCircle(0, 0, this.dr);
            //this.graphicsCell.endFill();


            //this.graphicsSkin = new PIXI.Sprite(alienSkin);
            //this.graphicsSkin.mask = this.graphicsCell;
            //this.graphicsSkin.mask = this.graphicsCell;

            /*this.graphicsSkin.anchor.set(0.5);
            this.graphicsSkin.scale.x = this.r / 250;
            this.graphicsSkin.scale.y = this.r / 250;
            this.graphicsSkin.mask = this.graphicsCell;*/

            //  this.graphicsSkin.scale.x = 2;
            //this.graphicsSkin.x = this.dx;
            //this.graphicsSkin.x = this.dx;
            //this.graphicsSkin.pivot.y = 15;
            //this.graphicsCell.addChild(this.graphicsSkin);

            //this.skin.pivot.y = 15;

            this.skin = new PIXI.Sprite(alienSkin);
            this.skin.anchor.set(0.5);
            this.skin.x = this.dx;
            this.skin.y = this.dy;
            this.skin.height = this.dr * 2;
            this.skin.width = this.dr * 2;
            this.skin.mask = this.border;
            this.graphics.addChild(this.skin);
            this.graphics.addChild(this.border);
            this.graphics.addChild(this.graphicsCell);

            //this.graphics.addChild(this.graphicsSkin);
            this.text = null;
            //circle.lineStyle (100, 0xFFFFFF);
            if (this.r > 10) {
                this.text = this.createText({
                    fontFamily: 'Verdana',
                    lineJoin: 'round',
                    fontSize: 200,
                    fill: 0xffffff
                });
                this.text.anchor.set(0.5);
                this.text.pivot.y = 15;
                this.text.x = this.dx;
                this.text.y = this.dy;
                //console.log(this.text.fontSize);
                this.graphics.addChild(this.text);

            }

            //loader.use('Alien')
            //this.skin = testSkin;
            //this.skin.mask = this.graphics[0]
            //this.graphics.addChild(testSkin);
            //if text exist use cloned sprite else create new text and push it to spritelist
            /*if(core.spritelist.indexOf(this.name) != -1){
                console.log(core.actualSprie);
                this.text = new PIXI.Sprite(core.actualSprie[core.spritelist.indexOf(this.name)].texture);
                this.text.fontSize = this.r / 4;
                this.text.anchor.set(0.5);
                this.text.pivot.y = 15;

                this.graphics.addChild(this.text);

            }else{
                this.text = new PIXI.Text(this.name,{fontFamily : 'Verdana', lineJoin: 'round', fontSize: this.r / 4, fill : 0xffffff});
                this.graphics.addChild(this.text);
                this.text.anchor.set(0.5);
                this.text.pivot.y = 15;
                core.spritelist.push(this.name);
                core.actualSprie.push(this.text);
            }*/

            //this.textGraphic = tcells.byIdhis.createText();

        }
        destroy(killerId = undefined) {
            // core.entities.remove(this.id);
            //if (cells.mine.remove(this.id) && cells.mine.length === 0) showESCOverlay();
            if (!this.destroyed && killerId == undefined) this.remove();
            this.destroyed = true;
            this.dead = syncUpdStamp;
            if (killerId && !this.diedBy) {
                this.diedBy = killerId;
                this.updated = syncUpdStamp;
            }
        }
        updateNumPoints() {
            let numPoints = Math.min(Math.max(this.r * cameraScale | 0, 50), 500);
            if (this.jagged) numPoints = 100;
            while (this.points.length > numPoints) {
                const i = Math.random() * this.points.length | 0;
                this.points.splice(i, 1);
                this.pointsVel.splice(i, 1);
            }
            if (this.points.length === 0 && numPoints !== 0) {
                let place = {
                    x: this.dx,
                    y: this.dy,
                    rl: this.dr,
                    parent: this
                }
                console.log(place);
                this.points.push(place);
                console.log(this.points);
                this.pointsVel.push(Math.random() - 0.5);
            }
            while (this.points.length < numPoints) {
                const i = Math.random() * this.points.length | 0;
                const point = this.points[i];
                const vel = this.pointsVel[i];
                let place = {
                    x: this.dx,
                    y: this.dy,
                    rl: this.dr,
                    parent: this
                }
                this.points.splice(i, 0, place);
                this.pointsVel.splice(i, 0, vel);
            }
        }
        movePoints() {
            const pointsVel = this.pointsVel.slice();
            for (let i = 0; i < this.points.length; ++i) {
                const prevVel = pointsVel[(i - 1 + this.points.length) % this.points.length];
                const nextVel = pointsVel[(i + 1) % this.points.length];
                const newVel = Math.max(Math.min((this.pointsVel[i] + Math.random() - 0.5) * 0.7, 10), -10);
                this.pointsVel[i] = (prevVel + nextVel + 8 * newVel) / 10;
            }
            for (let i = 0; i < this.points.length; ++i) {
                const curP = this.points[i];
                const prevRl = this.points[(i - 1 + this.points.length) % this.points.length].rl;
                const nextRl = this.points[(i + 1) % this.points.length].rl; // here
                let curRl = this.dr; //curP.rl;
                let affected = !1;
                // let affected = quadtree.some({
                //     x: curP.x - 5,
                //     y: curP.y - 5,
                //     w: 10,
                //     h: 10
                // }, (item) => item.parent !== this && sqDist(item, curP) <= 25);
                if (!affected &&
                    (curP.x < core.border.left || curP.y < core.border.top ||
                        curP.x > core.border.right || curP.y > core.border.bottom)) {
                    affected = true;
                }
                if (affected) {
                    this.pointsVel[i] = Math.min(this.pointsVel[i], 0) - 1;
                }
                curRl += this.pointsVel[i] * 2;
                curRl = Math.max(curRl, 0);
                // curRl = (9 * curRl + this.dr) / 10;
                // console.log(prevRl + ' ' + nextRl + ' ' + curRl);
                // curP.rl = (prevRl + nextRl + 8 * curRl) / 10;

                const angle = (2 * Math.PI * i / this.points.length);
                let rl = curP.rl;
                if (this.jagged && i % 2 === 0) {
                    rl += 5;
                }
                curP.x = this.dx + Math.cos(angle) * curRl;
                curP.y = this.dy + Math.sin(angle) * curRl;
            }
        }
        createText(options) {
            var text = core.textCache[this.name];
            if (text) {
                return new PIXI.Sprite(text.texture);
            }
            var text = new PIXI.Text(this.name, options);
            text.updateText(); // Without this, texture would be empty until its added to stage and rendered to screen
            // Cache the text
            core.textCache[this.name] = text;

            return new PIXI.Sprite(text.texture);
        }
        setNick(name) {
            if (name == null || name == "") name = '';

            //name = name.split('$$$')
            //this.color = name[1];
            //name = name[0].split('°°°');
            //this.hat = name[1];
            //this.name = name[0];
            this.name = name;

        }
        // createText(){
        // if()

        //  }

        render() {


            // else if (this.jagged) {
            //     const pointCount = 120;
            //     const incremental = PI_2 / pointCount;
            //     ctx.moveTo(this.x, this.y + this.s + 3);
            //     for (let i = 1; i < pointCount; i++) {
            //         const angle = i * incremental;
            //         const dist = this.s - 3 + (i % 2 === 0) * 6;
            //         ctx.lineTo(
            //             this.x + dist * Math.sin(angle),
            //             this.y + dist * Math.cos(angle)
            //         )
            //     }
            //     ctx.lineTo(this.x, this.y + this.s + 3);
            // }
            this.graphicsCell.position.x = this.dx;
            this.graphicsCell.position.y = this.dy;
            this.graphicsCell.width = this.dr * 2;
            this.graphicsCell.height = this.dr * 2;
            if (this.text) {
                this.text.x = this.dx;
                this.text.y = this.dy;
                this.text.scale.set(this.dr / 500);
            }
            //console.log('rendering player');

            /*this.graphics.position = new PIXI.Point(this.dx, this.dy);
            this.graphics.radius = this.dr;_*/
            // this.graphics.height = this.dr * 2;
            //this.graphics.dirty = this.dr;
            //this.graphics.position.set(this.dx, this.dy);
            /* this.graphics.clear();
             this.graphics.beginFill(this.hex);
             this.graphics.drawCircle(this.dx, this.dy, this.dr);
             this.graphics.endFill();*/
            //console.log(this.graphics.getBounds());

            /*this.graphics.position.x = this.dx;
            this.graphics.position.y = this.dy;
            this.graphics.width = this.dr * 2;
            this.graphics.height = this.dr * 2;*/
            //playerCells.removeChild(this.graphics);
            //playerCells.addChild(this.graphics);
            //this.graphics.clear();
            //this.graphics.beginFill(this.hex); // Blue
            // drawCircle(x, y, radius)

            /*push();
    translate(this.dx, this.dy);
    noStroke();
    fill(this.hex);
    circle(0, 0, this.dr * 2);

    if (this.skin) {
        noFill();
        noStroke();
        document["getElementById"]("P5Canvas")["getContext"]("2d")["save"]();
        ellipse(0, 0, this.dr);
        document["getElementById"]("P5Canvas")["getContext"]("2d")["clip"]();
        image(this.skin, 0, 0, this.dr * 2, this.dr * 2);
        document["getElementById"]("P5Canvas")["getContext"]("2d")["restore"]();
    }

    fill(255);
   // stroke("#000000");
   // strokeWeight(5);
    textSize(this.dr * 0.3);
    textAlign(CENTER);

    if (this.nick) {
     text(this.nick, 0, textSize() * 0.25);
    }

    text(this.optimized, 0, (textSize() * 0.25) + (this.dr * 0.4));
    pop();*/
        }
        remove() {
            const index = core.entities.findIndex(index => index.id == this.id);
            if (core.entities.findIndex(index => index.id == this.id) > -1) {
                //continue;
                let index = core.entities.findIndex(index => index.id == this.id);
                playerCells.removeChild(core.entities[index].graphics);
                // core.entities[index].destroy(killer);
                core.entities.splice(core.entities.findIndex(index => index.id == this.id), 1);
                // }, 30);
            }
            if (core.players.findIndex(index => index.id == this.id) > -1) {
                let index = core.players.findIndex(index => index.id == this.id);
                //console.log(core.entities[index]);
                // core.players[index].graphics.clear();
                // removePlayerSmooth(core, index, id, 1000);
                // core.players[index].destroy(killer);
                playerCells.removeChild(core.players[index].graphics);
                core.players.splice(core.players.findIndex(index => index.id == this.id), 1);
                // core.players[index].graphics.alpha = 0.1;
            }
        }
        update() {
            if (!this.checked) {
                /*  for (let i = 0; i < skins.length; i++) {
                      if (this.nick.includes(skins[i].ID)) {
                          this.skin = skins[i].SKIN;
                      }
                  }*/
                this.checked = true;
            }
            this.updateNumPoints();
            this.movePoints();
            if ( /*settings.jellyPhysics &&*/ this.points.length) {
                this.border.clear();
                this.border.beginFill(this.hex);
                const point = this.points[0];
                this.border.position.set(0, 0);
                this.border.moveTo(point.x, point.y);
                this.border.lineStyle(~~(this.dr / 30), this.hex * 0.9); //{
                //     width: ~~(this.dr / 30),
                //         color: darkenHex(this.hex),
                //         join: "round"
                // });
                for (let i = 0; i < this.points.length; i++) {
                    if (i < this.points.length - 1) this.border
                        //.moveTo(points[i + 1].x, points[i + 1].y)
                        .lineTo(this.points[i].x, this.points[i].y);
                    else this.border
                        //.moveTo(points[0].x, points[0].y)
                        .lineTo(this.points[i].x, this.points[i].y);


                }
                this.border.closePath();

                this.border.endFill();
            }

            this.tick += 1;

            if (this.tick >= 25) {
                this.tick = 0;
                this.optimized = Math.floor((this.dr * this.dr) / 1e2);
            }
            let diedBy = core.entities[core.entities.findIndex(index => index.id == this.diedBy)];
            if (this.destroyed && Date.now() > this.dead + 200) {
                this.toremove = true;
            } else if (this.diedBy && (diedBy)) {
                this.x = diedBy.x
                this.y = diedBy.y
                this.r = ~~(this.r * 0.9);
                this.graphics.alpha -= 0.05;
            }
            if (!this.diedBy) {
                this.dx = lerp(this.dx, this.x, 0.2);
                this.dy = lerp(this.dy, this.y, 0.2);
            } else {
                this.dx = lerp(this.dx, this.x, 0.3);
                this.dy = lerp(this.dy, this.y, 0.3);
            }
            this.dr = lerp(this.dr, this.r, 0.075);
            //this.graphics.r = this.r;
            //this.graphics.dr = this.dr;
            /* this.skin.x = this.dx;
             this.skin.y = this.dy;
             this.skin.height = this.dr * 2;
             this.skin.width = this.dr * 2;*/
            /*this.graphics.x = this.dx;
            this.graphics.y = this.dy;
            this.graphics.width = this.dr * 2;
            this.graphics.height = this.dr * 2;
            this.graphics._fillStyle = this.hex;
            this.graphics.cSize = this.dr;*/
            /*this.dx += (this.x - this.dx) / core.animation;
            this.dy += (this.y - this.dy) / core.animation;
            this.dr += this.dr + (this.r - this.dr) / core.animation > this.dr ? (this.r - this.dr) / core.animation : (this.r - this.dr) / core.animation * 0.8;
            */

            const ratio = this.r / this.dr;
            if (this.dr != this.r && ratio != 1) {
                for (const point of this.points) point.rl *= ratio;
            }

        }
    }

    class Virus {
        constructor(id, x, y, r, hex) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.r = r;
            this.dx = x;
            this.dy = y;
            this.dr = r;
            this.hex = fullColorHex(hex[0], hex[1], hex[2]);
            this.stroke = fullColorHex(hex[0] * 0.9, hex[1] * 0.9, hex[2] * 0.9);
            this.a = Math.PI * 2 / 30;
            this.da = this.a * 0.5;
            this.graphics = new PIXI.Graphics();
            this.graphics.id = this.id;
            this.graphics.type = 'Virus';


            this.skin = new PIXI.Sprite(virusSkin);
            this.skin.anchor.set(0.5);
            //this.skin.pivot.y = 15;
            this.skin.x = this.dx;
            this.skin.y = this.dy;
            this.skin.height = this.dr * 2;
            this.skin.width = this.dr * 2;
            this.skin.mask = this.graphicsCell;
            this.graphics.addChild(this.skin);
            this.born = syncUpdStamp;
            this.points = [];
            this.pointsVel = [];
            this.destroyed = false;
            this.diedBy = 0;
            this.toremove = false;
            this.dead = null;

            playerCells.addChild(this.graphics);
        }
        destroy(killerId) {
            // core.entities.remove(this.id);
            //if (cells.mine.remove(this.id) && cells.mine.length === 0) showESCOverlay();
            this.destroyed = true;
            this.dead = syncUpdStamp;
            if (killerId && !this.diedBy) {
                this.diedBy = killerId;
                this.updated = syncUpdStamp;
            }
        }
        render() {
            this.graphics.clear();
            // this.graphics.beginFill(this.hex); // Blue
            this.graphics.drawCircle(this.dx, this.dy, this.dr); // drawCircle(x, y, radius)
            this.graphics.endFill();
            /*push();
            translate(this.dx, this.dy);
            fill(this.hex);
            stroke("#000000");
            strokeWeight(10);
            beginShape();
            for (let i = 0; i < TWO_PI; i += this["a"]) {
                vertex(Math["cos"](i) * (this["dr"] + 10), Math["sin"](i) * (this["dr"] + 10));
                vertex(Math["cos"](i + this["da"]) * this["dr"], Math["sin"](i + this["da"]) * this["dr"]);
            }
            endShape(CLOSE);
            pop();*/
        }
        remove() {
            const index = core.entities.findIndex(index => index.id == this.id);
            if (core.entities.findIndex(index => index.id == this.id) > -1) {
                //continue;
                let index = core.entities.findIndex(index => index.id == this.id);
                playerCells.removeChild(core.entities[index].graphics);
                // core.entities[index].destroy(killer);
                core.entities.splice(core.entities.findIndex(index => index.id == this.id), 1);
                // }, 30);
            }
            if (core.players.findIndex(index => index.id == this.id) > -1) {
                let index = core.players.findIndex(index => index.id == this.id);
                //console.log(core.entities[index]);
                // core.players[index].graphics.clear();
                // removePlayerSmooth(core, index, id, 1000);
                // core.players[index].destroy(killer);
                playerCells.removeChild(core.players[index].graphics);
                core.players.splice(core.players.findIndex(index => index.id == this.id), 1);
                // core.players[index].graphics.alpha = 0.1;
            }
        }
        update() {
            /*this.dx = lerp(this.dx, this.x, 0.1);
            this.dy = lerp(this.dy, this.y, 0.1);
            this.dr = lerp(this.dr, this.r, 0.1);*/

            let diedBy = core.entities[core.entities.findIndex(index => index.id == this.diedBy)];
            if (this.destroyed && Date.now() > this.dead + 5000) {
                this.toremove = true;
            } else if (this.diedBy && (diedBy)) {
                this.x = diedBy.x
                this.y = diedBy.y
                this.r = ~~(this.r * 0.9);
                this.graphics.alpha -= 0.05;
            }
            if (!this.diedBy) {
                this.dx = lerp(this.dx, this.x, 0.2);
                this.dy = lerp(this.dy, this.y, 0.2);
            } else {
                this.dx = lerp(this.dx, this.x, 0.1);
                this.dy = lerp(this.dy, this.y, 0.05);
            }
            this.dr = lerp(this.dr, this.r, 0.05);
            this.skin.x = this.dx;
            this.skin.y = this.dy;
            this.skin.height = this.dr * 2;
            this.skin.width = this.dr * 2;
            /* this.dx += (this.x - this.dx) / core.animation;
             this.dy += (this.y - this.dy) / core.animation;
             this.dr += this.dr + (this.r - this.dr) / core.animation > this.dr ? (this.r - this.dr) / core.animation : (this.r - this.dr) / core.animation * 0.8;*/
            // this.graphics.cSize = this.dr;

        }
    }

    class Ejected {
        constructor(id, x, y, r, hex) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.r = r;
            this.dx = x;
            this.dy = y;
            this.dr = r;
            this.hex = hex;
            this.graphics = new PIXI.Graphics();
            this.graphics.id = this.id;
            this.graphics.type = 'Ejected';
            this.born = syncUpdStamp;
            this.points = [];
            this.pointsVel = [];
            this.destroyed = false;
            this.diedBy = 0;
            this.toremove = false;
            this.dead = null;
            playerCells.addChild(this.graphics);
        }
        destroy(killerId) {
            // core.entities.remove(this.id);
            //if (cells.mine.remove(this.id) && cells.mine.length === 0) showESCOverlay();
            this.destroyed = true;
            this.dead = syncUpdStamp;
            if (killerId && !this.diedBy) {
                this.diedBy = killerId;
                this.updated = syncUpdStamp;
            }
        }
        render() {
            this.graphics.clear();
            this.graphics.beginFill(this.hex); // Blue
            this.graphics.drawCircle(this.dx, this.dy, this.r); // drawCircle(x, y, radius)
            this.graphics.endFill();
            /* push();
             translate(this.dx, this.dy);
             noStroke();
             fill(this.hex);
             circle(0, 0, this.r * 2);
             noFill();
             stroke("#000000");
             strokeWeight(10);
             document.getElementById("P5Canvas").getContext("2d").globalAlpha = 0.1;
             circle(0, 0, this.r * 2);
             document.getElementById("P5Canvas").getContext("2d").globalAlpha = 1;
             pop();*/
        }
        remove() {
            const index = core.entities.findIndex(index => index.id == this.id);
            if (core.entities.findIndex(index => index.id == this.id) > -1) {
                //continue;
                let index = core.entities.findIndex(index => index.id == this.id);
                playerCells.removeChild(core.entities[index].graphics);
                // core.entities[index].destroy(killer);
                core.entities.splice(core.entities.findIndex(index => index.id == this.id), 1);
                // }, 30);
            }
            if (core.players.findIndex(index => index.id == this.id) > -1) {
                let index = core.players.findIndex(index => index.id == this.id);
                //console.log(core.entities[index]);
                // core.players[index].graphics.clear();
                // removePlayerSmooth(core, index, id, 1000);
                // core.players[index].destroy(killer);
                playerCells.removeChild(core.players[index].graphics);
                core.players.splice(core.players.findIndex(index => index.id == this.id), 1);
                // core.players[index].graphics.alpha = 0.1;
            }
        }
        update() {
            /*this.dx = lerp(this.dx, this.x, 0.1);
            this.dy = lerp(this.dy, this.y, 0.1);*/
            let diedBy = core.entities[core.entities.findIndex(index => index.id == this.diedBy)];
            if (this.destroyed && Date.now() > this.dead + 5000) {
                this.toremove = true;
            } else if (this.diedBy && (diedBy)) {
                this.x = diedBy.x
                this.y = diedBy.y
                this.r = ~~(this.r * 0.9);
                this.graphics.alpha -= 0.05;
            }
            if (!this.diedBy) {
                this.dx = lerp(this.dx, this.x, 0.2);
                this.dy = lerp(this.dy, this.y, 0.2);
            } else {
                this.dx = lerp(this.dx, this.x, 0.1);
                this.dy = lerp(this.dy, this.y, 0.05);
            }
            this.dr = lerp(this.dr, this.r, 0.05);
        }
    }

    class Pellet {
        constructor(id, x, y, r, hex) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.r = r;
            this.hex = hex;
            this.graphics = new PIXI.Graphics();
            this.graphics.id = this.id;
            this.graphics.type = 'Pellet';
            this.graphics.beginFill(this.hex); // Blue
            this.graphics.drawCircle(this.x, this.y, this.r); // drawCircle(x, y, radius)
            this.graphics.endFill();
            this.born = syncUpdStamp;
            this.points = [];
            this.pointsVel = [];
            this.destroyed = false;
            this.diedBy = 0;
            this.toremove = false;
            this.dead = null;
            playerCells.addChild(this.graphics);
        }
        destroy(killerId) {
            // core.entities.remove(this.id);
            //if (cells.mine.remove(this.id) && cells.mine.length === 0) showESCOverlay();
            this.destroyed = true;
            this.dead = syncUpdStamp;
            if (killerId && !this.diedBy) {
                this.diedBy = killerId;
                this.updated = syncUpdStamp;
            }
        }
        remove() {
            const index = core.entities.findIndex(index => index.id == this.id);
            if (core.entities.findIndex(index => index.id == this.id) > -1) {
                //continue;
                let index = core.entities.findIndex(index => index.id == this.id);
                playerCells.removeChild(core.entities[index].graphics);
                // core.entities[index].destroy(killer);
                core.entities.splice(core.entities.findIndex(index => index.id == this.id), 1);
                // }, 30);
            }
            if (core.players.findIndex(index => index.id == this.id) > -1) {
                let index = core.players.findIndex(index => index.id == this.id);
                //console.log(core.entities[index]);
                // core.players[index].graphics.clear();
                // removePlayerSmooth(core, index, id, 1000);
                // core.players[index].destroy(killer);
                playerCells.removeChild(core.players[index].graphics);
                core.players.splice(core.players.findIndex(index => index.id == this.id), 1);
                // core.players[index].graphics.alpha = 0.1;
            }
        }
        render() {
            /* this.graphics.clear();
             this.graphics.beginFill(this.hex); // Blue
             this.graphics.drawCircle(this.x, this.y, this.r); // drawCircle(x, y, radius)
             this.graphics.endFill();*/
        }
        update() {
            let diedBy = core.entities[core.entities.findIndex(index => index.id == this.diedBy)];
            if (this.destroyed && Date.now() > this.dead + 5000) {
                this.toremove = true;
            } else if (this.diedBy && (diedBy)) {
                this.x = diedBy.x
                this.y = diedBy.y
                this.r = ~~(this.r * 0.9);
                this.graphics.alpha -= 0.05;
            }
            if (!this.diedBy) {
                this.dx = lerp(this.dx, this.x, 0.2);
                this.dy = lerp(this.dy, this.y, 0.2);
            } else {
                this.dx = lerp(this.dx, this.x, 0.1);
                this.dy = lerp(this.dy, this.y, 0.05);
            }
            this.dr = lerp(this.dr, this.r, 0.05);
        }
    }

    core.drawGrid = () => {
        grid.clear();
        /*stage.position.x = window.innerWidth / 2;
                stage.position.y = window.innerHeight / 2;
                stage.scale.x = cameraLScale;
                stage.scale.y = cameraLScale;
                stage.pivot.x = cameraLX;
                stage.pivot.y = cameraLY;*/
        // grid.scale.x = cameraLScale;
        // grid.scale.y = cameraLScale;
        //grid.pivot.x = core.border.left;
        //grid.pivot.y = core.border.top;

        //grid.drawRect(0, 0, renderer.width, renderer.height);
        grid.lineStyle(1, 0xffffff)

        var a = renderer.width / cameraLScale,
            b = renderer.height / cameraLScale;
        for (var c = -.5 + (-cameraLX + a / 2) % 50; c < a; c += 50) {
            grid.moveTo(c, 0);
            grid.lineTo(c, b);
        }

        for (c = -.5 + (-cameraLY + b / 2) % 50; c < b; c += 50) {
            grid.moveTo(0, c);
            grid.lineTo(a, c);
        }

    }
    core.clearPixi = () => {

    }

    function darkenHex(num) {
        num >>>= 0;
        var b = num & 0xFF,
            g = (num & 0xFF00) >>> 8,
            r = (num & 0xFF0000) >>> 16,
            a = ((num & 0xFF000000) >>> 24) / 255;
        return parseInt("0x" + (((1 << 24) + (~~(((r * .9) * a) / 255) << 16) + ~~(((g * .9) * a) / 255) << 8) + ~~(((b * .9) * a) / 255)).toString(16).slice(1));
    }

    function mouseWheel(event) {
        if (Number(event.deltaY) > 0) {
            cameraScale -= cameraScale / 20;
        } else {
            cameraScale += cameraScale / 10;
        }
    }
    document.addEventListener('wheel', mouseWheel);
    document.addEventListener('keydown', keyDown);

    function keyDown(e) {
        switch (e.keyCode) {
            case 32:
                //core.WsSend(new Uint8Array([0x29]));
                core.WsSend(new Uint8Array([0x11]));

                break;
            case 87:
                core.WsSend(new Uint8Array([21]));
                break;
            case 69:
                core.WsSend(new Uint8Array([22]));
                break;
            case 82:
                core.WsSend(new Uint8Array([23]));
                break;
            case 65:
                core.WsSend(new Uint8Array([0x29]));
                setTimeout(function() {
                    core.WsSend(new Uint8Array([0x29]));
                }, 40);
                break;
            case 68:
                core.WsSend(new Uint8Array([0x29]));
                setTimeout(function() {
                    core.WsSend(new Uint8Array([0x29]));
                }, 40);
                setTimeout(function() {
                    core.WsSend(new Uint8Array([0x29]));
                }, 80);
                setTimeout(function() {
                    core.WsSend(new Uint8Array([0x29]));
                }, 120);
                break;
            case 80:
                core.spawn('Luca');
                break;
            default:
                break;
        }
    }

    function removePlayerSmooth(core, index, id, time) {
        lerp(core.players[index].graphics.alpha, 0, time);
        setTimeout(() => {
            playerCells.removeChild(core.players[index].graphics);
            core.players.splice(core.players.findIndex(index => index.id == id), 1);
        }, time);
    }

    function removeEntitySmooth(core, index, id, time) {
        lerp(core.entities[index].graphics.alpha, 0, time);
        setTimeout(() => {
            playerCells.removeChild(core.entities[index].graphics);
            core.entities.splice(core.entities.findIndex(index => index.id == id), 1);
        }, time);
    }

    // function windowResized() {
    //     resizeCanvas(windowWidth, windowHeight);
    // }

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    let HEX;
    HEX = (R, G, B) => `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
    let rgb2hex;
    rgb2hex = (rgb) => {
        return ((rgb[0] * 255 << 16) + (rgb[1] * 255 << 8) + rgb[2] * 255);
    }
    var rgbToHex = function(rgb) {
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };
    var fullColorHex = function(r, g, b) {
        var red = rgbToHex(r);
        var green = rgbToHex(g);
        var blue = rgbToHex(b);
        return parseInt("0x" + red + green + blue);
    };

    core.connect = (ip) => {
        core.socket = new WebSocket(ip);
        core.socket.binaryType = "arraybuffer";

        core.socket.onopen = () => {
            /*core.send(Buffer.from([254, 5, 0, 0, 0]));
            core.send(Buffer.from([255, 0, 0, 0, 0]));
            console.log(`opened`);*/
            console.log('opened');
            core.WsSend(new Uint8Array([254, 6, 0, 0, 0]));
            var data = new DataView(new ArrayBuffer(5));
            data.setUint8(0, 255, true);
            data.setInt32(1, 0, true);
            console.log(data);
            core.WsSend(data);
        };

        core.WsSend = (data, d) => {
            //console.log(core.socket.readyState);
            if (core.socket.readyState == 1) {
                if (data.build) core.socket.send(data.build());
                else core.socket.send(data.buffer);
            }



        }

        core.socket.onmessage = (data) => {
            syncUpdStamp = Date.now();
            var buffer = new Reader(new DataView(data.data), 0, true);
            var packetID = buffer.getUint8();
            /* if (packetID == 116) {

                 var buf2 = SnappyJS.uncompress(data.data.slice(1));

                 buffer = new Reader(new DataView(buf2), 0, true);
                 packetID = buffer.getUint8();

            }*/
            // console.log(packetID);
            switch (packetID) {
                case 16:
                    /*const eLength = buffer.getUint16();
                    buffer.skipBytes(eLength * 8);*/
                    const myCount = buffer.getUint16();
                    for (var i = 0; i < myCount; i++) {
                        var killer = buffer.getUint32();
                        var id = buffer.getUint32();
                        //continue;
                        if (core.entities.findIndex(index => index.id == id) > -1) {
                            //continue;
                            let index = core.entities.findIndex(index => index.id == id);
                            // console.log(core.entities.findIndex(index => index.id == id));

                            // core.entities[index].graphics.clear();

                            //core.entities.findIndex(index => index.id == id).graphics.alpha = 0.1;
                            // removeEntitySmooth(core, index, id, 1000);
                            //core.entities[index].size = 20;
                            //core.entities[index].graphics.alpha = 1.0 / lerp(10, 2, 10);
                            //console(core.entities[index].graphics.alpha);
                            // setTimeout(() => {
                            //playerCells//[index].destroy(killer);
                            // playerCells.removeChild(core.entities[index].graphics);
                            core.entities[index].destroy(killer);
                            // core.entities.splice(core.entities.findIndex(index => index.id == id), 1);
                            // }, 30);
                        }
                        if (core.players.findIndex(index => index.id == id) > -1) {
                            let index = core.players.findIndex(index => index.id == id);
                            //console.log(core.entities[index]);
                            // core.players[index].graphics.clear();
                            // removePlayerSmooth(core, index, id, 1000);
                            core.players[index].destroy(killer);
                            // removeChild(core.players[index].graphics);
                            // core.players.splice(core.players.findIndex(index => index.id == id), 1);
                            // core.players[index].graphics.alpha = 0.1;
                        }
                    }

                    while (true) {
                        const id = buffer.getUint32();

                        if (id === 0) break;
                        let cell;
                        const x = buffer.getInt32();
                        const y = buffer.getInt32();
                        const size = buffer.getUint16();
                        const flags = buffer.getUint8();


                        const haveColor = !!(flags & 0x02);
                        const haveSkin = !!(flags & 0x04);
                        const haveNick = !!(flags & 0x08);

                        const r = haveColor ? buffer.getUint8() : 0;
                        const g = haveColor ? buffer.getUint8() : 0;
                        const b = haveColor ? buffer.getUint8() : 0;
                        const skin = haveSkin ? buffer.getStringUTF8() : null;
                        const nick = haveNick ? buffer.getStringUTF8() : null;


                        if (core.entities.findIndex(index => index.id == id) < 0) {
                            if (flags & 0x01) {
                                cell = new Virus(id, x, y, size, [r, g, b]);
                            }
                        }

                        /*  if (flags & 2) {
                            buffer.getUint32();
                          }*/

                        if (core.entities.findIndex(index => index.id == id) < 0) {
                            if (flags & 0x20) {
                                cell = new Ejected(id, x, y, size, fullColorHex(r, g, b));
                            }

                            if (size < 20) {
                                cell = new Pellet(id, x, y, size, fullColorHex(r, g, b));
                            }
                        } else {
                            cell = core.entities[core.entities.findIndex(index => index.id == id)];
                            cell.x = x;
                            cell.y = y;
                            cell.r = size;
                            //console.log(cell);
                            //cell.update();
                        }
                        //if (flags & 4) {

                        //}



                        if (!cell) {
                            cell = new Cell(id, nick || "", x, y, size, fullColorHex(r, g, b));
                        }

                        cell.id = id;

                        if (core.entities.findIndex(index => index.id == id) < 0) {
                            core.entities.push(cell);
                        }

                        if (core.players.findIndex(index => index.id == id) > -1) {
                            let index = core.players.findIndex(index => index.id == id);
                            //core.getViewPort();
                            core.players[index].nick = cell.nick;
                            core.players[index].x = cell.x;
                            core.players[index].y = cell.y;
                            core.players[index].r = cell.size;
                            // core.players[index].graphics.r = cell.size;
                            // core.players[index].graphics.dr = cell.size;
                            core.players[index].hex = fullColorHex(r, g, b);
                            core.getViewPort();
                        }
                    }

                    const dLength = buffer.getUint16();

                    for (let i = 0; i < dLength; i++) {
                        const id = buffer.getUint32();
                        if (core.entities.findIndex(index => index.id == id) > -1) {
                            let index = core.entities.findIndex(index => index.id == id);
                            //console.log(core.entities[index]);
                            //core.entities[index].graphics.clear();
                            core.entities[index].destroy();
                            // playerCells.removeChild(core.entities[index].graphics);
                            // core.entities.splice(core.entities.findIndex(index => index.id == id), 1);

                            //removeEntitySmooth(core, index, id, 1000);
                        }

                        if (core.players.findIndex(index => index.id == id) > -1) {
                            let index = core.players.findIndex(index => index.id == id);
                            core.players[index].destroy();

                            //console.log(core.entities[index]);
                            //core.players[index].graphics.clear();
                            // playerCells.removeChild(core.players[index].graphics);
                            // core.players.splice(core.players.findIndex(index => index.id == id), 1);

                            //removePlayerSmooth(core, index, id, 1000);

                        }


                        if (core.players.length === 0 && !core.spectate) {
                            core.spawned = false;
                        }
                    }
                    break;
                case 17:
                    core.spectate = true;
                    cameraX = buffer.getFloat32();
                    cameraY = buffer.getFloat32();
                    /*if(autozoom) //needs to be added later in bublex
                    cameraScale = buffer.getFloat32();*/
                    break;
                case 18:
                    console.log('clear all cells');
                    for (var i in core.entities) {
                        //core.entities[i].graphics.clear();
                        playerCells.removeChild(core.entities[i].graphics);
                    }
                    for (var i in core.players) {
                        // core.players[i].graphics.clear();
                        playerCells.removeChild(core.players[i].graphics);
                    }
                    core.players = [];
                    core.cell = [];


                    break;
                case 20:
                    console.log('clear all cells');
                    for (var i in core.entities) {
                        //core.entities[i].graphics.clear();
                        playerCells.removeChild(core.entities[i].graphics);
                    }
                    for (var i in core.players) {
                        // core.players[i].graphics.clear();
                        playerCells.removeChild(core.players[i].graphics);
                    }
                    core.players = [];
                    core.cell = [];


                    break;
                case 32:
                    core.spawned = true;
                    core.spectate = false;
                    core.players.push(new Cell(buffer.getUint32()));
                    break;
                case 49:
                    const count = buffer.getUint32();
                    core.scoreboard = [];

                    for (let i = 0; i < count; i++) {
                        const id = buffer.getUint32();
                        let nick = "";

                        /* while (true) {
                             var char = buffer.getUint16();
                             if (char === 0) break
                             nick += String.fromCharCode(char);
                         }

                         core.scoreboard.push({
                             id,
                             nick
                         });*/
                    }
                    break;
                case 50:
                    //Team Mode myPie
                    break;
                case 64:
                    const minX = buffer.getFloat64();
                    const minY = buffer.getFloat64();
                    const maxX = buffer.getFloat64();
                    const maxY = buffer.getFloat64();

                    if (core.players.length === 0) {
                        cameraX = (maxX + minX) * 0.5;
                        cameraY = (maxY + minY) * 0.5;
                    }

                    core.border.left = minX;
                    core.border.top = minY;
                    core.border.right = maxX;
                    core.border.bottom = maxY;
                    break;

                case 83:
                    //minimap
                    break;

                case 99:
                    //Chat message

                    break;

                /*case 112:
                    //Protection key1
                    if (!sha1) {
                        console.log("Sha1 didn't load");
                        return;
                    }

                    var keyText = sha1(buffer.getStringUTF8());
                    var a = new DataView(new ArrayBuffer(keyText.length + 2));
                    a.setUint8(0, 113);
                    var ab = 1;

                    for (var i = 0; i < keyText.length; i++) {
                        a.setUint8(ab, keyText.charCodeAt(i));
                        ab++;
                    }
                    a.setUint8(ab++, 0);

                    core.WsSend(a);
                    break;*/
                /* case 114:

                     core.WebK = buffer.getInt32();

                     break;*/
                /* case 200:

                     core.StartWebK = true;
                     window.canSendMouse = true;

                     if (window.mouseInterval != null && window.mouseInterval != undefined) clearInterval(window.mouseInterval);

                     window.mouseInterval = setInterval(function() {
                         // Mouse update
                         if (window.canSendMouse == false) {


                             if (window.mouseInterval != null) {
                                 clearInterval(window.mouseInterval);
                                 window.mouseInterval = null;
                             };

                         } else {

                             core.sendMouseMove((mouseX - innerWidth * 0.5) / cameraScale + cameraX, (mouseY - innerHeight * 0.5) / cameraScale + cameraY);

                         };

                     }, 40);

                     break;*/
                default:
                    console.log("weird packed: " + packetID);
                    break;
            }
        };

        core.socket.onerror = () => {};

        core.socket.onclose = (e) => {
            console.log(e);
            core.cleanUp();
        };
    };
    core.cleanUp = () => {
        //window.canSendMouse = false;
        //window.mouseInterval = null;
        //core.WebK = 0;
        //core.StartWebK = false;
    }
    core.spawn = (a) => {
        var writer = new Writer(true);
        writer.setUint8(0x00);
        writer.setStringUTF8(a);
        console.log(writer);
        /*var msg = new DataView(new ArrayBuffer(1 + 2 * a.length))
        msg.setUint8(0, 0);
        for (var i = 0; i < a.length; ++i){
            msg.setUint16(1 + 2 * i, a.charCodeAt(i), true);
            msg._move(1);
        }

        console.log(msg)*/
        core.WsSend(writer);
    };

    core.send = (packet) => {
        if (core.socket && core.socket.readyState === WebSocket.OPEN) {
            core.socket.send(packet);
        }
    };

    core.sendMouseMove = (x, y) => {

        /*var writer = new Writer(true);
        writer.setUint8(16);
        writer.setUint32(x);
        writer.setUint32(y);
        writer._b.push(0, 0, 0, 0);
        core.send(writer);*/

        var msg = new DataView(new ArrayBuffer(21));
        msg.setUint8(0, 16);
        msg.setFloat64(1, x, true);
        msg.setFloat64(9, y, true);
        msg.setUint32(17, 0, true);
        core.send(msg);

    };


    core.getViewPort = () => {
        if (core.players.length) {
            cameraC = 0;
            cameraX = 0;
            cameraY = 0;

            for (const cell in core.players) {
                if (typeof core.players[cell].x != 'undefined' && typeof core.players[cell].y != 'undefined') {
                    cameraX += core.players[cell].x;
                    cameraY += core.players[cell].y;
                    cameraC++;
                }
            }
        }

        cameraX /= cameraC;
        cameraY /= cameraC;
    };

    core.connect("ws://imsolo.pro:2003");
}