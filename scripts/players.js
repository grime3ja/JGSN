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
        const stats = playerInfo.teams[0];

        let info = [];
        info.push("Team: " + stats.team.name);
        for (let stat of stats) {
            console.log(stat);
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
        // let id = await getPlayerData(JSON.parse(q)[0]);
        // console.log(id);
        // getPlayerStats(id, p);
    }
});