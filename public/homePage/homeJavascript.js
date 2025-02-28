const icon = document.getElementById("icon");
const rightDiv = document.getElementById("right");
let isOPen = false;

icon.addEventListener("click", () => {
    isOPen = !isOPen;
    if (isOPen) {
        icon.classList.replace("fa-bars", "fa-xmark");
        rightDiv.style.display = "flex";
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
        rightDiv.style.display = "none";
    }
})