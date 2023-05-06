let FJSperformance = {
    method1: {
        counting: false,
        frames: 0,
        update: function(){
            if(!this.counting){
                this.counting = true;
                setTimeout(() => {
                    console.log(this.frames);
                    this.counting = false;
                    this.frames = 0;
                }, 1000);
            }
            this.frames++;
        }
    }
}