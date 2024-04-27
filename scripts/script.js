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