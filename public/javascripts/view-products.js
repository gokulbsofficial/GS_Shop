// buttons
var review = document.querySelector("[data-id = reviews]");
var description = document.querySelector("[data-id = description]");
var shipping = document.querySelector("[data-id = shipping]");

//content-tabs
var descriptionTab = document.getElementById("description");
var reviewTab = document.getElementById("reviews");
var shippingTab = document.getElementById("shipping");

//description tab toogle
description.addEventListener("click", () => {
  descriptionTab.classList.add("active");
  description.classList.add("active");
  reviewTab.classList.remove("active");
  review.classList.remove("active");
  shippingTab.classList.remove("active");
  shipping.classList.remove("active");
});

//review tab toggle
review.addEventListener("click", () => {
  reviewTab.classList.add("active");
  review.classList.add("active");
  descriptionTab.classList.remove("active");
  description.classList.remove("active");
  shippingTab.classList.remove("active");
  shipping.classList.remove("active");
});

//shipping tab toogle
shipping.addEventListener("click", () => {
  descriptionTab.classList.remove("active");
  description.classList.remove("active");
  reviewTab.classList.remove("active");
  review.classList.remove("active");
  shippingTab.classList.add("active");
  shipping.classList.add("active");
});
