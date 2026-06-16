/* -------------------------
   kenzo portfolio — main.js
   ------------------- */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

// Hero right cards trigger on load
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero-right .fade-up').forEach((el) => el.classList.add('visible'));
  }, 150);
});

// ---  PROFILE IMAGE SWAP ---
const profileTrigger = document.getElementById('profile-trigger');
const profileImg = document.getElementById('profile-img');
const profileLocation = document.getElementById('profile-location'); 
const clickMePill = document.querySelector('.click-me-pill'); 

const img1 = 'assets/images/profile-1.jpeg'; 
const img2 = 'assets/images/profile-2.jpeg';

const metaData = {
  img1: {
    location: " ⚲ Robertson Cliffs, SSM, ON",
    pillDefault: "CLICK ME",
    jokes: [
      "Refactoring my work-life balance.",
      "High altitude, low latency views."
    ],
    pillJokes: [
      "Ouch!",
      "Calibrating..."
    ]
  },
  img2: {
    location: "⚲ My Couch",
    pillDefault: "Thanks for Visiting!", 
    jokes: [
      "Hope you're having a wonderful day.", 
      "10/10 good boy. 0 syntax errors found."
    ],
    pillJokes: [
      "BOOP!",
      "Pet mode active!"
    ]
  }
};

let isShowingImg1 = true;
let isAnimating = false;
let textRevertTimeout = null; 

if (profileTrigger && profileImg && profileLocation && clickMePill) {
  profileTrigger.addEventListener('click', () => {
    if (isAnimating) return; 
    
    isAnimating = true;
    profileTrigger.classList.add('is-swapping');
    
    clearTimeout(textRevertTimeout);
    
    const currentPool = isShowingImg1 ? metaData.img1 : metaData.img2;
    const randomJoke = currentPool.jokes[Math.floor(Math.random() * currentPool.jokes.length)];
    const randomPillResponse = currentPool.pillJokes[Math.floor(Math.random() * currentPool.pillJokes.length)];
    
    profileLocation.textContent = randomJoke;
    clickMePill.textContent = randomPillResponse; 
    
    setTimeout(() => {
      if (isShowingImg1) {
        profileImg.src = img2;
      } else {
        profileImg.src = img1;
      }
      isShowingImg1 = !isShowingImg1;
      
      setTimeout(() => {
        profileTrigger.classList.remove('is-swapping');
        
        setTimeout(() => {
          isAnimating = false;
        }, 700);
        
      }, 500);
      
    }, 700);

    textRevertTimeout = setTimeout(() => {
      const activePool = isShowingImg1 ? metaData.img1 : metaData.img2;
      profileLocation.textContent = activePool.location;
      clickMePill.textContent = activePool.pillDefault;
    }, 800);
  });

  profileTrigger.addEventListener('mouseleave', () => {
    if (!isAnimating) {
      clearTimeout(textRevertTimeout);
      const activePool = isShowingImg1 ? metaData.img1 : metaData.img2;
      profileLocation.textContent = activePool.location;
      clickMePill.textContent = activePool.pillDefault; 
    }
  });
}

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((s) => sectionObserver.observe(s));

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.querySelectorAll('.project-card').forEach((card) => {
  const maxTilt = 15; 

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top; 

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -maxTilt; 
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    card.style.transform = `translateY(-12px) translateZ(40px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    card.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)'; 
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg)`;
    card.style.transition = 'transform 0.6s cubic-bezier(0.2, 1, 0.3, 1)'; 
  });
});