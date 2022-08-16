//Set currnt year
const yearEL = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEL.textContent = currentYear;

// add mobile menu button
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

//smooth scrolling nav
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    // scroll to  the top
    if (href == "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    // scroll to  other links
    if (href != "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
    // close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");
  });
});
//sticky navigation
const sectionHeroEl = document.querySelector(".section--hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting == false) document.body.classList.add("sticky");
    if (ent.isIntersecting == true) document.body.classList.remove("sticky");
  },
  {
    // in the viewport
    root: null,
    threshold: 0,
    rootMargin: "-160px",
  }
);
obs.observe(sectionHeroEl);
