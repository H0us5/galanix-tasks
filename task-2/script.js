document.addEventListener("DOMContentLoaded", () => {
  const formatDate = () => {
    const date = new Date();
    const dd = date.getDate().toString().padStart(2, "0");
    const mm = (date.getMonth() + 1).toString().padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  };

  const updateImageCount = () => {
    const imageLength = document
      .getElementById("gallery-wrapper")
      .querySelectorAll('.img:not([style*="visibility: hidden"])').length;
    const h1 = document.querySelector("h1");
    h1.innerHTML = `В галереї всього ${imageLength} зображень. <br> Сьогодні ${formatDate()}`;
  };

  const showImagesAndDate = () => {
    const imageLength = document
      .getElementById("gallery-wrapper")
      .querySelectorAll('.img:not([style*="visibility: hidden"])').length;
    const h1 = document.createElement("h1");
    document.body.insertBefore(h1, document.getElementById("gallery-wrapper"));
    h1.innerHTML = `В галереї всього ${imageLength} зображень. <br> Сьогодні ${formatDate()}`;
  };

  showImagesAndDate();

  (() => {
    const images = document.getElementsByClassName("img");
    for (const image of images) {
      image.addEventListener("click", () => {
        const newHtml = image.parentElement.innerHTML;
        const wrapper = document.getElementById("wrapper");
        wrapper.style.display = "block";
        document.querySelector(".close").style.display = "block";
        const fullImage = document.getElementById("full-image");
        fullImage.style.display = "block";
        fullImage.innerHTML = newHtml;
        document.querySelector("#full-image > .delete").remove();
      });
    }

    document.getElementById("wrapper").addEventListener("click", () => {
      document.getElementById("wrapper").style.display = "none";
      document.querySelector(".close").style.display = "none";
      document.getElementById("full-image").style.display = "none";
    });

    document.querySelector(".close").addEventListener("click", () => {
      document.getElementById("wrapper").style.display = "none";
      document.querySelector(".close").style.display = "none";
      document.getElementById("full-image").style.display = "none";
    });
  })();

  const deleteButtons = document.getElementsByClassName("delete");
  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", () => {
      const item = deleteButton.previousElementSibling;
      item.style.visibility = "hidden";
      deleteButton.style.visibility = "hidden";

      updateImageCount();
    });
  }

  const restoreButtons = document.getElementsByClassName("restore");
  for (const restoreButton of restoreButtons) {
    restoreButton.addEventListener("click", () => {
      const elements = document.querySelectorAll("*");
      for (const element of elements) {
        element.style.visibility = "visible";
      }
      updateImageCount();
    });
  }
});
