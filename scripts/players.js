async function getPlayerData(searchTerm) {
    let player = searchTerm;
    const url = 'https://api-american-football.p.rapidapi.com/players?search=' + player;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '89ca7966e9msh3246a6eee7816d8p153bd4jsn4f2767599b9d',
            'X-RapidAPI-Host': 'api-american-football.p.rapidapi.com'
        }
    };
    
    try {
        const result = await fetch(url, options);
        const playerInfo = (await result.json()).response[0];
    
        let info = [];
        info.push("Name: " + playerInfo.name);
        info.push("Age: " + playerInfo.age);
        info.push("Height/Weight: " + playerInfo.height + "/" + playerInfo.weight);
        info.push("Position: " + playerInfo.position);
        info.push("Number: " + playerInfo.number);

        
        let div = document.getElementById("player-info");
        div.innerHTML = "";
        
        for (let i = 0; i < info.length; i++) {
            let p = document.createElement("p");
            p.textContent = info[i];
            div.appendChild(p);
        }
        
        let img = document.getElementById("img")
        img.src = playerInfo.image;
        img.alt = info[0] + "Image";
    
        let recents = localStorage.getItem("recentPlayers");
        recents = JSON.parse(recents);
        if (!recents) {
            recents = [];
        }
        recents.push(playerInfo.name);
        localStorage.setItem("recentPlayers", JSON.stringify(recents));
    
        document.getElementById("favorite-button").addEventListener("click", () => {
            let favorites = localStorage.getItem("favoritePlayers");
            favorites = JSON.parse(favorites);
            if (!favorites) {
                favorites = [];
            }
            favorites.push(playerInfo.name);
            localStorage.setItem("favoritePlayers", JSON.stringify(favorites));
        });

        return playerInfo.id;
    } catch (error) {
        console.error(error);
    }
}

async function getPlayerStats(id, position) {
    const url = 'https://api-american-football.p.rapidapi.com/players/statistics?season=2023&id=' + id;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '89ca7966e9msh3246a6eee7816d8p153bd4jsn4f2767599b9d',
            'X-RapidAPI-Host': 'api-american-football.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const playerInfo = (await response.json()).response[0];
        const team = playerInfo.teams[0].team.name;
        let stats = playerInfo.teams[0].groups[0].statistics;

        let info = [];
        info.push("Team: " + team);
        switch (position) {
            case "qb":
                info.push("Passing Yards: " + stats[3].value);
                info.push("Yards/Attempt: " + stats[4].value);
                info.push("Yards/Game: " + stats[5].value);
                info.push("Longest Pass: " + stats[6].value);
                info.push("Completion %: " + stats[2].value);
                info.push("Pass Touchdowns: " + stats[7].value);
                info.push("Interceptions: " + stats[9].value);
                info.push("Quarterback Rating: " + stats[13].value);
                break;
            
            case "rb":
                info.push("Rushing Yards: " + stats[1].value);
                info.push("Yards/Attempt: " + stats[2].value);
                info.push("Yards/Game: " + stats[6].value);
                info.push("Longest Rush: " + stats[3].value);
                info.push("Rushing Touchdowns: " + stats[5].value);
                info.push("Fumbles: " + stats[7].value);
                info.push("Fumbles Lost: " + stats[8].value);
                break;
            case "wr":
                info.push("Receiving Yards: " + stats[2].value);
                info.push("Receptions: " + stats[0].value);
                info.push("Yards/Reception: " + stats[3].value);
                info.push("Yards/Game: " + stats[7].value);
                info.push("Longest Reception: " + stats[5].value);
                info.push("Receptions Over 20 Yards: " + stats[6].value);
                info.push("Receiving Touchdowns: " + stats[4].value);
                break;
            case "k":
                stats = playerInfo.teams[0].groups[2].statistics;
                info.push("Field Goals Made: " + stats[0].value);
                info.push("Field Goals Attempted: " + stats[1].value);
                info.push("Field Goal Percentage: " + stats[2].value);
                info.push("Longest Field Goal: " + stats[3].value);
                info.push("Extra Points Made: " + stats[9].value);
                info.push("Extra Points Attempted: " + stats[10].value);
                info.push("Extra Point Percentage: " + stats[11].value);
                break;
            
            case "p":
                stats = playerInfo.teams[0].groups[1].statistics;

                info.push("Punts: " + stats[0].value);
                info.push("Total Punt Yards: " + stats[1].value);
                info.push("Net Average: " + stats[4].value);
                info.push("Blocked Punts: " + stats[5].value);
                info.push("Punts Inside 20: " + stats[6].value);
                info.push("Touchbacks: " + stats[7].value);
                break;
            case "def":
                info.push("Solo Tackles: " + stats[0].value);
                info.push("Total Tackles: " + stats[2].value);
                info.push("Sacks: " + stats[3].value);
                info.push("Tackles for Loss: " + stats[5].value);
                info.push("Passes Defended: " + stats[6].value);
                info.push("Interceptions: " + stats[7].value);
                info.push("Interception Touchdowns: " + stats[10].value);
                info.push("Forced Fumbles: " + stats[11].value);
                info.push("Fumble Recoveries: " + stats[12].value);
                info.push("Fumbles Recovered for Touchdowns: " + stats[13].value);
                info.push("Blocked Kicks: " + stats[14].value);
                break;
            case "ret":

                break;
            default:
                info.push("No stats found");
        }

        let div = document.querySelector(".stats");
        div.innerHTML = "";

        for (let i = 0; i < info.length; i++) {
            let p = document.createElement("p");
            p.textContent = info[i];
            div.appendChild(p);
        }
    } catch (error) {
        console.error(error);
    }
}

window.onload = ("load", async () => {
    const currentURLSearch = window.location.search;
    const decoded = new URLSearchParams(currentURLSearch);
    if (decoded.has("search") && decoded.has("position")) {
        const items = decoded.getAll("search");
        const position = decoded.getAll("position");
        sessionStorage.setItem("q", JSON.stringify(items));
        sessionStorage.setItem("position", JSON.stringify(position));
        const q = sessionStorage.getItem("q");
        const p = sessionStorage.getItem("position");
        const urlSPObj = new URLSearchParams();
        urlSPObj.append("search", q);
        urlSPObj.append("postion", p);
        let id = await getPlayerData(JSON.parse(q)[0]);
        console.log(id);
        getPlayerStats(id, JSON.parse(p)[0]);
    }
});