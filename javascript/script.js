const form = document.querySelector(".free-trial-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("FORM ENVIADO");
  const email = e.target.email.value;
  const response = await fetch("/api/email/free-trial", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  console.log(data);
});

const mobileMenu = document.querySelector(".mobile-menu");
const mobileNav = document.querySelector(".mobile-nav-list");
const closeMobileNav = document.querySelector(".mobile-nav-list button");

mobileMenu.addEventListener("click", () => {
  console.log("clicando");
  if (mobileMenu.classList.contains("active")) {
    mobileNav.classList.remove("active");
  } else {
    mobileNav.classList.toggle("active");
  }
});

closeMobileNav.addEventListener("click", () => {
  mobileNav.classList.remove("active");
});

const navItems = document.querySelectorAll(".item");

navItems.forEach((item) =>
  item.addEventListener("click", () => {
    navItems.forEach((item) => {
      item.classList.remove("active");
    });
    item.classList.toggle("active");
  })
);

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;

        navItems.forEach((item) => item.classList.remove("active"));
        const activeItem = document.querySelector(
          `.item[data-section="${id}"]`
        );
        console.log(activeItem);

        if (activeItem) {
          activeItem.classList.add("active");
        }
      }
    });
  },
  { threshold: 0.8 }
);

sections.forEach((section) => observer.observe(section));
