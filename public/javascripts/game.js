const mediaQuery = window.matchMedia('(min-width: 568px)');

mediaQuery.onchange = (e) => checkDeviceResolution(e);

function checkDeviceResolution(e) {
    if(!e.matches) {
        alert("Unfortunately, your device resolution is not optimal...");
    }
}

checkDeviceResolution(mediaQuery);

[...document.getElementsByClassName("column")].forEach((element) => {
    element.addEventListener("click", () => clickColumn(element));
});

[...document.getElementsByClassName("rematch")].forEach(btn => {
    btn.addEventListener("click", requestRematch);
});

let activeTimer = false;

function clearBoard() {
    [...document.getElementsByClassName("column")].forEach((element) => {
        [...element.children].forEach(child => {
            child.style.backgroundImage = "none";
        });
    });
    document.getElementById("losingBlock").style.display = "none";
    document.getElementById("gameBlock").style.display = "block";
    document.getElementById("winningBlock").style.display = "none";
}

function requestRematch() {
    player.rematch();
}

function startTimer() {
    activeTimer = true;
    updateTimer();
}

function updateTimer() {
    setTimeout(() => {
        if(activeTimer) {
            let timerValue = parseInt(document.getElementById("secondsRemaining").innerText);
            document.getElementById("secondsRemaining").innerText = --timerValue;
            if(timerValue <= 0) {
                showNotification("Your time is up!");
                player.timeout();
                resetTimer();
            } else {
                updateTimer();
            }
        }
    }, 1000);
}

function resetTimer() {
    activeTimer = false;
    document.getElementById("secondsRemaining").innerText = "5";
}

function showNotification(msg) {
    let alert = document.getElementsByClassName("alertSection")[0];
    document.getElementsByClassName("alertMessage")[0].innerText = msg;
    alert.style.display = "block";
}

function visualiseWinningScreen() {
    resetTimer();
    document.getElementById("losingBlock").style.display = "none";
    document.getElementById("gameBlock").style.display = "none";
    document.getElementById("winningBlock").style.display = "block";
}

function visualiseLosingScreen() {
    resetTimer();
    document.getElementById("winningBlock").style.display = "none";
    document.getElementById("gameBlock").style.display = "none";
    document.getElementById("losingBlock").style.display = "block";
}

function enableClicks() {
    [...document.getElementsByClassName("column")].forEach((element) => {
        element.style.pointerEvents = "auto";
        element.style.cursor = "pointer";
    });
    document.getElementById("usernameFirst").style.textShadow = shadowStyle;
    document.getElementById("usernameSecond").style.textShadow = "none";
}

function disableClicks() {
    [...document.getElementsByClassName("column")].forEach((element) => {
        element.style.pointerEvents = "none";
    });
    document.getElementById("usernameFirst").style.textShadow = "none";
    document.getElementById("usernameSecond").style.textShadow = shadowStyle;
}

function clickColumn(element) {
    resetTimer();
    let columnIndex = parseInt(element.id.replace("column", ""));
    player.makeMove(columnIndex);
}

function visualiseMove(symbol, row, column) {
    let image = symbol === 1 ? "url('/images/LastDrop.png')" : "url('/images/LastSnowflake.png')";
    let cellId = "cell" + row + "" + column;
    let cell = document.getElementById(cellId);

    let drop = document.createElement("div");
    let cloud = document.getElementById("cloudBox").getBoundingClientRect();
    drop.className = "drop";

    drop.style.backgroundImage = image;
    drop.style.width = cell.getBoundingClientRect().width + "px";
    drop.style.height = cell.getBoundingClientRect().height + "px";
    drop.style.left = cell.getBoundingClientRect().left + "px";
    drop.style.top = cloud.bottom + window.scrollY - cloud.height / 2 + "px";
    drop.style.animation = "drop 4s linear";
    drop.style.zIndex = -5;
    drop.style.setProperty(
        "--b",
        cell.getBoundingClientRect().bottom -
        (cloud.bottom + window.scrollY - cloud.height / 2) -
        cell.getBoundingClientRect().height +
        "px"
    );
    drop.style.animationFillMode = "forwards";

    document.getElementById("gameScreen").appendChild(drop);
    setTimeout(() => {
        drop.remove();
        cell.style.backgroundImage = image;
        cell.style.backgroundSize = "100% 100%";
        cell.style.backgroundRepeat = "no-repeat";
        cell.style.backgroundPosition = "center";
    }, 4000);
}
