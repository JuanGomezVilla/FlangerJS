/**
 * **Sprite**
 * 
 * Class to use with simple sprites, which have some coordinates
 * and a width and height. Can check for collisions, and should
 * be used with objects that extend of the same class
 * @author JuanGV
 * @version 1.0.0
 * @name FJSsprite
 * @license MIT
 */
class FJSsprite {
    /**
     * **Constructor**
     * 
     * Sets the typical parameters of a sprite, such as coordinates
     * and dimensions. Data must be integers
     * @param {number} x - Coordinates on the X axis
     * @param {number} y - Coordinates on the Y axis
     * @param {number} width - Sprite width
     * @param {number} height - Sprite height
     */
    constructor(x, y, width, height){
        this.x = x; //Coordinates on the X axis
        this.y = y; //Coordinates on the Y axis
        this.width = width; //Sprite width
        this.height = height; //Sprite height
    }

    /**
     * **Crash with sprite**
     * 
     * Method to check if a collision has occurred with another
     * sprite. The sprite that is passed by parameter must
     * extend the same class or contain the attributes of
     * coordinates (x, y) and dimensions (width, height)
     * @param {object} sprite - Object to check for collision
     * @returns {boolean} Returns true if a collision occurred, false otherwise
     */
    crashWith(sprite){
        return !(
            (this.y + this.height < sprite.y) ||
            (this.y > sprite.y + sprite.height) ||
            (this.x + this.width < sprite.x) ||
            (this.x > sprite.x + sprite.width)
        );
    }
}