[...document.getElementsByClassName("column")].forEach((element) => {
    element.addEventListener("click", (event) => {
        let cell = element.children[0];
        console.log(cell.getBoundingClientRect().bottom);
        console.log(event.clientY);
        let drop = document.createElement("div");
        let cloud = document.getElementById("cloudBox").getBoundingClientRect();
        drop.className = "drop";
        drop.style.backgroundImage = "url('/images/LastDrop.png')";
        drop.style.width = cell.getBoundingClientRect().width + "px";
        drop.style.height = cell.getBoundingClientRect().height + "px";
        drop.style.left = cell.getBoundingClientRect().left + "px";
        drop.style.top = cloud.bottom + window.scrollY - cloud.height/1.95 + "px";
        drop.style.animation = "drop 4s linear";
        drop.style.zIndex = -10;
        drop.style.setProperty("--b", (cell.getBoundingClientRect().bottom - (cloud.bottom + window.scrollY - cloud.height/2) - cell.getBoundingClientRect().height) + "px");
        drop.style.animationFillMode = "forwards";
        document.getElementById("gameScreen").appendChild(drop);
    });
});



// [...document.getElementsByClassName("column")].forEach((element) => {
//     element.addEventListener("mouseover", () => {
//         // element.classList.add("dim");
//         console.log("Hello");
//     });
// });