const box1 = document.getElementById("box1");
const box2 = document.getElementById("box2");
const box3 = document.getElementById("box3");
const box4 = document.getElementById("box4");
const menu = document.getElementById("menu");
const loader = document.getElementById("loader");
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

document.addEventListener("mousemove", function (event) {
  mouseX = event.clientX / 2 + window.innerWidth / 4;
  mouseY = event.clientY / 2 + window.innerHeight / 4;
  if (window.innerWidth >= 800) {
    updateAnimationTargets();
  }
});

function updateAnimationTargets() {
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

  gsap.to(box1, {
    width: desiredBox1Width,
    height: desiredBox1Height,
    duration: 0.5,
  });
  gsap.to(box2, {
    width: desiredBox2Width,
    height: desiredBox2Height,
    duration: 0.5,
  });
  gsap.to(box3, {
    width: desiredBox3Width,
    height: desiredBox3Height,
    duration: 0.5,
  });
  gsap.to(box4, {
    width: desiredBox4Width,
    height: desiredBox4Height,
    duration: 0.5,
  });
}

function pauseAnimation() {
  gsap.globalTimeline.pause();
}

function resumeAnimation() {
  gsap.globalTimeline.resume();
}

function makeElementCoverViewportOnClick(element, absolute, colorM) {
  element.addEventListener("click", function () {
    pauseAnimation();
    menu.style.removeProperty("left");
    menu.style.removeProperty("right");
    menu.style[absolute] = 0;
    document.documentElement.style.setProperty("--accent-mod", colorM);
    box1.style.pointerEvents = "none";
    box2.style.pointerEvents = "none";
    box3.style.pointerEvents = "none";
    box4.style.pointerEvents = "none";
    element.style.width = "100vw";
    element.style.height = "100vh";
    element.style.zIndex = "10";
    element.style.transition = "width 1s, height 1s, top 1s";
    element.style.cursor = "unset";
    if (window.innerWidth < 800) {
      element.style.top = 0;
      element.querySelector("p").style.transition = "padding-top 1s";
      element.querySelector("p").style.paddingTop = "4em";
    }
    setTimeout(function () {
      menu.style.pointerEvents = "all";
      element.style.transition = "none";

      menu.style.top = 0;
      menu.style.transition = "top 1s";
      setTimeout(function () {
        menu.style.transition = "none";
      }, 1000);
    }, 1000);
  });
}

makeElementCoverViewportOnClick(box1, "right", "#5d2a42");
makeElementCoverViewportOnClick(box2, "left", "#fb6376");
makeElementCoverViewportOnClick(box3, "right", "#fcb1a6");
makeElementCoverViewportOnClick(box4, "left", "#ffdccc");

menu.addEventListener("click", function () {
  box1.style.pointerEvents = "none";
  box2.style.pointerEvents = "none";
  box3.style.pointerEvents = "none";
  box4.style.pointerEvents = "none";
  menu.style.pointerEvents = "none";
  loader.style.animation = "loaderin 1.5s forwards";
  setTimeout(function () {
    menu.style.top = "-3em";
    box1.style.zIndex = "1";
    box2.style.zIndex = "1";
    box3.style.zIndex = "1";
    box4.style.zIndex = "1";
    box1.style.pointerEvents = "all";
    box2.style.pointerEvents = "all";
    box3.style.pointerEvents = "all";
    box4.style.pointerEvents = "all";
    box1.style.cursor = "pointer";
    box2.style.cursor = "pointer";
    box3.style.cursor = "pointer";
    box4.style.cursor = "pointer";
    loader.style.animation = "loaderout 1s forwards";
    if (window.innerWidth < 800) {
      box1.querySelector("p").style.transition = "none";
      box1.querySelector("p").style.paddingTop = "0";
      box2.querySelector("p").style.transition = "none";
      box2.querySelector("p").style.paddingTop = "0";
      box3.querySelector("p").style.transition = "none";
      box3.querySelector("p").style.paddingTop = "0";
      box4.querySelector("p").style.transition = "none";
      box4.querySelector("p").style.paddingTop = "0";
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