function openPage() {
    let selection = document.getElementById("page").value;

    let pages = {
        "home" : "index.html",
        "searchTeam" : "search-team.html",
        "searchPlayer" : "search-player.html",
        "favorites" : "favorites.html",
        "bet" : "bet.html",
        "aboutMe" : "about-me.html",
    };
    
    let page = pages[selection];
    
    if (page) {
        window.location.href = page;
    }
}

function searchTeamPressed() {
    let searchText = document.getElementById('search-bar');
    location.href = "./search-team.html?search=" + searchText.value;
    sessionStorage.setItem("q", searchText.value);
    const q = sessionStorage.getItem("q");
    const urlSPObj = new URLSearchParams();
    urlSPObj.append("search", q);
}

function searchPlayerPressed() {
    // placeholder for when the search button is pressed
}

async function getTeamData(searchTerm) {
    let team = searchTerm;
    const url = 'https://api-american-football.p.rapidapi.com/teams?search=' + team + '&league=1&season=2023';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '89ca7966e9msh3246a6eee7816d8p153bd4jsn4f2767599b9d',
            'X-RapidAPI-Host': 'api-american-football.p.rapidapi.com'
        }
    };
    
    try {
        const result = await fetch(url, options);
        const teamInfo = (await result.json()).response[0];
    
        let info = [];
        info.push("Team Name: " + teamInfo.name);
        info.push("City: " + teamInfo.city);
        info.push("Established: " + teamInfo.established);
        info.push("Stadium: " + teamInfo.stadium);
        info.push("Owner: " + teamInfo.owner);
        info.push("Coach: " + teamInfo.coach);
        
        let div = document.getElementById("team-info");
        div.innerHTML = "";
        
        for (let i = 0; i < info.length; i++) {
            let p = document.createElement("p");
            p.textContent = info[i];
            div.appendChild(p);
        }
        
        let img = document.getElementById("img")
        img.src = teamInfo.logo;
        img.alt = info[0] + "Logo";
    
        let recents = localStorage.getItem("recentTeams");
        recents = JSON.parse(recents);
        if (!recents) {
            recents = [];
        }
        recents.push(teamInfo.name);
        localStorage.setItem("recentTeams", JSON.stringify(recents));
    
        document.getElementById("favorite-button").addEventListener("click", () => {
            let favoriteTeams = localStorage.getItem("favoriteTeams");
            favoriteTeams = JSON.parse(favoriteTeams);
            if (!favoriteTeams) {
                favoriteTeams = [];
            }
            favoriteTeams.push(teamInfo.name);
            localStorage.setItem("favoriteTeams", JSON.stringify(favoriteTeams));
        });
    } catch (error) {
        console.error(error);
    }
}

function clearPressed() {
    // placeholder for when the clear button is pressed
}

window.onload = ("load", () => {
    const currentURLSearch = window.location.search;
    const decoded = new URLSearchParams(currentURLSearch);
    if (decoded.has("search")) {
        const items = decoded.getAll("search");
        sessionStorage.setItem("q", JSON.stringify(items));
        const q = sessionStorage.getItem("q");
        const urlSPObj = new URLSearchParams();
        urlSPObj.append("search", q);
        getTeamData(JSON.parse(q)[0]);
    }
});