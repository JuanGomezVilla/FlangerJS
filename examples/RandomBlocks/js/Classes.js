/**
 * Class for a single enemy. When the game progresses
 * Enemy type objects are created. part of the data
 * are bound to the variable configuration
 * @author JuanGV
 * @version 1.0.0
 * @name Enemy
 * @license MIT
 */
class Enemy {
    /**
     * **Constructor**
     * 
     * Enemy creation. The only ones necessary data
     * are the coordinates in the two axes
     * @param {number} x Location on the X axis
     * @param {number} y Location on the Y axis
     * @constructor
     */
    constructor(x, y){
        this.x = x; //Location on the X axis
        this.y = y; //Location on the Y axis
        this.width = settings.enemies.width; //Enemy width, value according to settings
        this.height = settings.enemies.height; //Enemy height, value according to settings
        this.color = settings.enemies.color; //Enemy color, value according to settings
    }

    /**
     * **Update**
     * 
     * Updates the enemy's data, but does not draw it. Advances
     * in the Y axis according to the speed of the enemies
     * @returns {void}
     * @function
     * @public
     */
    update(){
        //Advances in the Y axis according to the general speed of the enemies
        this.y += settings.enemies.speed;
    }

    /**
     * **Draw**
     * 
     * Draw the enemy on the canvas. Use the tools function
     * from the library to render the graph
     * @returns {void}
     * @function
     * @public
     */
    draw(){
        //With the tools of the library draw the object directly
        FJSutils.fillRect(this.x, this.y, this.width, this.height, this.color);
    }
}

class Player {
    #drawMethod;
    #updateMethod;

    constructor(data){
        this.id = data.id;
        this.x = data.x;
        this.y = data.y;
        this.width = data.width;
        this.height = data.height;
        this.keyLeft = data.keyLeft;
        this.keyRight = data.keyRight;
        this.keyShoot = data.keyShoot;
        this.speed = data.speed;
        this.speedBullet = data.speedBullet;
        this.speedReloading = data.speedReloading;
        this.bullets = data.bullets;
        this.currentBullets = this.bullets;
        this.reloading = false;
        this.#drawMethod = data.draw;
        this.#updateMethod = data.update;
        this.bulletsLaunched = [];
        this.life = 100;
    }

    update(){
        if(FJSscreen.keyboard[this.keyLeft] && this.x > 0) this.x -= this.speed;
        if(FJSscreen.keyboard[this.keyRight] && this.x < FJSscreen.width - this.width) this.x += this.speed;
        if(FJSscreen.keyboard[this.keyShoot] && !this.reloading) this.shoot();

        if(this.currentBullets <= 0 || this.reloading){
            this.reloading = true;
            this.currentBullets += this.speedReloading;
            if(this.currentBullets >= this.bullets) this.reloading = false;
        }
        this.bulletsLaunched.forEach(bullet => bullet.update());

        this.#updateMethod();

    }

    shoot(){
        this.currentBullets--;
        this.bulletsLaunched.push(new Bullet(this.x+22, this.y, 5, 10, "yellow", this.speedBullet));
    }

    draw(){
        FJSutils.fillRect(this.x, this.y, this.width, this.height, "#000000");
        FJSutils.fillRect(this.x, this.y-14, this.width, 10, "#000000");
        FJSutils.fillRect(this.x+1, this.y-13, (this.life/100) * (this.width-2), 10-2, "green");
        FJSutils.fillText(this.id, this.x+this.width/2, this.y+this.height/2+3, "white", "bold", 33, "Arial", "center");
        this.#drawMethod();

        this.bulletsLaunched.forEach(bullet => bullet.draw());
    }
    
    crashWith(bullet){
        return !(
            (this.y + this.height < bullet.y) ||
            (this.y > bullet.y + bullet.height) ||
            (this.x + this.width < bullet.x) ||
            (this.x > bullet.x + bullet.width)
        );
    }
    
}

class Bullet {
    constructor(x, y, width, height, color, speed){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
    }

    update(){
        this.y += this.speed;
    }

    draw(){
        FJSutils.fillRect(this.x, this.y, this.width, this.height, this.color);
    }
}