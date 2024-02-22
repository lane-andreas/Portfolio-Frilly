const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");
const box3 = document.querySelector("#box3");
const box4 = document.querySelector("#box4");
const menu = document.querySelector("#menu");
const loader = document.querySelector("#loader");
const mouse = document.querySelector("#mouse");
const boxes = document.querySelectorAll(".box");
let isPaused = false;

let box1X = 0,
  box1Y = 0,
  box2X = 0,
  box2Y = 0,
  box3X = 0,
  box3Y = 0,
  box4X = 0,
  box4Y = 0;
let box1Width = 0,
  box1Height = 0,
  box2Width = 0,
  box2Height = 0,
  box3Width = 0,
  box3Height = 0,
  box4Width = 0,
  box4Height = 0;

let mouseX = 0;
let mouseY = 0;
let lastMouseX = 0;
let lastMouseY = 0;
if (window.innerWidth >= 800) {
  document.addEventListener("mousemove", function (event) {
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    mouseX = event.clientX / 2 + window.innerWidth / 4;
    mouseY = event.clientY / 2 + window.innerHeight / 4;
    mouse.style.left = lastMouseX + "px";
    mouse.style.top = lastMouseY + offset + "px";

    updateAnimationTargets();
    updateDec1Elements();
    updateDec2Elements();
  });
}
let updateAnimationTargetsTimeline = gsap.timeline({ paused: false });
function updateAnimationTargets() {
  updateAnimationTargetsTimeline.clear();
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  const desiredBox1Width = mouseX;
  const desiredBox1Height = mouseY;
  const desiredBox2Width = vw - mouseX;
  const desiredBox2Height = mouseY;
  const desiredBox3Width = mouseX;
  const desiredBox3Height = vh - mouseY;
  const desiredBox4Width = vw - mouseX;
  const desiredBox4Height = vh - mouseY;

  updateAnimationTargetsTimeline
    .to(box1, {
      width: desiredBox1Width,
      height: desiredBox1Height,
      duration: 0.5,
    })
    .to(
      box2,
      { width: desiredBox2Width, height: desiredBox2Height, duration: 0.5 },
      "<"
    )
    .to(
      box3,
      { width: desiredBox3Width, height: desiredBox3Height, duration: 0.5 },
      "<"
    )
    .to(
      box4,
      { width: desiredBox4Width, height: desiredBox4Height, duration: 0.5 },
      "<"
    );
}

function pauseAnimation() {
  updateAnimationTargetsTimeline.pause();
}

function resumeAnimation() {
  updateAnimationTargetsTimeline.resume();
}

function makeElementCoverViewportOnClick(element, absolute, colorM, area) {
  element.addEventListener("click", function () {
    pauseAnimation();
    menu.style.display = "block";
    menu.style.removeProperty("left");
    menu.style.removeProperty("right");
    menu.style[absolute] = 0;
    document.documentElement.style.setProperty("--accent-mod", colorM);
    addToBoxes("pointerEvents", "none");
    element.style.width = "100vw";
    element.style.height = "100vh";
    element.style.zIndex = "10";
    element.style.transition = "width 1s, height 1s, top 1s";

    if (window.innerWidth < 800) {
      element.style.top = 0;
    }
    setTimeout(function () {
      menu.style.pointerEvents = "all";
      element.style.transition = "none";
      element.style.height = "101vh";
      element.style.bottom = "unset";
      menu.style.top = 0;
      element.querySelector("h1").style.paddingBottom = "1vh";
      menu.style.transition = "top 1s";
      document.querySelector(area).style.display = "block";
      document.querySelector("#icon-list").style.display = "flex";
      setTimeout(function () {
        menu.style.transition = "none";
      }, 1000);
    }, 1000);
  });
}

makeElementCoverViewportOnClick(box1, "right", "var(--color-4)", "#about");
makeElementCoverViewportOnClick(box2, "left", "var(--color-3)");
makeElementCoverViewportOnClick(box3, "right", "var(--color-2)");
makeElementCoverViewportOnClick(box4, "left", "var(--color-1)");

menu.addEventListener("click", function () {
  addToBoxes("pointerEvents", "none");
  menu.style.pointerEvents = "none";
  loader.style.animation = "loaderin .75s forwards";
  setTimeout(function () {
    document.querySelector("#about").style.display = "none";
    document.querySelector("#icon-list").style.display = "none";
    menu.style.top = "-3em";
    addToBoxes("zIndex", 1);
    removeFromBoxes("bottom");
    addToBoxes("pointerEvents", "all");

    menu.style.display = "none";

    loader.style.animation = "loaderout .75s forwards";
    if (window.innerWidth < 800) {
      box1.style.removeProperty("top");
      box2.style.removeProperty("top");
      box3.style.removeProperty("top");
      box4.style.removeProperty("top");
      box1.style.removeProperty("height");
      box2.style.removeProperty("height");
      box3.style.removeProperty("height");
      box4.style.removeProperty("height");
    }
    resumeAnimation();
  }, 1000);
});
const body = document.body,
  scrollWrap = document.getElementsByClassName("smooth-scroll-wrapper")[0],
  height = scrollWrap.getBoundingClientRect().height - 1,
  speedScroll = 0.04;

var offset = 0;

body.style.height = Math.floor(height) + "px";

function smoothScroll() {
  offset += (window.pageYOffset - offset) * speedScroll;

  var scroll = "0 -" + offset + "px";
  scrollWrap.style.translate = scroll;
  if (window.innerWidth >= 800) {
    mouse.style.top = lastMouseY + offset * 2 + "px";
  }
  callScroll = requestAnimationFrame(smoothScroll);
}

smoothScroll();

function updateDec1Elements() {
  const decElements = document.querySelectorAll(".dec1");
  decElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const elX = rect.left + rect.width / 2; // Element center X
    const elY = rect.top + rect.height / 2; // Element center Y
    const diffX = mouseX - elX;
    const diffY = mouseY - elY;

    // Calculate how much the element should move
    const moveX = diffX * 0.2; // Adjust the multiplier for the desired effect
    const moveY = diffY * 0.2; // Adjust the multiplier for the desired effect

    // Use GSAP to animate the element
    gsap.to(el, {
      x: moveX,
      y: moveY,
      duration: 0.5,
      ease: "power1.out",
    });
  });
}

function updateDec2Elements() {
  const decElements = document.querySelectorAll(".dec2");
  decElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const elX = rect.left + rect.width / 2; // Element center X
    const elY = rect.top + rect.height / 2; // Element center Y
    const diffX = mouseX - elX;
    const diffY = mouseY - elY;

    // Calculate how much the element should move
    const moveX = diffX * 0.05; // Adjust the multiplier for the desired effect
    const moveY = diffY * 0.05; // Adjust the multiplier for the desired effect

    // Use GSAP to animate the element
    gsap.to(el, {
      x: moveX,
      y: moveY,
      duration: 0.5,
      ease: "power1.out",
    });
  });
}

function removeFromBoxes(propertyName) {
  boxes.forEach((box) => {
    box.style.removeProperty(propertyName);
  });
}
function addToBoxes(propertyName, property) {
  boxes.forEach((box) => {
    box.style[propertyName] = property;
  });
}
