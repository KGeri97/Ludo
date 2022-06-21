var game = {
    "ludo": {
        "board": "",
        "players": [],
    }
}

// Menu
// Navigates the menu
function menu(section){
    var sections = ["chooseGame","ludoSettings"];

    for (let i in sections){
        if (sections[i] == section){
            document.getElementById(sections[i]).style.display = "block";
        } else {
            document.getElementById(sections[i]).style.display = "none";
        }
    }
}

// Menu
// Tells which game was chosen
function setGame(chosenGame){
    game[chosenGame] = {};
    menu(chosenGame + "Settings");
}

// Menu
// Creates the settings for the [game].js and starts the game
function setSettings(){
    let key = Object.keys(game)[0];

    switch (key){

        case "ludo":
            let colors = ["red","blue","yellow","green"];
            game.ludo.board = document.getElementById("board").value;
            game.ludo.players = new Array;

            for (let i = 1; i < 5; i++){
                let player = {}
                player.color = colors[i-1];
                player.name = document.getElementById("playerName" + i).value;
                player.ai = document.getElementById("playerAI" + i).value;
                game.ludo.players.push(player);
            }

            // I store the settings here so after the redirect it can be retrieved
            localStorage.setItem("gameSettings", JSON.stringify(game.ludo));
            // And here I redirect to a different page. Initially this was meant so that different games can be kept separated and easier to work with. In the end this was the only game that was made
            window.location.href = "ludo.html"
            // console.log(game)
        break;
    }
}