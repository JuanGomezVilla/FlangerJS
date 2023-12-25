/**
 * **Audio**
 * 
 * Class to handle an audio file. Only one audio will be imported, that
 * will be used during the development of the game. It is important clarify
 * that this class facilitates the use of the {@link Audio} object. Is say,
 * it is not a strictly necessary class, but it does make the job easier
 * @author JuanGV
 * @version 1.0.0
 * @name FJSaudio
 * @license MIT
 */
class FJSaudio {
    /**
     * Audio, original object
     * @private
     */
    #audio;

    /**
     * **Constructor**
     * 
     * Load the audio automatically, you can load only the route or
     * pass a dictionary with data and events. If you lack experience,
     * it is recommended to only pass the file path.
     * @param {*} data - The audio file path or a dictionary with events, etc
     * @constructor
     */
    constructor(data){
        //Create the audio object and a temporary variable for the file path
        this.#audio = new Audio();
        let temporalPath;
        //Default empty functions for end of load and end method
        this.onLoad = function(){};
        this.onFinish = function(){};

        //If the data passed is of the dictionary type
        if(typeof data === "object" && data !== null && Object.keys(data).length > 0){
            //Sets the file path and possible new data for the event functions
            temporalPath = data.src;
            this.onLoad = data.onLoad || function(){};
            this.onFinish = data.onFinish || function(){};
        } else {
            //Just set the path of the file
            temporalPath = data;
        }
        //Set the data source, and the methods to play the audio and whether it's done
        this.#audio.src = temporalPath;
        this.#audio.addEventListener("canplay", this.onLoad(), false);
        this.#audio.addEventListener("ended", () => this.onFinish(), false);
    }

    /**
     * **Play audio**
     * 
     * Plays the audio. The audio will not be heard if the user does not
     * previously interact with the screen
     * @returns {void}
     * @throws {Error} If there is an error while playing the audio
     * @function
     * @public
     */
    play() {
        //Try block to handle any exceptions that might occur while playing the audio
        try {
            //Attempts to play the audio
            //this.#audio.play();
            this.#audio.cloneNode(true).play();
        //Catch block to handle any exceptions thrown by the try block
        } catch(error) {
            //Logs the error to the console
            console.error("Error while playing audio:", error);
            //Throws a new Error object with a message.
            throw new Error("Error while playing audio");
        }
    }

    /**
     * **Toggle pause**
     * 
     * Toggles between playing and pausing the audio
     * If the audio is paused, it will play it
     * If the audio is playing, it will pause it
     * @returns {void}
     * @function
     * @public
     */
    togglePause(){
        //Verify that the audio has not started because the current time is at 0
        //Use a ternary operator to change the pause state of the audio
        if(this.#audio.currentTime != 0) this.#audio.paused ? this.#audio.play() : this.#audio.pause();
    }

    /**
     * **Stop audio**
     * 
     * Stops the current audio playback and sets the current playback time to 0
     * @returns {void}
     * @function
     * @public
     */
    stop(){
        this.#audio.pause();
        this.#audio.currentTime = 0;
    }

    /**
     * **Replay audio**
     * 
     * Restarts the audio playback from the beginning
     * @returns {void}
     * @function
     * @public
     */
    replay(){
        //Set the current time to 0
        this.#audio.currentTime = 0;
        //Play the audio
        this.#audio.play();
    }

    /**
     * **Change audio**
     * 
     * Method to load a new audio passing its path
     * @returns {void}
     * @param {string} src - The new audio file path
     * @functions
     * @public
     */
    changeAudio(src){
        //Stops the current audio
        this.stop();
        //Changes the audio source to a new path
        this.#audio.src = src;
        //Loads the new audio
        this.#audio.load();
        //Starts playback
        this.play();
    }

    /**
     * **Get original object**
     * 
     * Returns the original object audio
     * @returns {object} Original object audio
     * @function
     * @public
     */
    getObject(){
        //Returns the private audio
        return this.#audio;
    }
    
    /**
     * **Pause status**
     * 
     * Getter method that returns the value of the paused attribute of the audio object
     * @returns {boolean} The current value of the "paused" attribute
     * @public
     */
    get paused(){
        //Gets the audio and returns the pause state
        return this.#audio.paused;
    }

    /**
     * **Duration**
     * 
     * Returns the duration of the audio element
     * @returns {number} The duration of the audio in seconds
     * @property {number} duration
     * @public
     */
    get duration(){
        //Gets the audio and returns the duration of the original object
        return this.#audio.duration;
    }

    /**
     * **Volume**
     * 
     * Returns the volume of the audio element
     * @returns {number} The volume, value between 0 and 1
     * @property {number} volume
     * @public
     */
    get volume(){
        //Gets the audio and returns the volume of the original object
        return this.#audio.volume;
    }

    /**
     * **Volume**
     * 
     * Sets the volume of the audio object
     * @param {number} volume - The volume level to set. A number between 0 and 1
     * @property {number} volume
     * @public
     */
    set volume(volume){
        //Gets the audio and set the volume of the original object
        this.#audio.volume = volume;
    }
    
    /**
     * **Muted status**
     * 
     * Gets the muted state of the audio object
     * @function
     * @returns {boolean} Muted state
     * @property {boolean} muted
     * @public
     */
    get muted(){
        //Gets the audio and returns the muted state of the original object
        return this.#audio.muted;
    }

    /**
     * **Muted status**
     * 
     * Sets the muted state of the audio object
     * @param {boolean} muted - Muted state
     * @property {boolean} muted
     * @public
     */
    set muted(muted){
        //Gets the audio and set the muted state of the original object
        this.#audio.muted = muted;
    }
}