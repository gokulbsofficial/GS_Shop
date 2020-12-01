   // buttons
   var allProducts = document.querySelector("[data-id = AllProducts]");
   var trendingProducts = document.querySelector("[data-id = TrendingProducts]");
   var specialProducts = document.querySelector("[data-id = SpecialProducts]");
   var featuredProducts = document.querySelector("[data-id = FeaturedProducts]");

   //content-tabs
   var allProductsTab = document.getElementById("products");
   var trendingProductsTab = document.getElementById("trendingProds");
   var specialProductsTab = document.getElementById("specialProds");
   var featuredProductsTab = document.getElementById("featuredProds");

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