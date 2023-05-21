/**
 * **Theme**
 * 
 * Class used to define themes. In case you have a large number of
 * buttons, modify these functions and call them when necessary.
 * ANNOTATION: modify this file as you wish
 * @author JuanGV
 * @version 1.0.0
 * @name FJStheme
 * @license MIT
 */
let FJStheme = {
    /**
     * **Draw a button**
     * 
     * Draw a button on the canvas from some data passed as a parameter
     * @param {string} text - Button text
     * @param {number} x - Location on the X axis
     * @param {number} y - Location on the Y axis
     * @param {number} width - Width in pixels
     * @param {number} height - Height in pixels
     * @param {string} color - Item color
     * @returns {void}
     * @function
     * @public
     */
    drawButton: function(text, x, y, width, height, color){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.rect(x, y, width, height);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.font = "bold italic 20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, x + width/2, y + height/2);
    },
    /**
     * **Draw a checkbox**
     * 
     * Draw a checkbox on the canvas from some data passed as a parameter
     * @param {number} x - Location on the X axis
     * @param {number} y - Location on the Y axis
     * @param {number} width - Width in pixels
     * @param {number} height - Height in pixels
     * @param {string} color1 - Normal color
     * @param {string} color2 - Color on selected, hover, etc
     * @returns {void}
     * @function
     * @public
     */
    drawCheckbox: function(x, y, width, height, color1, color2){
        ctx.beginPath();
        ctx.strokeStyle = color1;
        ctx.lineWidth = 3;
        ctx.rect(x, y, width, height);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = color2;
        ctx.fillRect(x + 3, y + 3, width - (3*2), height - (3*2));
    },
    /**
     * **Draw a progress bar**
     * 
     * Draw a progress bar on the canvas from some data passed as a parameter
     * @param {number} x - Location on the X axis
     * @param {number} y - Location on the Y axis
     * @param {number} width - Width in pixels
     * @param {number} height - Height in pixels
     * @param {string} color - Normal color
     * @param {number} progress - Progress, value between 0 and 1
     * @returns {void}
     * @function
     * @public
     */
    drawProgress: function(x, y, width, height, color, progress){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.rect(x, y, width, height);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = color;
        ctx.fillRect(x + 3, y + 3, width * (progress/100) - 6, height - 6);
    },
    /**
     * **Draw a radius**
     * 
     * Draw a radius on the canvas from some data passed as a parameter
     * @param {number} x - Location on the X axis
     * @param {number} y - Location on the Y axis
     * @param {number} radius - Radius of the circle
     * @param {string} color - Normal color
     * @returns {void}
     * @function
     * @public
     */
    drawRadius: function(x, y, radius, color){
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
    }
}