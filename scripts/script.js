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

async function searchTeamPressed() {
    let team = document.getElementById("search-bar").value;
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
    } catch (error) {
        console.error(error);
    }
}

function searchPlayerPressed() {
    // placeholder for when the search button is pressed
}

function favoritePressed() {
    // placeholder for when the favorite button is pressed
}

function clearPressed() {
    // placeholder for when the clear button is pressed
}