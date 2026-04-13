// Images
const measuringCupImgs = document
  .querySelector("#measuring-cup-explanation")
  .querySelectorAll("img");
const journeyMap = document.querySelector("#journey-map");
const bridgeImg = document.querySelector("#bridging-the-gap");

//Change elements for dark theme
const darkModeMql =
  window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

function replaceDarkImg(img, ext) {
  let source = img.src.slice(0, img.src.indexOf(ext));
  img.src = `${source}_dark${ext}`;
}

if (darkModeMql && darkModeMql.matches) {
  // dark mode

  measuringCupImgs.forEach((img) => {
    replaceDarkImg(img, ".png");
  });

  journeyMap.src = "/assets/Dues Dashboard/journey_map_dark.png";
  replaceDarkImg(bridgeImg, ".svg");
} else {
  // light mode
}

// Viewer elements
const viewers = document.querySelectorAll(".viewer");
const details = document.querySelectorAll(".vfig");

const K1Tabs = document.querySelectorAll(".k1-t");
const K1Btns = document.querySelectorAll(".k1-btn");

const K2Tabs = document.querySelectorAll(".k2-t");
const K2Btns = document.querySelectorAll(".k2-btn");

const K3Tabs = document.querySelectorAll(".k3-t");
const K3Btns = document.querySelectorAll(".k3-btn");

const FCTabs = document.querySelectorAll(".fc-t");
const FCBtns = document.querySelectorAll(".fc-btn");

/**
 * Resize tabbed elements
 * @param {Element} element - viewer
 * @param {Element} btn - tab button
 * @param {Element} details - figure
 */
function resizeViewer(element, btn, details) {
  // console.log("The element being resized is:", element);
  // console.log("This should be the figure element", details);
  // console.log(btn.offsetHeight, details.offsetHeight);
  element.style.height = `${btn.offsetHeight + details.offsetHeight}px`;
}

// Set height of viewer elements
viewers.forEach((elem, i) => {
  resizeViewer(elem, K1Btns[0], details[i]);
});

/**
 * Hook up event listeners to the tabs
 * @param {Array<Element>} tabs - detail elements
 * @param {Array<Element>} btns - summary elements
 */
function watchTabs(tabs, btns) {
  tabs[0].addEventListener("click", (event) => {
    btns[0].setAttribute("tabIndex", -1);

    tabs[1].open = false;
    tabs[2] ? (tabs[2].open = false) : {};

    btns[1].setAttribute("tabIndex", 0);
    tabs[2] ? btns[2].setAttribute("tabIndex", 0) : {};
  });

  tabs[0].addEventListener("toggle", (event) => {
    if (tabs[0].open) {
      let viewer = event.target.offsetParent;
      let figure = viewer.querySelectorAll("figure");

      resizeViewer(viewer, btns[0], figure[0]);
    }
  });

  tabs[1].addEventListener("click", (event) => {
    console.log(event.target);

    btns[1].setAttribute("tabIndex", -1);

    tabs[0].open = false;
    tabs[2] ? (tabs[2].open = false) : null;

    btns[0].setAttribute("tabIndex", 0);
    tabs[2] ? btns[2].setAttribute("tabIndex", 0) : {};

    let viewer = event.target.offsetParent;
    let details =
      event.target.localName == "summary"
        ? event.target.nextElementSibling
        : event.target.children[1];
    resizeViewer(viewer, btns[1], details);
  });

  tabs[1].addEventListener("toggle", (event) => {
    if (tabs[1].open) {
      let viewer = event.target.offsetParent;
      let figure = viewer.querySelectorAll("figure");
      resizeViewer(viewer, btns[1], figure[1]);
    }
  });

  if (tabs[2]) {
    tabs[2].addEventListener("click", (event) => {
      btns[2].setAttribute("tabIndex", -1);

      tabs[0].open = false;
      tabs[1].open = false;

      btns[0].setAttribute("tabIndex", 0);
      btns[1].setAttribute("tabIndex", 0);

      let viewer = event.target.offsetParent;
      let details =
        event.target.localName == "summary"
          ? event.target.nextElementSibling
          : event.target.children[1];
      resizeViewer(viewer, btns[2], details);
    });

    tabs[2].addEventListener("toggle", (event) => {
      if (tabs[2].open) {
        let viewer = event.target.offsetParent;
        let figure = viewer.querySelectorAll("figure");
        resizeViewer(viewer, btns[2], figure[2]);
      }
    });
  }
}

watchTabs(K1Tabs, K1Btns);
watchTabs(K2Tabs, K2Btns);
watchTabs(K3Tabs, K3Btns);
watchTabs(FCTabs, FCBtns);
