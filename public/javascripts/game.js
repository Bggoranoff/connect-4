const player = new Player();

[...document.getElementsByClassName("column")].forEach((element) => {
    element.addEventListener("click", (event) => {
        let columnIndex = parseInt(element.id.replace("column", ""));
        if (player.makeMove(columnIndex)) {
            let move = player.lastMove;
            console.log(player);
            let cellId = "cell" + move[0] + "" + move[1];
            console.log(cellId);
            let cell = document.getElementById(cellId);
            let drop = document.createElement("div");
            let cloud = document.getElementById("cloudBox").getBoundingClientRect();
            drop.className = "drop";
            drop.style.backgroundImage = "url('/images/LastDrop.png')";
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
                cell.style.backgroundImage = "url('/images/LastDrop.png')";
                cell.style.backgroundSize = "100% 100%";
                cell.style.backgroundRepeat = "no-repeat";
                cell.style.backgroundPosition = "center";
            }, 4000);
        } else {
            alert("Invalid move!");
        }
    });
});

// [...document.getElementsByClassName("column")].forEach((element) => {
//     element.addEventListener("mouseover", () => {
//         // element.classList.add("dim");
//         console.log("Hello");
//     });
// });
