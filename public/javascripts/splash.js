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

animate();