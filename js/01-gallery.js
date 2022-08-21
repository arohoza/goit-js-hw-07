import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryRef = document.querySelector(".gallery");

const makeGalleryMarkup = () => {
  const markup = galleryItems
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
          <a class="gallery__link" href=${original}>
            <img
              class="gallery__image"
              src=${preview}
              data-source=${original}
              alt="${description}"
            />
          </a>
        </div>`;
    })
    .join("");
  galleryRef.innerHTML = markup;
};

makeGalleryMarkup(galleryItems);

const instance = basicLightbox.create("", {});
// In order to change the content later, we need the DOM-element of the instance:
const elem = instance.element();

function lightboxHtml(imgUrl, imgcaption) {
  let htmlValue = `<div class="gallery__item">
           <img
               class="gallery__image"
               src=${imgUrl}
               data-source=${imgUrl}
               alt="${imgcaption}"
             />
           
         </div>`;
  return htmlValue;
}

const addEvtListenOpen = () => {
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      instance.close();
      console.log("esc");
    }
  });
};

addEvtListenOpen();

// onClose: (instance) => {
//   document.addEventListener("keydown", (e) => {
//     if (e.key === "Escape") {
//       instance.close();
//       console.log("esc");
//     }
//   });
// };

function makeLightbox(imgUrl, imgcaption) {
  elem.innerHTML = lightboxHtml(imgUrl, imgcaption);
  // update content of lightbox according to the result of lightboxHTML()
  instance.show();
  //show the lightbox
}

galleryRef.addEventListener("click", selectItem);

function selectItem(event) {
  if (event.target.nodeName !== "IMG") {
    return;
  } else {
    event.preventDefault();

    makeLightbox(
      //pass data-attributes of image
      event.target.getAttribute("data-source"),
      event.target.getAttribute("alt")
    );
  }
}
