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
    let searchText = document.getElementById('search-bar');
    location.href = "./search-player.html?search=" + searchText.value;
    sessionStorage.setItem("q", searchText.value);
    const q = sessionStorage.getItem("q");
    const urlSPObj = new URLSearchParams();
    urlSPObj.append("search", q);
}

function clearPressed() {
    // placeholder for when the clear button is pressed
}