//Players
let player1, player2;

//Elements loaded
let loaded = 0;
function checkLoad(){
    loaded++;
    if(loaded == 3) loadingScene.init();
}

let keyFinishPress = {
    Escape: true,
    gamepadB: true
};

//TILES
let logoSprite = new FJStile({src:"assets/logo.png", auto:false, onLoad:checkLoad});
let directionsTile = new FJStile({src:"assets/directions.png", auto:false, onLoad:checkLoad});
let tilesetCars = new FJStilesetRotation({
    src: "assets/cars.png",
    auto: false,
    tiles: {
        policeCar: {x:130, y:16, w:48, h:93},
        blackCar: {x:67, y:17, w:47, h:91},
        taxi: {x:65, y:120, w:51, h:99},
        furgon: {x:124, y:226, w:55, h:103},
        deportivo: {x:122, y:346, w:45, h:86}
    },
    onLoad: checkLoad
});

//BUTTONS
let buttonPause = new FJSbutton({
    x: 8, y:8, width: 40, height:40, cursorPointer: true,
    draw: function(){
        drawButtonPause(this.x, this.y, this.width, this.height, "white", "black", "white");
    },
    onHover: function(){
        drawButtonPause(this.x, this.y, this.width, this.height, "white", "white", "black");
    },
    onClick: function(){
        if(settings.singlePlayer.finish) Utils.resetSinglePlayer();
        else singlePlayerScene.togglePause();
    }
});

let buttonReturnToMenu = new FJSbutton({
    x:338/2-90, y:350, width:180, height:40, cursorPointer:true,
    draw: function(){FJStheme.drawButton("Return to menu", this.x, this.y, this.width, this.height, "white")},
    onHover: function(){FJStheme.drawButton("Return to menu", this.x, this.y, this.width, this.height, "black")},
    onClick: function(){
        this.disabled = true;
        FJSscreen.fade.init(255, 255, 255, function(){
            FJSscreen.finishCurrentScene();
            menuScene.init();
        });
    }
});

let buttonSinglePlayer = new FJSbutton({
    x:338/2-90, y:350, width:180, height:40, cursorPointer:true,
    draw: function(){FJStheme.drawButton("Single player", this.x, this.y, this.width, this.height, "white")},
    onHover: function(){FJStheme.drawButton("Single player", this.x, this.y, this.width, this.height, "black")},
    onClick: function(){
        this.disabled = true;
        buttonMultiPlayer.disabled = true;
        FJSscreen.fade.init(255, 255, 255, function(){
            menuScene.finish();
            singlePlayerScene.init();
        });
    }
});

let buttonMultiPlayer = new FJSbutton({
    x:338/2-90, y:420, width:180, height:40, cursorPointer:true,
    draw: function(){FJStheme.drawButton("Multiplayer", this.x, this.y, this.width, this.height, "white")},
    onHover: function(){FJStheme.drawButton("Multiplayer", this.x, this.y, this.width, this.height, "black")},
    onClick: function(){
        
    }
});

//LOADING BARS
let loadingBar = new FJSprogress({
    x: 338/2-220/2, y:600/2-20/2, width: 220, height: 20, speed: 0.5,
    draw: function(progress){
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.lineWidth = 3;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fillRect(this.x + 3, this.y + 3, this.width * (progress/100) - 6, this.height - 6);
    },
    onFinish: function(){
        FJSscreen.fade.init(255, 255, 255, function(){
            loadingScene.finish();
            menuScene.init();
        });
    }
});