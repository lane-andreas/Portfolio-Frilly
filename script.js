const box1 = document.querySelector("#box1");
const box2 = document.querySelector("#box2");
const box3 = document.querySelector("#box3");
const box4 = document.querySelector("#box4");
const menu = document.querySelector("#menu");
const loader = document.querySelector("#loader");
const mouse = document.querySelector("#mouse");
const boxes = document.querySelectorAll(".box");
const hiddens = document.querySelectorAll(".hidden");
const h1s = document.querySelectorAll("h1");
const root = document.documentElement;

// ANIMATIONS //

if (window.innerWidth >= 800) {
  let mouseX = 0;
  let mouseY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;

  function handleEvent(event) {
    if (event.type === "mousemove") {
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
      mouseX = event.clientX / 2 + window.innerWidth / 4;
      mouseY = event.clientY / 2 + window.innerHeight / 4;
      mouse.style.left = lastMouseX + "px";
      mouse.style.top = lastMouseY + offset + "px";
    }

    headerAnimation();
    updateMove1Elements();
    updateMove2Elements();
  }

  document.addEventListener("mousemove", handleEvent);
  document.addEventListener("scroll", handleEvent);

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

  function updateMove1Elements() {
    const decElements = document.querySelectorAll(".move1");
    decElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elX = rect.left + rect.width / 2;
      const elY = rect.top + rect.height / 2;
      const diffX = mouseX - elX;
      const diffY = mouseY - elY;

      const moveX = diffX * 0.2;
      const moveY = diffY * 0.2;

      gsap.to(el, {
        x: moveX,
        y: moveY,
        duration: 0.5,
        ease: "power1.out",
      });
    });
  }

  function updateMove2Elements() {
    const decElements = document.querySelectorAll(".move2");
    decElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const elX = rect.left + rect.width / 2;
      const elY = rect.top + rect.height / 2;
      const diffX = mouseX - elX;
      const diffY = mouseY - elY;

      const moveX = diffX * 0.05;
      const moveY = diffY * 0.05;

      gsap.to(el, {
        x: moveX,
        y: moveY,
        duration: 0.5,
        ease: "power1.out",
      });
    });
  }

  let headerAnimationTimeline = gsap.timeline({ paused: false });
  function headerAnimation() {
    headerAnimationTimeline.clear();
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

    headerAnimationTimeline
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
    headerAnimationTimeline.pause();
  }

  function resumeAnimation() {
    headerAnimationTimeline.resume();
  }
} else {
  function pauseAnimation() {
    return;
  }

  function resumeAnimation() {
    return;
  }
}

// PAGE CHANGE WARNING //

const startWidth = window.innerWidth;

function updateDisplayOnThresholdCross() {
  if (startWidth >= 800) {
    if (window.innerWidth < 800) {
      document.querySelector("#page-threshold").style.display = "flex";
    }
  }

  if (startWidth < 800) {
    if (window.innerWidth >= 800) {
      document.querySelector("#page-threshold").style.display = "flex";
    }
  }
}

window.addEventListener("resize", updateDisplayOnThresholdCross);

updateDisplayOnThresholdCross();

// MENU INTERACTION //

function headerExpand(element, absolute, area, accent1, accent2) {
  element.addEventListener("click", function () {
    pauseAnimation();
    root.style.setProperty("--accent-1", accent1);
    root.style.setProperty("--accent-2", accent2);

    menu.style.display = "block";
    menu.style.removeProperty("left");
    menu.style.removeProperty("right");
    menu.style[absolute] = 0;
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
      element.style.height = "calc(100vh + 10px)";
      element.style.bottom = "unset";
      menu.style.top = 0;
      menu.style.transition = "top 1s";
      addToAny(h1s, "paddingBottom", "10px");
      document.querySelector("footer").style.display = "flex";
      document.querySelector("#icon-list").style.display = "flex";
      document.querySelector(area).style.display = "block";
      setTimeout(function () {
        menu.style.transition = "none";
      }, 1000);
    }, 1000);
  });
}

headerExpand(box1, "right", "#about", "var(--color-1)", "var(--color-4)");
headerExpand(box2, "left", "#skills", "var(--color-2)", "var(--color-3)");
headerExpand(box3, "right", "#projects", "var(--color-3)", "var(--color-2)");
headerExpand(box4, "left", "#contact", "var(--color-4)", "var(--color-1)");

menu.addEventListener("click", function () {
  addToBoxes("pointerEvents", "none");
  menu.style.pointerEvents = "none";
  loader.style.animation = "loaderin .75s forwards";
  setTimeout(function () {
    addToAny(h1s, "paddingBottom", "0");
    addToAny(hiddens, "display", "none");
    menu.style.top = "-3em";
    addToBoxes("zIndex", 1);
    removeFromBoxes("bottom");
    addToBoxes("pointerEvents", "all");
    menu.style.display = "none";
    removeFromBoxes("height");
    removeFromBoxes("width");
    removeFromBoxes("top");
    loader.style.animation = "loaderout .75s forwards";

    resumeAnimation();
  }, 1000);
});

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
let colorsChanged = false;
document.getElementById("eyeball").addEventListener("click", function () {
  if (!colorsChanged) {
    root.style.setProperty("--color-2", "#FFE9E5");
    root.style.setProperty("--color-3", "#A40062");
    colorsChanged = true;
  } else {
    root.style.setProperty("--color-2", "#fcb1a6");
    root.style.setProperty("--color-3", "#fb6376");
    colorsChanged = false;
  }
});

function removeFromAny(listName, propertyName) {
  listName.forEach((item) => {
    item.style.removeProperty(propertyName);
  });
}
function addToAny(listName, propertyName, property) {
  listName.forEach((item) => {
    item.style[propertyName] = property;
  });
}
