// Selecting, Creating, and Deleting Elements

/*******  Selecting elements ******/
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections); // NodeList

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button"); // HTML collection
console.log(allButtons);

console.log(document.getElementsByClassName("btn")); // HTML collection

/*********  Creating and inserting elements ********/
const message = document.createElement("div");
message.classList.add("cookie-message");

// 應使用 textContent 優先於 innerText
// innerText 是一個代表節點及其後代之「已渲染」（rendered）文字內容的屬性。
// textContent 屬性表示了節點或其後代的文字內容。
// innerText 取得的是被 CSS 調整過樣式後渲染的文字；textContent 則是實際取得節點中的文字內容。

// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector(".btn--close-cookie")
  .addEventListener("click", function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

///////////////////////////////////////
/********* Styles, Attributes and Classes *******/

// Styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

console.log(message.style.color);
console.log(message.style.backgroundColor);

console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

document.documentElement.style.setProperty("--color-primary", "orangered");

// Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
console.log(logo.className);

logo.alt = "Beautiful minimalist logo";

// Non-standard
console.log(logo.designer);
console.log(logo.getAttribute("designer"));
logo.setAttribute("company", "Bankist");

console.log(logo.src); // absolute path
console.log(logo.getAttribute("src")); // relative path

const link = document.querySelector(".nav__link--btn");
console.log(link.href); // absolute path
console.log(link.getAttribute("href")); // relative path

// Data attributes
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add("c", "j");
logo.classList.remove("c", "j");
logo.classList.toggle("c");
logo.classList.contains("c"); // not includes

// Don't use
logo.clasName = "jonas";

/*******  Types of Events and Event Handlers ********/
const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading :D");
};

h1.addEventListener("mouseenter", alertH1);

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

/********  Event Propagation in Practice *********/
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

console.log(randomColor());

document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("NAV", e.target, e.currentTarget);
});

/********** DOM Traversing ***********/
//const h1 = document.querySelector("h1");

// Going downwards: child
console.log(h1.querySelectorAll(".highlight"));
console.log(h1.childNodes); // NodeList (contains comment...etc.)
console.log(h1.children); // HTMLCollection { 0: span.highlight, 1: br, 2: span.highlight, length: 3 }
h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";

// Going upwards: parents
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest(".header").style.background = "var(--gradient-secondary)";

h1.closest("h1").style.background = "var(--gradient-primary)";

// Going sideways: siblings
console.log(h1.previousElementSibling); // null
console.log(h1.nextElementSibling); // h4

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = "scale(0.5)";
});

/************ Lifecycle DOM Events ************/
document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built!", e);
});

window.addEventListener("load", function (e) {
  console.log("Page fully loaded", e);
});

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = "";
});
