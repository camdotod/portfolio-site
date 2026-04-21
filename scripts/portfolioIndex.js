import { projects } from "./projects.js";

// Get page URL
// const baseUrl = new URL(window.location.href);
// console.log(baseUrl);

// const basePathname = baseUrl.pathname;
// console.log(basePathname);

// let state = { modal: false };

// history.replaceState(state, "", baseUrl);

const dateSortBtn = document.getElementById("date-sort");
const nameSortBtn = document.getElementById("name-sort");
const tagsSortBtn = document.getElementById("tags-sort");
const sortOptions = document.querySelectorAll('[name="sort"]');
const dateSortLabel = document.getElementById("date-sort-label");
const nameSortLabel = document.getElementById("name-sort-label");
const tagsSortLabel = document.getElementById("tags-sort-label");
let projectList = document.getElementById("project-list");

const modal = document.querySelector("#modal-overlay");

const modalTitle = modal.querySelector("#modal-title");
const modalYr = modal.querySelector("#modal-yr");
const modalTags = modal.querySelector("#modal-tags");
const modalCarousel = modal.querySelector("#modal-carousel");
const modalDesc = modal.querySelector("#modal-desc");
const modalImages = modalCarousel.querySelectorAll("img");
const modalImgCapts = modal.querySelectorAll(".caption");
const caseStudyLink = modal.querySelector("#case-study-link");

const modalCloseButton = modal.querySelector("#close-button");

/**
 * Toggle between two classes
 * @param {HTMLElement} element - Element the class is on
 * @param {string} class0 - First class name
 * @param {string} class1 - Second class name
 */
const toggleClass = (element, class0, class1) => {
  element.classList.toggle(class0);
  element.classList.toggle(class1);
};

/**
 * Populate Categories based on Sort
 * @param {Array} categoryArr - List of categories
 * @returns HTML Elements
 */
const popCategory = (sort) => {
  //Clear projectList
  let sortName = sort.split("_").shift();

  projectList.innerHTML = `
    <div class="sr-only" aria-role="region" aria-live="polite">Projects sorted by ${sortName}.</div>
    `;
};

const addProject = (project, index) => {
  let tagList = project.tags.split(",");
  console.log(tagList);

  let tagListHTML = "";

  tagList.forEach((tag) => {
    tagListHTML += `<p class="inline pr-1.5 mr-1.5">${tag}</p>`;
  });

  console.log(tagListHTML);

  projectList.innerHTML += `
    <li id="portfolio-item-${index}" class="group flex flex-col divide-y divide-fg-color/50 border hover:bg-fg-color/5 active:bg-fg-color/5 hover:border-double hover:border-4 active:border-double active:border-3 font-display cursor-pointer aspect-square" tabindex="0" data-name="${project.name}">
        <div id="project-preview${index}" class="group-hover:opacity-80 group-active:opacity-80 flex flex-1 self-stretch bg-hatch min-h-40">
          <img
            src="${project.img[0]}"
            alt="${project.img[0]}"
            class="object-cover italic flex-1 ${project.imgstyle}"
          />
        </div>  
        <div id="project-title${index}" class="flex px-3 items-baseline pt-3 pb-2 text-2xl gap-6">
          <h2 class="grow">${project.name}</h2>
          <span class="material-symbols-outlined group-hover:scale-105">open_in_full</span>
        </div>  
        <div
          id="project-details-${index}"
          class="flex items-baseline gap-3 divide-x divide-fg-color/20 px-3"
        >
          <div id="project-tags-${index}" class="block text-sm py-1 truncate flex-1 divide-x divide-fg-color/20 ">
            ${tagListHTML}
          </div>
          <p class="text-sm">${project.year}</p>
        </div>
    </li>
   `;
};

/**
 * Sort the projects in the index
 * @param {string} sort - ID of input element being pressed
 */
const setSort = (sort) => {
  console.log("Sorting...");

  popCategory(sort);

  // SORTING BY DATE ---
  if (sort === "date-sort") {
    projects.sort(function (a, b) {
      let aDate = new Date(a.date.split("–").pop());
      let bDate = new Date(b.date.split("–").pop());
      if (aDate > bDate) {
        return -1;
      }
      if (aDate < bDate) {
        return 1;
      }
      return 0;
    });

    projects.forEach((project, i) => {
      addProject(project, i);
    });
  }
  // SORTING BY Tag ---
  else if (sort === "tags-sort") {
    let categoryNames = [
      { name: "UX/UI Design", color: "grit" },
      { name: "Design Research", color: "calm" },
      { name: "Industrial Design", color: "vigor" },
      { name: "Design Anthropology", color: "fresh" },
    ];

    for (let i = 0; i < categoryNames.length; i++) {
      projectList.innerHTML += `
      <div class="flex lg:col-span-2 border-fg-color/20 py-4 border-t ${i > 0 ? "mt-6" : ""}">
        <h3 id="${categoryNames[i].name.replace(" ", "-")}" class="text-${categoryNames[i].color}-600 dark:text-${categoryNames[i].color}-100 bg-${categoryNames[i].color}-100 dark:bg-${categoryNames[i].color}-900 block w-fit rounded-lg px-1.5 py-[3px] font-display ">
          ${categoryNames[i].name}
        </h3>
      </div>
      `;

      projects.forEach((project, index) => {
        if (project.tags.indexOf(categoryNames[i].name) > -1) {
          addProject(project, index);
        }
      });
    }
  }
  // SORTING BY NAME ---
  else if (sort === "name-sort") {
    projects.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    projects.forEach((project, i) => {
      addProject(project, i);
    });
  }
};

const handleKeyDown = (key, sort) => {
  if (key === "Space" || key === "Enter") {
    let buttonName = sort.replace("-label", "");
    setSort(buttonName);
    // Set radio buttons
    sortOptions.forEach((input) => {
      input.id === buttonName
        ? (input.checked = true)
        : (input.checked = false);
    });
  }
};

setSort("date-sort");
dateSortBtn.setAttribute("checked", true);
watchTiles();

//Detect which button is pushed
tagsSortBtn.addEventListener("click", (e) => {
  setSort(e.target.id);
  console.log("Sorted by tag");
});
tagsSortLabel.addEventListener("keydown", (e) =>
  handleKeyDown(e.code, e.target.id),
);
nameSortBtn.addEventListener("click", (e) => {
  setSort(e.target.id);
  console.log("Sorted by name");
});
nameSortLabel.addEventListener("keydown", (e) =>
  handleKeyDown(e.code, e.target.id),
);
dateSortBtn.addEventListener("click", (e) => {
  setSort(e.target.id);
  console.log("Sorted by date");
});
dateSortLabel.addEventListener("keydown", (e) =>
  handleKeyDown(e.code, e.target.id),
);

// Modal
const observer = new MutationObserver(() => {
  console.log("A mutation has been observed..");
  watchTiles();
});

observer.observe(projectList, { subtree: true, childList: true });

modalCloseButton.addEventListener("click", (event) => {
  closeModal();
});

modal.addEventListener("click", (event) => {
  if (event.target == modal) {
    closeModal();
  }
});

// Sync radio buttons with scroll
const captRadioBtns = modal.querySelectorAll("input");

const xOptions = {
  root: modalCarousel,
  threshold: 0.5,
};

const observeCarousel = (caption, i) => {
  let isVisible = null;

  const xObserver = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
    console.log("Intersection observer says", isVisible);
    captRadioBtns[i].checked = isVisible;
  }, xOptions);

  xObserver.observe(modalImages[i].parentNode);
};

modalImgCapts.forEach(observeCarousel);

function closeModal() {
  console.log("Closing modal...");

  // Reset interactions
  modalCarousel.scrollTo(0, 0);

  // Reset the radio button
  document.querySelector("#caption-1 > label > input").checked = true;

  modalTags.innerHTML = "";

  modalImages[2].parentNode.classList.add("flex");
  modalImages[2].parentNode.classList.remove("hidden");

  let vidFrame = document.getElementById("media-frame");
  vidFrame.classList.add("hidden");
  vidFrame.classList.remove("flex");
  vidFrame.children[0].setAttribute("src", "");

  modalImgCapts[2].parentNode.setAttribute(
    "onClick",
    "window.location='#modal-img-3';",
  );

  // Reset URL
  // state.modal = false;
  // history.replaceState(state, "", baseUrl);
  // Close modal
  toggleClass(modal, "hidden", "flex");
}

function watchTiles() {
  const projectTiles = document.querySelectorAll("li");

  projectTiles.forEach((tile) => {
    tile.addEventListener("click", (event) => {
      let projectName = tile.getAttribute("data-name");
      console.log("Clicked " + projectName);

      toggleClass(modal, "hidden", "flex");

      // state.modal = true;
      // let newUrl = baseUrl + "/" + projectName.replace(" ", "_");
      // history.pushState(state, "", newUrl);
      let clickedProject = projects.filter((prj) => {
        return prj.name === projectName;
      })[0];

      if (projectName == "LiUNA Dues Dashboard") {
        caseStudyLink.classList.remove("hidden");
        caseStudyLink.classList.add("flex");
      } else {
        caseStudyLink.classList.remove("flex");
        caseStudyLink.classList.add("hidden");
      }

      // Inject content
      modalTitle.innerText = projectName;

      let tagList = clickedProject.tags.split(",");
      console.log(tagList);
      tagList.forEach((tag) => {
        modalTags.innerHTML += `<p class="inline pr-1.5 mr-1.5">${tag}</p>`;
      });

      modalYr.innerText = clickedProject.year;

      modalImages.forEach((image, i) => {
        try {
          image.setAttribute("src", clickedProject.img[i]);
          image.setAttribute("alt", clickedProject.alt[i]);
        } catch (error) {
          console.log("Project images failed to load");
        }
      });

      if (clickedProject.video) {
        console.log(modalImages[2].parentNode);
        toggleClass(modalImages[2].parentNode, "flex", "hidden");

        let vidFrame = document.getElementById("media-frame");
        toggleClass(vidFrame, "flex", "hidden");

        let video = vidFrame.children[0];
        video.setAttribute("src", clickedProject.video);

        modalImgCapts[2].parentNode.setAttribute(
          "onClick",
          "window.location='#modal-video';",
        );
      }

      modalDesc.innerText = clickedProject.summary;
      modalImgCapts.forEach((caption, i) => {
        caption.innerText = clickedProject.caption[i];
      });
    });
  });
}
// window.addEventListener("popstate", (event) => {
//   console.log("popstate triggered");
//   if (event.state) {
//     console.log(event.state);
//     if (event.state.modal == false) {
//       toggleClass(modal, "hidden", "flex");
//     }
//   } else {
//     console.log("skipped");
//   }
// });
