


// Select elements
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
);

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const imageCounter = document.getElementById("imageCounter");

const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".nav-btn.prev");
const nextBtn = document.querySelector(".nav-btn.next");


// Current images visible after filtering
let visibleItems = [...galleryItems];

// Current image index
let currentIndex = 0;



function getImageInformation(item) {

    const image = item.querySelector("img");

    return {
        src: image.src,
        alt: image.alt,
        title: item.dataset.title,
        category: item.dataset.category
    };
}




function updateLightbox() {

    if (visibleItems.length === 0) {
        return;
    }

    const item = visibleItems[currentIndex];

    const information = getImageInformation(item);

    lightboxImage.src = information.src;
    lightboxImage.alt = information.alt;

    lightboxTitle.textContent = information.title;

    lightboxCategory.textContent =
        information.category.charAt(0).toUpperCase() +
        information.category.slice(1);

    imageCounter.textContent =
        `${currentIndex + 1} / ${visibleItems.length}`;
}



function openLightbox(item) {

    visibleItems = galleryItems.filter(
        galleryItem =>
            !galleryItem.classList.contains("hide")
    );

    currentIndex = visibleItems.indexOf(item);

    if (currentIndex === -1) {
        currentIndex = 0;
    }

    updateLightbox();

    lightbox.classList.add("show");

    document.body.classList.add("no-scroll");
}




function closeLightbox() {

    lightbox.classList.remove("show");

    document.body.classList.remove("no-scroll");
}



function showNext() {

    if (visibleItems.length === 0) {
        return;
    }

    currentIndex =
        (currentIndex + 1) % visibleItems.length;

    updateLightbox();
}




function showPrevious() {

    if (visibleItems.length === 0) {
        return;
    }

    currentIndex =
        (currentIndex - 1 + visibleItems.length) %
        visibleItems.length;

    updateLightbox();
}




filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCategory =
            button.dataset.filter;


        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");


        // Filter gallery
        galleryItems.forEach(item => {

            const itemCategory =
                item.dataset.category;

            const shouldShow =
                selectedCategory === "all" ||
                itemCategory === selectedCategory;

            if (shouldShow) {

                item.classList.remove("hide");

            } else {

                item.classList.add("hide");

            }

        });


        // Update visible images
        visibleItems = galleryItems.filter(
            item => !item.classList.contains("hide")
        );


        // Close lightbox if filter changes
        closeLightbox();

    });

});




galleryItems.forEach(item => {

    const viewButton =
        item.querySelector(".view-btn");


    viewButton.addEventListener("click", event => {

        event.stopPropagation();

        openLightbox(item);

    });


    // Also allow clicking the image/card
    item.addEventListener("click", () => {

        openLightbox(item);

    });

});




closeBtn.addEventListener(
    "click",
    closeLightbox
);

nextBtn.addEventListener(
    "click",
    showNext
);

prevBtn.addEventListener(
    "click",
    showPrevious
);




lightbox.addEventListener("click", event => {

    if (event.target === lightbox) {

        closeLightbox();

    }

});




document.addEventListener("keydown", event => {

    if (!lightbox.classList.contains("show")) {
        return;
    }


    // Escape
    if (event.key === "Escape") {

        closeLightbox();

    }


    // Right arrow
    if (event.key === "ArrowRight") {

        showNext();

    }


    // Left arrow
    if (event.key === "ArrowLeft") {

        showPrevious();

    }

});




visibleItems = [...galleryItems];

console.log(
    `Image Gallery loaded with ${galleryItems.length} images.`
);