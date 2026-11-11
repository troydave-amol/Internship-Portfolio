/*==================== MENU SHOW & HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
  navToggle = document.getElementById('nav-toggle'),
  navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav-link');

const linkAction = () => {
  const navMenu = document.getElementById('nav-menu');

  navMenu.classList.remove('show-menu');
};

navLink.forEach((n) => n.addEventListener('click', linkAction));

/*==================== CHANGE BACKGROUND HEADER ====================*/
const scrollHeader = () => {
  const header = document.getElementById('header');

  this.scrollY >= 20
    ? header.classList.add('scroll-header')
    : header.classList.remove('scroll-header');
};

window.addEventListener('scroll', scrollHeader);
/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
  const scroll = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute('id'),
      sectionClass = document.querySelector(
        '.nav-menu a[href*=' + sectionId + ']'
      );

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      sectionClass.classList.add('active-link');
    } else {
      sectionClass.classList.remove('active-link');
    }
  });
};

window.addEventListener('scroll', scrollActive)

/*==================== SCROLL ABOUT ANIMATION ====================*/
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.text-gradient').forEach((span) => {
  gsap.to(span, {
    backgroundSize: '100% 100%',
    ease: 'none',
    scrollTrigger: {
      trigger: span,
      start: 'top bottom',
      end: 'top center',
      scrub: true
    }
  });
});


/*==================== DARK LIGHT THEME ====================*/
window.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      toggleBtn.classList.remove('ri-sun-line');
      toggleBtn.classList.add('ri-moon-line');
    } else {
      document.body.classList.remove('light-theme');
      toggleBtn.classList.add('ri-sun-line');
      toggleBtn.classList.remove('ri-moon-line');
    }

    localStorage.setItem('theme', theme);
  }

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light-theme');
    applyTheme(isLight ? 'dark' : 'light');
  });
});
/*==================== MIXITUP FILTER PORTFOLIO ====================*/
var mixer = mixitup('.work-container', {
  selectors: {
    target: '.mix',
  },
  animation: {
    duration: 300,
  }
})

/* Active work */
const linkWork = document.querySelectorAll('.work-item')

function activeWork() {
  linkWork.forEach((a) => {
    a.classList.remove('active-work');
  });

  this.classList.add('active-work');
}

linkWork.forEach((a) => a.addEventListener('click', activeWork));

/*==================== EMAIL JS ====================*/
// EmailJS configuration
// To receive emails directly to your Gmail inbox, sign in to https://dashboard.emailjs.com/
// and replace these with your own Service ID, Template ID, and Public Key:
const EMAILJS_SERVICE_ID = 'service_w5snmss';
const EMAILJS_TEMPLATE_ID = 'template_djbws7h';
const EMAILJS_PUBLIC_KEY = '8o5Jq4qJy2BJ4EKsZ';

const contactForm = document.getElementById('contact-form'),
  contactName = document.getElementById('contact-name'),
  contactEmail = document.getElementById('contact-email'),
  contactMessage = document.getElementById('contact-message'),
  message = document.getElementById('message'),
  contactButton = contactForm ? contactForm.querySelector('.contact-button') : null;

let messageTimeout = null;

const showMessage = (text, type = '') => {
  if (!message) return;
  clearTimeout(messageTimeout);
  message.className = 'contact-message' + (type ? ` color-${type}` : '');
  message.textContent = text;
  if (text) {
    messageTimeout = setTimeout(() => {
      message.textContent = '';
      message.className = 'contact-message';
    }, type === 'error' ? 6000 : 5000);
  }
};

const sendEmail = (e) => {
  e.preventDefault();

  const nameVal = contactName.value.trim();
  const emailVal = contactEmail.value.trim();
  const messageVal = contactMessage.value.trim();

  // Validate all fields
  if (!nameVal || !emailVal || !messageVal) {
    showMessage('Please write all the input fields', 'error');
    return;
  }

  // Populate helper hidden fields for EmailJS template variable compatibility
  const setVal = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.value = val;
  };
  setVal('hidden-user-name', nameVal);
  setVal('hidden-from-name', nameVal);
  setVal('hidden-user-email', emailVal);
  setVal('hidden-from-email', emailVal);
  setVal('hidden-reply-to', emailVal);

  // Set loading state on button
  if (contactButton) {
    contactButton.disabled = true;
    contactButton.textContent = 'Sending...';
  }
  showMessage('');

  emailjs.sendForm(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    '#contact-form',
    EMAILJS_PUBLIC_KEY
  )
    .then(() => {
      showMessage('Message sent successfully ✔', 'success');
      contactForm.reset();
    })
    .catch((error) => {
      console.error('EmailJS submission error:', error);
      showMessage('Message not sent (service error) ❌', 'error');
    })
    .finally(() => {
      if (contactButton) {
        contactButton.disabled = false;
        contactButton.textContent = 'Send Message';
      }
    });
};

if (contactForm) {
  contactForm.addEventListener('submit', sendEmail);
}

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2500,
  delay: 400,
});


sr.reveal('.home-data');
sr.reveal('.home-img-wrapper', { delay: 500 });
sr.reveal('.home-social', { delay: 600 });
sr.reveal('.services-card, .mix', { interval: 100 });
sr.reveal('.proof-card', { interval: 100 });
sr.reveal('.skills-developer, .resume-left, .contact-group', {
  origin: 'left',
});
sr.reveal('.skills-designer, .resume-right, .contact-form', {
  origin: 'right',
});