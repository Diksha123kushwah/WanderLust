// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

let editBtns = document.getElementsByClassName("editBtn");
let matchMedia = window.matchMedia("(max-width: 600px)");
let updateBtn = (e) => {
  for (const editBtn of editBtns) {
    if (e.matches) {
      editBtn.textContent = "Edit";
    } else {
      editBtn.textContent = "Edit Listing";
    }
  }
}
updateBtn(matchMedia);
matchMedia.addEventListener("change", (updateBtn));

let delBtns = document.getElementsByClassName("delBtn");
let updateDelBtn = (e) => {
  for (const delBtn of delBtns) {
    if (e.matches) {
      delBtn.textContent = "Delete";
    } else {
      delBtn.textContent = "Delete Listing";
    }
  }
}
updateDelBtn(matchMedia);
matchMedia.addEventListener("change", (updateDelBtn));

const menuToggle = document.getElementById("menuToggle");
const menuOverlay = document.getElementById("menuOverlay");
const closeMenu = document.getElementById("closeMenu");

menuToggle.addEventListener("click", () => {
  menuOverlay.classList.add("active");
});

closeMenu.addEventListener("click", () => {
  menuOverlay.classList.remove("active");
});
const menuToggleFil = document.getElementById("menuToggleFil");
const menuOverlayFil = document.getElementById("menuOverlayFil");
const closeMenuFil = document.getElementById("closeMenuFil");

menuToggleFil.addEventListener("click", () => {
  menuOverlayFil.classList.add("activeFil");
});

closeMenuFil.addEventListener("click", () => {
  menuOverlayFil.classList.remove("activeFil");
});