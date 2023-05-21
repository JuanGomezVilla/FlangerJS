/*
    SCENES

    Write here all the scenes that you are going to use in the game.
    It is recommended that they be written in chronological order,
    or of execution, although it is not mandatory
*/

//LOADING SCENE
let loadingScene = new FJSscene({
    update: function(){
        //Clears the screen and set the background color
        FJSscreen.clear();
        FJSscreen.setBackgroundColor("#3AAFA9");

        //Updates and draw the loading bar
        loadingBar.update();
        loadingBar.draw();
    }
});

//MENU SCENE
let menuScene = new FJSscene({
    onInit: function(){
        //Enable the buttons if they are not enabled
        buttonSinglePlayer.disabled = false;
        buttonMultiPlayer.disabled = false;
    },
    update: function(){
        //Clears the screen and set a background color
        FJSscreen.clear();
        FJSscreen.setBackgroundColor("#3AAFA9");

        //Updating objects
        buttonSinglePlayer.update();
        buttonMultiPlayer.update();

        //Drawing objects
        buttonMultiPlayer.draw();
        buttonSinglePlayer.draw();
        logoSprite.draw(79, 120, 180, 180);
    }
});

//SINGLE PLAYER SCENE
let singlePlayerScene = new FJSscene({
    pause: false, //Initial state of the screen
    onInit: function(){
        buttonReturnToMenu.disabled = false;
        Utils.resetSinglePlayer();
    },
    update: function(){
        //Clears the screen and set a background color
        FJSscreen.clear();
        FJSscreen.setBackgroundColor("#3AAFA9");
        
        //Update the pause button
        buttonPause.update();

        //If the screen status is not pause
        if(!this.pause){
            //Upgrade all enemies and player
            enemies.forEach(enemy => enemy.update());
            player.update();
        } else {
            buttonReturnToMenu.update();
        }
        
        //Draw the enemies and the player
        enemies.forEach((enemy) => enemy.draw());
        player.draw();

        //If the screen status is paused
        if(this.pause){
            //Draw a dark layer and pause text
            FJSutils.fillRect(0, 0, FJSscreen.width, FJSscreen.height, "rgb(0,0,0,0.5)");
            if(settings.singlePlayer.finish){
                FJSutils.fillText("Fin del juego", 169, 300, "white", "bold italic", 30, "Verdana", "center");
            } else {
                FJSutils.fillText("Pause", 169, 300, "white", "bold italic", 30, "Verdana", "center");
            }

            buttonReturnToMenu.draw();
        }

        //Draw the pause button
        buttonPause.draw();

        //If the first enemy reaches the limit of the screen, it is eliminated
        if(enemies[0].y > FJSscreen.height) enemies.shift();
        //If the last enemy created reaches a limit, another one is created
        if(enemies[enemies.length - 1].y > 300) Utils.createRandomEnemy();

        console.log("Actualizando singleplayer");
    }
});


//Menu scene
let multiPlayerScene = new FJSscene({
    onInit: function(){
        player1 = new Player({
            id:1, x:144, y:50, width:50, height:50,
            keyLeft:"a", keyRight:"d", keyShoot:" ",
            speed:3, speedBullet:3, speedReloading:0.5, bullets:100,
            draw: function(){
                FJSutils.fillRect(0, 0, (this.currentBullets/this.bullets) * 338, 10, "yellow");
            },
            update: function(){
                for(let i=0; i<player2.bulletsLaunched.length; i++){
                    if(player2.bulletsLaunched[i].y <= 0){
                        player2.bulletsLaunched.splice(i, 1);
                        break;
                    }

                    if(this.crashWith(player2.bulletsLaunched[i])){
                        player2.bulletsLaunched.splice(i, 1);
                        this.life--;
                        break;
                    }
                    
                }
            }
        });
        player2 = new Player({
            id:2, x:144, y:500, width:50, height:50,
            keyLeft:"ArrowLeft", keyRight:"ArrowRight", keyShoot:"l",
            speed:3, speedBullet:-3, speedReloading:0.5, bullets:100,
            draw: function(){
                FJSutils.fillRect(0, 600-10, (this.currentBullets/this.bullets) * 338, 10, "yellow");
            },
            update: function(){
                for(let i=0; i<player1.bulletsLaunched.length; i++){
                    if(player1.bulletsLaunched[i].y >= 600){
                        player1.bulletsLaunched.splice(i, 1);
                        break;
                    }

                    if(this.crashWith(player1.bulletsLaunched[i])){
                        player1.bulletsLaunched.splice(i, 1);
                        this.life--;
                        break;
                    }
                    
                }
            }
        });
    },
    update: function(){
        //Clears the screen and set a background color
        FJSscreen.clear();
        FJSscreen.setBackgroundColor("#3aafa9");

        player1.update();
        player2.update();
        
        player1.draw();
        player2.draw();

        console.log("ESCENA multiplayer");
    }
});






