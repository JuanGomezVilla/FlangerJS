let Utils = {
    createRandomEnemy: function(){
        enemies.push(new Enemy(
            FJSutils.randomNumber(0, FJSscreen.width - settings.enemies.width),
            -settings.enemies.height
        ));
    },
    resetSinglePlayer: function(){
        settings.singlePlayer.finish = false;
        enemies = [];
        player.reset();
        this.createRandomEnemy();
    },
    finishSinglePlayerGame: function(){
        singlePlayerScene.pause = true;
        settings.singlePlayer.finish = true;
    }
}

function drawButtonPause(x, y, width, height, color1, color2, color3){
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.rect(x, y, width, height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    FJSutils.fillRect(x+9, y+8, 8, height - 16, color3);
    FJSutils.fillRect(x+23, y+8, 8, height - 16, color3);
}