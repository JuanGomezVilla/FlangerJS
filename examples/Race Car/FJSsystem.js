let FJSsystem = {
    init: function(data){
        document.body.style.backgroundColor = data.backgroundColor;
        document.body.style.margin = 0;

        //Cambia el título si el usuario especifica un valor
        if(data.title) document.title = data.title;
    },
    getTitle: function(){
        return document.title;
    }
}