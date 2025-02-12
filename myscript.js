function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const body = document.body;
  navMenu.classList.toggle("active");
  body.classList.toggle("menu-open");
}

document.addEventListener("click", function (event) {
  const navMenu = document.getElementById("navMenu");
  const menuIcon = document.querySelector(".menu-icon");
  if (!navMenu.contains(event.target) && !menuIcon.contains(event.target)) {
    navMenu.classList.remove("active");
    document.body.classList.remove("menu-open");
  }
});

let map = document.getElementsByClassName("map-card");
function cardanimation() {
  for (let i = 0; i < map.length; i++) {
    map[i].addEventListener("mouseover", function () {
      map[i].style.transform = "scale(1.1)";
    });

    map[i].addEventListener("mouseout", function () {
      map[i].style.transform = "scale(1)";
    });
  }
}
cardanimation();
window.addEventListener("resize", cardanimation);
