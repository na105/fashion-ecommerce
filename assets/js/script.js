'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);



/**
 * header sticky & back top btn active
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 150) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
}

addEventOnElem(window, "scroll", headerSticky);



/**
 * scroll reveal effect
 */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
}

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);



function updateTimer(deadline) {
  var time = deadline - new Date();
  return {
    'days': Math.floor(time / (1000 * 60 * 60 * 24)),
    'hours': Math.floor((time / (1000 * 60 * 60)) % 24),
    'minutes': Math.floor((time / 1000 / 60) % 60),
    'seconds': Math.floor((time / 1000) % 60),
    'total': time
  };
}

function animateClock(span) {
  span.className = "turn";
  setTimeout(function () {
    span.className = "";
  }, 700);
}

function startTimer(id, deadline) {
  var timerInterval = setInterval(function () {
    var clock = document.getElementById(id);
    var timer = updateTimer(deadline);

    clock.innerHTML = '<span>' + timer.days + '</span>'
      + '<span>' + timer.hours + '</span>'
      + '<span>' + timer.minutes + '</span>'
      + '<span>' + timer.seconds + '</span>';
    
    //animations
    var spans = clock.getElementsByTagName("span");
    animateClock(spans[3]);
    if (timer.seconds == 59) animateClock(spans[2]);
    if (timer.minutes == 59 && timer.seconds == 59) animateClock(spans[1]);
    if (timer.hours == 23 && timer.minutes == 59 && timer.seconds == 59) animateClock(spans[0]);

    //check for end of timer
    if (timer.total < 1) {
      clearInterval(timerInterval);
      clock.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
    }

  }, 1000);
}

window.onload = function () {
  var deadline = new Date("September 22, 2023 23:59:59");
  startTimer("clock", deadline);
}

