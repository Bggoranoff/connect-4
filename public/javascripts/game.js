[...document.getElementsByClassName("column")].forEach((element) => {
    element.addEventListener("click", () => clickColumn(element));
});

let activeTimer = false;

function startTimer() {
    activeTimer = true;
    updateTimer();
}

function updateTimer() {
    setTimeout(() => {
        if(activeTimer) {
            let timerValue = parseInt(document.getElementById("secondsRemaining").innerText);
            document.getElementById("secondsRemaining").innerText = --timerValue;
            if(timerValue == 0) {
                alert("Timeout!");
                player.timeout();
                resetTimer();
                return;
            }
            updateTimer();
        }
    }, 1000);
}

function resetTimer() {
    activeTimer = false;
    document.getElementById("secondsRemaining").innerText = "20";
}

function enableClicks() {
    [...document.getElementsByClassName("column")].forEach((element) => {
        element.style.pointerEvents = "auto";
    });
}

function disableClicks() {
    [...document.getElementsByClassName("column")].forEach((element) => {
        element.style.pointerEvents = "none";
    });
}

function clickColumn(element) {
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

// [...document.getElementsByClassName("column")].forEach((element) => {
//     element.addEventListener("mouseover", () => {
//         // element.classList.add("dim");
//         console.log("Hello");
//     });
// });
