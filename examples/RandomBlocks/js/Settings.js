let settings = {
    enemies: {
        width: 50,
        height: 50,
        color: "#000000",
        speed: 5
    },
    singlePlayer: {
        points: 0,
        record: localStorage.getItem("singlePlayerRecord") ?? 0,
        finish: false
    }
};

let enemies = [];