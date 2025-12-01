
// Todo list ng pagkain, inumin, at add-ons
// Parang menu sa group project namin pero legit sa Takeout PH
const menuItems = [
  { name:"Gyudon w Egg", price:"₱139", desc:"Beef rice bowl with egg", img:"images/Food/gyudon-w-egg.jpg", category:"food"},
  { name:"Honey Glaze", price:"₱119", desc:"Sweet honey glazed chicken", img:"images/Food/honey-glaze.jpg", category:"food"},
  { name:"Yangyeom Chicken", price:"₱119", desc:"Korean style spicy fried chicken", img:"images/Food/yangyeom.jpg", category:"food"},
  { name:"Orange Glaze Chicken", price:"₱119", desc:"Sweet and tangy glaze", img:"images/Food/orange-glaze.jpg", category:"food"},
  { name:"Teriyaki", price:"₱119", desc:"Teriyaki chicken with rice", img:"images/Food/teriyaki.jpg", category:"food"},
  { name:"Bacsilog", price:"₱110", desc:"Bacon, garlic rice, fried egg", img:"images/Food/bacsilog.jpg", category:"food"},
  { name:"Fish Fillet", price:"₱119", desc:"Golden fried fillet", img:"images/Food/fish-fillet.jpg", category:"food"},
  { name:"Fish and Chips", price:"₱129", desc:"Crispy fried fish with fries", img:"images/Food/fish-and-chips.jpg", category:"food"},
  { name:"Karaage", price:"₱129", desc:"Japanese fried chicken", img:"images/Food/karaage.jpg", category:"food"},
  { name:"Gyudon", price:"₱129", desc:"Beef bowl", img:"images/Food/gyudon.jpg", category:"food"},
  { name:"Chicken Salad", price:"₱129", desc:"Fresh chicken salad", img:"images/Food/chicken-salad.jpg", category:"food"},
  { name:"Curry", price:"₱99", desc:"Delicious curry dish", img:"images/Food/curry.jpg", category:"food"},
  { name:"Beef Curry", price:"₱149", desc:"Savory beef curry", img:"images/Food/beef-curry.jpg", category:"food"},
  { name:"Chicken Curry", price:"₱149", desc:"Spicy chicken curry", img:"images/Food/chicken-curry.jpg", category:"food"},
  { name:"Fish Curry", price:"₱149", desc:"Mild fish curry", img:"images/Food/fish-curry.jpg", category:"food"},
  { name:"Egg", price:"₱20", desc:"Extra egg", img:"images/add-ons/egg.jpg", category:"addon"},
  { name:"Mozarella Cheese", price:"₱30", desc:"Cheese topping", img:"images/add-ons/mozarella-cheese.jpg", category:"addon"},
  { name:"Rice", price:"₱30", desc:"Steamed rice", img:"images/add-ons/rice.jpg", category:"addon"},
  { name:"Mountain Dew", price:"₱25", desc:"Refreshing soda", img:"images/beverage/mountain-dew.jpg", category:"beverage"},
  { name:"Royal", price:"₱25", desc:"Grape soda", img:"images/beverage/royal.jpg", category:"beverage"},
  { name:"Coke", price:"₱25", desc:"Classic cola", img:"images/beverage/coke.jpg", category:"beverage"},
  { name:"Sprite", price:"₱25", desc:"Lemon-lime soda", img:"images/beverage/sprite.jpg", category:"beverage"},
  { name:"Watermelon", price:"₱90", desc:"Refreshing watermelon soda", img:"images/beverage/watermelon.jpg", category:"beverage"},
  { name:"Mango", price:"₱90", desc:"Sweet mango drink", img:"images/beverage/mango.jpg", category:"beverage"},
  { name:"Lemon", price:"₱90", desc:"Lemonade", img:"images/beverage/lemon.jpg", category:"beverage"},
  { name:"Coconut Water", price:"₱90", desc:"Natural coconut water", img:"images/beverage/coconut-water.jpg", category:"beverage"}
];


// Function para ipakita ang menu items sa tamang category
function renderMenu(cat, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return; // Kung wala, wag nang ituloy

  container.innerHTML = ""; // Clear bago lagay bagong items

  menuItems.filter(item => item.category === cat)
           .forEach(item => {
    const itemBox = document.createElement("div");
    itemBox.className = "menu-item fade-in-section"; // may animation pa
    itemBox.innerHTML = `<img src="${item.img}" alt="${item.name}">
                         <h3>${item.name}</h3>
                         <p>${item.price}</p>
                         <p class="desc">${item.desc}</p>`;
    container.appendChild(itemBox);
  });
}

// I-render lahat ng category
renderMenu("food","foodGrid");
renderMenu("beverage","beverageGrid");
renderMenu("addon","addonsGrid");


// Parang magic scroll buttons sa menu
(function setupScrolls() {
  document.querySelectorAll(".menu-category").forEach(cat => {
    const grid = cat.querySelector(".menu-grid");
    const leftBtn = cat.querySelector(".scroll-btn.left");
    const rightBtn = cat.querySelector(".scroll-btn.right");
    if (!grid || !leftBtn || !rightBtn) return;

    function updateBtns() {
      const show = grid.scrollWidth > grid.clientWidth + 5;
      leftBtn.style.display = rightBtn.style.display = show ? "flex" : "none"; // kung kailangan, lumabas ang buttons
    }

    updateBtns(); // check agad
    window.addEventListener("resize", updateBtns); // responsive mode

    leftBtn.addEventListener("click", ()=> grid.scrollBy({ left:-250, behavior:"smooth"}));
    rightBtn.addEventListener("click", ()=> grid.scrollBy({ left:250, behavior:"smooth"}));
  });
})();


// Para may cool animation kapag nag-scroll
const fadeSections = document.querySelectorAll(".fade-in-section");
const fadeObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting) entry.target.classList.add("visible"); // boom, lumabas na
  });
},{ threshold:0.3 });
fadeSections.forEach(sec=>fadeObserver.observe(sec));

// ====== GALLERY ======
// Images sa gallery, parang IG feed namin sa project
const galleryItems = [
  "images/gallery/karaage-tag.jpg",
  "images/gallery/honey-glaze.jpg",
  "images/gallery/karaage.jpg",
  "images/gallery/curry.jpg",
  "images/gallery/fish-n-chips.jpg",
  "images/gallery/chicken-salad.jpg",
  "images/gallery/gyudon.jpg",
  "images/gallery/uaap.jpg",
  "images/gallery/manggo.jpg",
  "images/gallery/4-meal.jpg"
];

function populateGallery() {
  const galleryGrid = document.getElementById("galleryGrid");
  const expandedGallery = document.getElementById("expandedGallery");
  if(!galleryGrid || !expandedGallery) return;

  galleryGrid.innerHTML = "";
  expandedGallery.innerHTML = "";

  galleryItems.forEach((src,i)=>{
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Gallery Image ${i+1}`;
    if(i<4) galleryGrid.appendChild(img); // first 4 lang, iba show more
    else expandedGallery.appendChild(img);
  });
}
populateGallery();

// Show more / less button
let expanded = false;
const showMoreBtn = document.getElementById("showMoreBtn");
if(showMoreBtn){
  showMoreBtn.addEventListener("click", ()=>{
    const expandedGallery = document.getElementById("expandedGallery");
    expanded = !expanded;
    expandedGallery.style.display = expanded ? "grid" : "none"; // toggle display
    showMoreBtn.innerText = expanded ? "Show Less ▼" : "Show More ▼"; // update text
  });
}


// Para popup login/signup, parang legit app feel
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const loginModal = document.getElementById("loginModal");
const signupModal = document.getElementById("signupModal");
const loginClose = document.getElementById("loginClose");
const signupClose = document.getElementById("signupClose");

// Open modals
if(loginBtn) loginBtn.addEventListener("click", ()=> loginModal.style.display="block");
if(signupBtn) signupBtn.addEventListener("click", ()=> signupModal.style.display="block");

// Close modals
if(loginClose) loginClose.addEventListener("click", ()=> loginModal.style.display="none");
if(signupClose) signupClose.addEventListener("click", ()=> signupModal.style.display="none");

// ====== FORM SUBMITS ======
// Login
const loginForm = document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit", e=>{
    e.preventDefault();
    alert("✅ Login Success! Parang magic lang haha"); 
    loginForm.reset();
  });
}

// Signup
const signupForm = document.getElementById("signupForm");
if(signupForm){
  signupForm.addEventListener("submit", e=>{
    e.preventDefault();
    alert("✅ Signed Up Successfully! Welcome sa cool club 😎");
    signupForm.reset();
  });
}

// Contact form
const contactForm = document.getElementById("contactForm");
if(contactForm){
  contactForm.addEventListener("submit", e=>{
    e.preventDefault();
    alert("✅ Message Sent! Chill lang, basahin namin yan 😆");
    contactForm.reset();
  });
}
