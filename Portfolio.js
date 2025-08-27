window.scrollTo({
  behavior: 'smooth'
});


//for scroll animation (work showcase)
const revealElements = document.querySelectorAll("[data-reveal], [data-reveal-left], [data-reveal-right]");

const scrollshow = function () {
    for (let i = 0, len = revealElements.length; i < len; i++) {
        const isElementsOnScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight;
       
        if (isElementsOnScreen){
             revealElements[i].classList.add("revealed")
        }else{
             revealElements[i].classList.remove("revealed");
        }
    } 
}          

window.addEventListener("scroll", scrollshow);

/* work showcase color*/
const workpanels = document.querySelectorAll(".section-work, .section-work-2, .section-work-3");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const newColor = entry.target.getAttribute("data-color");
        document.body.style.backgroundColor = newColor;
      }
    });
  },
  { threshold: 0.4 } // adjust if needed
);

workpanels.forEach((workpanel) => observer.observe(workpanel));
/*end of work showcase color*/

//video start
window.addEventListener('scroll', function () {
  let videoSection = document.querySelector('.video');
  let scrollTop = window.scrollY;
  
  // Moves background slowly for parallax
  videoSection.style.backgroundPositionY = (scrollTop - videoSection.offsetTop) * 0.5 + 'px';
});
//video end

//buttons workshowcase
function Openresume() {
  window.open("https://drive.google.com/file/d/1Ckf8CcrKvpG85boAzTqImulyfI5H5b_D/view?usp=sharing");
}
/*
function openDoggotreats() {
  window.open("https://123eqwad.xyz/doggo-treats-home");
}
function Yoogaa() {
  window.open("https://123eqwad.xyz/yoogaa-home");
}
function HealthyLiving() {
  window.open("https://123eqwad.xyz/healthyliving-home");
}
*/

//menu animation
const hamMenu = document.querySelector(".ham-menu");
const header = document.querySelector(".header");

hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    header.classList.toggle("active");
});

//end of menu animation

console.clear();

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger, CustomEase);

  
  // =====================
  // Lenis Smooth Scroll
  // =====================
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);


  // =====================
  // Gallery Showcase Animation
  // =====================
  const stickySection = document.querySelector(".gallery.steps");
  const stickyHeight = window.innerHeight * 7;
  const cards = document.querySelectorAll(".card");
  const countContainer = document.querySelector(".count-container");
  const totalCards = cards.length;

  ScrollTrigger.create({
    trigger: stickySection,
    start: "top top",
    end: `+=${stickyHeight}px`,
    pin: true,
    pinSpacing: true,
    onUpdate: (self) => {
      positionCards(self.progress);
    },
  });

  const getRadius = () => {
    return window.innerWidth < 900 ? window.innerWidth * 7.5 : window.innerWidth * 6;
  };

  const arcAngle = Math.PI * 0.4;
  const startAngle = Math.PI / 2 - arcAngle / 2;

  function positionCards(progress = 0) {
    const radius = getRadius();
    const totalTravel = 1 + totalCards / 12;
    const adjustedProgress = (progress * totalTravel - 0.8) * 0.75;

    cards.forEach((card, i) => {
      const normalizedProgress = (totalCards - 1 - i) / totalCards;
      const cardProgress = normalizedProgress + adjustedProgress;
      const angle = startAngle + arcAngle * cardProgress;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      gsap.set(card, {
        x: x,
        y: -y + radius,
        transformOrigin: "center center",
      });
    });
  }
  positionCards(0);

  let currentCardIndex = 0;
  const observerOptions = {
    root: null,
    rootMargin: "0% 0%",
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let cardIndex = Array.from(cards).indexOf(entry.target);
        currentCardIndex = cardIndex;

        const targetY = 150 - currentCardIndex * 150;
        gsap.to(countContainer, {
          y: targetY,
          duration: 0.3,
          ease: "power1.out",
          overwrite: true,
        });
      }
    });
  }, observerOptions);

  cards.forEach((card) => observer.observe(card));
  window.addEventListener("resize", () => positionCards(0));

  // =====================
  // Loader Animation
  // =====================
  const customEase = CustomEase.create("custom", ".87, 0, .13, 1");
  const counter = document.getElementById("counter");

  gsap.to(".hero", {
    clipPath: "polygon(0% 75%, 25% 75%, 25% 85%, 0% 85%)",
    duration: 0.8,
    ease: customEase,
    delay: 0.5,
  });

  gsap.to(".hero", {
    clipPath: "polygon(0% 75%, 100% 75%, 100% 85%, 0% 85%)",
    duration: 1.5,
    ease: customEase,
    delay: 1.5,
    onStart: () => {
      gsap.to(".progress-bar", {
        width: "100%",
        duration: 1.5,
        ease: customEase,
      });

      gsap.to(counter, {
        innerHTML: 100,
        duration: 1.5,
        ease: customEase,
        snap: { innerHTML: 1 },
      });
    },
  });

  gsap.to(".hero", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1,
    ease: customEase,
    delay: 3,
  });

  gsap.to(".hero", {
  duration: 0.5,
  opacity: 0,
  pointerEvents: "none",
  delay: 3.5,
  ease: customEase,
  onComplete: () => {
    document.querySelector(".hero").style.display = "none";
    ScrollTrigger.refresh();
  },
});

  // =====================
  // Work Showcase Scroll Animation
  // =====================
  const wrappers = document.querySelectorAll(".wrapper");
  const overlay = document.getElementById("overlay");
  const boxes = gsap.utils.toArray(".box");

  wrappers.forEach((wrapper) => {
    const right = wrapper.querySelector(".right");

    ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: () => "+=" + (right.scrollHeight - window.innerHeight),
      pin: wrapper.querySelector(".left"),
      pinSpacing: false,
      markers: false,
      onLeave: () => (overlay.style.display = "none"),
      onLeaveBack: () => (overlay.style.display = "none"),
    });
  });

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      document.body.style.overflow = "hidden";
      overlay.style.display = "block";
    });

    gsap.to(box, {
      ease: "none",
      scrollTrigger: {
        trigger: box,
        start: "top center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    document.body.style.overflow = "auto";
  });

}); // end of main code


window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
