function getDates() {
    const today = new Date();

    const yearElmt = document.querySelector("#currentyear");
    yearElmt.innerHTML = today.getFullYear();

    const lastModElmt = document.querySelector(".lastModified");
    lastModElmt.innerHTML = `Last Modification: ${document.lastModified}`;
}

getDates();

const menuBtn = document.querySelector("button.menu");
const nav = document.querySelector("header nav");
menuBtn.addEventListener("click", function() {
    menuBtn.classList.toggle("open");
    nav.classList.toggle("open");
})
