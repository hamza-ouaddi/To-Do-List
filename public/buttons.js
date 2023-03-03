//to choose one of the two lists "To Do List" & "To Work List"
const buyBtn = document.getElementById("buy-btn");
const workBtn = document.getElementById("work-btn");

if (window.location.pathname === "/") {
  buyBtn.onclick = function () {
    location.assign("/tobuy");
  };

  workBtn.onclick = function () {
    location.assign("/work");
  };
}

//To change the check icon and item list style when the user click on
let listItems = document.querySelectorAll(".list-item");

if (
  window.location.pathname === "/tobuy" ||
  window.location.pathname === "/work"
) {
  listItems.forEach((listItem) => {
    let checkBtn = listItem.querySelector(".check-btn");
    let paragraph = listItem.querySelector(".paragraph");
    checkBtn.addEventListener("click", () => {
      checkBtn.classList.toggle("fa-solid");
      checkBtn.classList.toggle("fa-circle-check");
      checkBtn.classList.toggle("fa-circle");
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
