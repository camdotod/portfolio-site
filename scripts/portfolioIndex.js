import { projects } from "./projects.js";

const projectIndex = document.querySelector("main");
const dateSortBtn = document.getElementById("date-sort");
const tagsSortBtn = document.getElementById("tags-sort");
const sortOptions = document.querySelectorAll('[name="sort"]');
const dateSortLabel = document.getElementById("date-sort-label");
const tagsSortLabel = document.getElementById("tags-sort-label");
let projectList = document.getElementById("project-list");

const modal = document.querySelector("#modal-overlay");

const modalTitle = modal.querySelector("#modal-title");
const modalYr = modal.querySelector("#modal-yr");
const modalTags = modal.querySelector("#modal-tags");
const modalCarousel = modal.querySelector("#modal-carousel");
const carouselSlides = modalCarousel.querySelectorAll("div");
const modalDesc = modal.querySelector("#modal-desc");
const modalImages = modalCarousel.querySelectorAll("img");
const vidFrame = document.getElementById("project-video");
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
 * Replace a class with another class
 * @param {HTMLElement} element - Element to edit
 * @param {string} class0 - Class being removed
 * @param {string} class1 - Class being added
 */
const replaceClass = (element, class0, class1) => {
  element.classList.remove(class0);
  element.classList.add(class1);
};

/**
 * Populate Categories based on Sort
 * @param {Array} categoryArr - List of categories
 * @returns HTML Elements
 */
const popCategory = (sort) => {
  //Clear projectList
  let sortName = sort.split("-").shift();

  projectList.innerHTML = `
    <div class="sr-only" aria-role="region" aria-live="polite">Projects sorted by ${sortName}.</div>
    `;
};

const addProject = (project, index) => {
  let tagList = project.tags.split(",");

  let tagListHTML = "";

  tagList.forEach((tag) => {
    tagListHTML += `<p class="inline pr-1.5 mr-1.5">${tag}</p>`;
  });

  projectList.innerHTML += `
    <article id="portfolio-item-${index}" class="group flex flex-col-reverse border hover:bg-fg-color/5 active:bg-fg-color/5 overflow-hidden hover:border-double hover:border-4 active:border-double active:border-3 font-display cursor-pointer aspect-3/2" tabindex="0" data-name="${project.name}" role='link' aria-labelledby='project-name${index}'">
        <div class="flex flex-col divide-y divide-fg-color/50 border-t border-fg-color/50">
          <div id="project-title${index}" class="flex px-3 items-baseline pt-3 pb-2 text-2xl gap-6">
            <h2 id="project-name${index}" class="grow">${project.name}</h2>
            <span class="material-symbols-outlined group-hover:scale-105" aria-hidden="true">open_in_full</span>
          </div>
          <div
            id="project-details-${index}"
            class="flex items-baseline gap-3 divide-x divide-fg-color/20 px-3 text-fg-color/80"
          >
            <div id="project-tags-${index}" class="block text-sm py-1 truncate flex-1 divide-x divide-fg-color/20">
              ${tagListHTML}
            </div>
            <p class="text-sm">${project.year}</p>
          </div>
        </div>
        <div id="project-preview${index}" class="group-hover:opacity-80 group-active:opacity-80 flex flex-1 basis-0 self-stretch bg-hatch overflow-hidden">
          <img
            src="${project.img[0]}"
            alt="${project.alt[0]}"
            class="object-cover italic self-stretch flex flex-1 ${project.imgstyle}"
          />
        </div> 
    </article>
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
dateSortBtn.addEventListener("click", (e) => {
  setSort(e.target.id);
  console.log("Sorted by date");
});
dateSortLabel.addEventListener("keydown", (e) =>
  handleKeyDown(e.code, e.target.id),
);

// Modal
var modalIsOpen = false;

// Modal Event Listeners
modalCloseButton.addEventListener("click", (event) => {
  closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape" && modalIsOpen) {
    closeModal();
  }
});

modal.addEventListener("click", (event) => {
  if (event.target == modal) {
    closeModal();
  }
});

const observer = new MutationObserver(() => {
  watchTiles();
});

observer.observe(projectList, { subtree: true, childList: true });

// Modal Interactions -----------
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
    captRadioBtns[i].checked = isVisible;
  }, xOptions);

  xObserver.observe(modalImages[i].parentNode);
};

carouselSlides.forEach(observeCarousel);

// Open/Close Modal Functions 
function closeModal() {
  console.log("Closing modal...");
  
  modalIsOpen = false;
  document.title = "Portfolio - Camryn O'Donnell";
  projectIndex.setAttribute("tabindex", 0);

  // Reset interactions
  modalCarousel.scrollTo(0, 0);

  // Reset the radio button
  document.querySelector("#caption-1 > label > input").checked = true;

  replaceClass(modalImages[2], "hidden", "flex");

  replaceClass(vidFrame, "flex", "hidden");

  toggleClass(modal, "hidden", "flex");
}

function watchTiles() {
  const projectTiles = projectList.querySelectorAll("article");

  projectTiles.forEach((tile) => {
    tile.addEventListener("click", (event) => {
      createModal(tile);
    });
    tile.addEventListener("keydown", (event) => {
      if (event.code == "Enter") {
        createModal(tile);
      }
    });
  });

  function createModal(tile) {
    // Get project name
    let projectName = tile.getAttribute("data-name");
    console.log("Clicked " + projectName);

    // Set title & isolate modal
    document.title = `Portfolio - ${projectName}`;
    projectIndex.setAttribute("tabindex", -1);

    // Get project
    let clickedProject = projects.filter((prj) => {
      return prj.name === projectName;
    })[0];

    if (projectName == "LiUNA Dues Dashboard") {
      replaceClass(caseStudyLink, "hidden", "flex");
    } else {
      replaceClass(caseStudyLink, "flex", "hidden");
    }

    // Inject content
    modalTitle.innerText = projectName;

    modalTags.innerHTML = `<span class="sr-only">Tags:</span>`;
    let tagList = clickedProject.tags.split(",");
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
      replaceClass(modalImages[2], "flex", "hidden");
      replaceClass(vidFrame, "hidden", "flex");

      vidFrame.setAttribute("src", clickedProject.video);
    }

    modalDesc.innerHTML = clickedProject.summary;
    modalImgCapts.forEach((caption, i) => {
      caption.innerHTML = clickedProject.caption[i];
    });

    // Show modal
    toggleClass(modal, "hidden", "flex");
    modalIsOpen = true;

    modal.focus();
  }
}