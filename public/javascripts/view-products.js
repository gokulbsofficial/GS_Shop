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


// buttons
var allProducts = document.querySelector("[data-id = AllProducts]");
var trendingProducts = document.querySelector("[data-id = TrendingProducts]");
var specialProducts = document.querySelector("[data-id = SpecialProducts]");
var featuredProducts = document.querySelector("[data-id = FeaturedProducts]");

//content-tabs
var allProductsTab = document.getElementById("products");
var trendingProductsTab = document.getElementById("trendingProds");
var specialProductsTab = document.getElementById("shipping");
var featuredProductsTab = document.getElementById("shipping");


//description tab toogle
allProducts.addEventListener("click", () => {
  allProductsTab.classList.add("active");
  allProducts.classList.add("active");
  trendingProductsTab.classList.remove("active");
  trendingProducts.classList.remove("active");
  specialProductsTab.classList.remove("active");
  specialProducts.classList.remove("active");
  featuredProductsTab.classList.remove("active");
  featuredProducts.classList.remove("active");
});
trendingProducts.addEventListener("click", () => {
  allProductsTab.classList.remove("active");
  allProducts.classList.remove("active");
  trendingProductsTab.classList.add("active");
  trendingProducts.classList.add("active");
  specialProductsTab.classList.remove("active");
  specialProducts.classList.remove("active");
  featuredProductsTab.classList.remove("active");
  featuredProducts.classList.remove("active");
});
specialProducts.addEventListener("click", () => {
  allProductsTab.classList.remove("active");
  allProducts.classList.remove("active");
  trendingProductsTab.classList.remove("active");
  trendingProducts.classList.remove("active");
  specialProductsTab.classList.add("active");
  specialProducts.classList.add("active");
  featuredProductsTab.classList.remove("active");
  featuredProducts.classList.remove("active");
});
featuredProducts.addEventListener("click", () => {
  allProductsTab.classList.remove("active");
  allProducts.classList.remove("active");
  trendingProductsTab.classList.remove("active");
  trendingProducts.classList.remove("active");
  specialProductsTab.classList.remove("active");
  specialProducts.classList.remove("active");
  featuredProductsTab.classList.add("active");
  featuredProducts.classList.add("active");
});
