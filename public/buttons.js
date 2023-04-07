//to choose one of the two lists "To Do List" & "To Work List"
const buyBtn = document.getElementById("buy-btn");
const workBtn = document.getElementById("work-btn");
const customizeBtn = document.getElementById("customize-btn");
const customizeInput = document.getElementById("customize-part");
const Btn = document.getElementById("customize-btn");

if (window.location.pathname === "/") {
  buyBtn.onclick = function () {
    location.assign("/today");
  };

  customizeBtn.addEventListener("click", () => {
    customizeInput.classList.toggle("show");
  });
}

//To change the check icon and item list style when the user click on
let listItems = document.querySelectorAll(".list-item");

if (
  window.location.pathname === "/today" ||
  window.location.pathname === "/work"
) {
  listItems.forEach((listItem) => {
    let checkBtn = listItem.querySelector(".check-btn");
    let deletebtn = listItem.querySelector(".checkbox-btn");
    let paragraph = listItem.querySelector(".paragraph");
    checkBtn.addEventListener("click", () => {
      checkBtn.classList.toggle("fa-solid");
      checkBtn.classList.toggle("fa-circle-check");
      checkBtn.classList.toggle("fa-circle");
      deletebtn.classList.toggle("show");
      paragraph.classList.toggle("listitem-checked");
      listItem.classList.toggle("item-checked");
    });
  });
} else {
  listItems.forEach((listItem) => {
    let checkBtn = listItem.querySelector(".check-btn");
    let paragraph = listItem.querySelector(".paragraph");
    let deletebtn = listItem.querySelector(".checkbox-btn");
    checkBtn.addEventListener("click", () => {
      checkBtn.classList.toggle("fa-solid");
      checkBtn.classList.toggle("fa-circle-check");
      checkBtn.classList.toggle("fa-circle");
      deletebtn.classList.toggle("show");
      paragraph.classList.toggle("listitem-checked");
      listItem.classList.toggle("item-checked");
    });
  });
}

//To go back to the main page
const backBtn = document.querySelector(".back-btn");

backBtn.onclick = function () {
  location.assign("/");
};
