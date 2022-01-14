function makeDrop(image) {
    const drop = document.createElement("div");
    drop.className = "drop";
    
    let cloudRect = document.getElementById("title").getBoundingClientRect();
    let leftMin = cloudRect.width / 10;
    let leftMax = 8 * cloudRect.width / 10


    drop.style.left = cloudRect.left + window.scrollX + leftMin + Math.random() * leftMax + "px";
    drop.style.top = cloudRect.bottom + window.scrollY - cloudRect.height / 2 + "px";
    drop.style.zIndex = -10;
    drop.style.backgroundImage = image;
    drop.style.setProperty("--h", (9.3 * window.innerHeight / 10 - (cloudRect.bottom + window.scrollY - cloudRect.height / 2)) + "px");
    document.getElementById("splashGrid").appendChild(drop);
    drop.style.animation = "drop 4s linear infinite";

    setTimeout(() => {
        drop.remove();
    }, 4000);
}

function animate() {
    let rand = 300 + Math.random() * 500;
    setTimeout(() => {
        let rand = Math.random();
        makeDrop(rand > 0.5 ? "url('images/LastDrop.png')" : "url('images/LasrSnowflake.png')");
        animate();
    }, rand);
}

function updateStats() {
    setTimeout(() => {
        axios.get("/stats")
            .then(res => {
                const stats = res.data;
                document.getElementById("totalGames").innerText = Math.ceil(stats.totalGames);

                let minutes = stats.averagePlaytime / 60;
                minutes = minutes.toString().length == 1 ? "0" + minutes.toString() : minutes.toString();
                let seconds = stats.averagePlaytime % 60;
                seconds = seconds.toString().length == 1 ? "0" + seconds.toString() : seconds.toString();
                document.getElementById("averagePlaytime").innerText = minutes + ":" + seconds;

                document.getElementById("activeRooms").innerText = Math.floor(stats.activeRooms);
                updateStats();
            })
            .catch(err => {
                console.error(err);
            });
    }, 1000)
}

function saveUsername() {
    const username = document.getElementById("usernameInput").value;
    sessionStorage.setItem("playerUsername", username);
}

document.getElementById("usernameInput").value = sessionStorage.getItem("playerUsername") == null 
    ? "" 
    : sessionStorage.getItem("playerUsername");
document.getElementById("playButton").addEventListener("click", saveUsername);
document.getElementById("rulesButton").addEventListener("click", saveUsername);
updateStats();
animate();