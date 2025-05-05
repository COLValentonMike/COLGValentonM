// Declarations
let darkButton = document.getElementById('modeToggle');
let topButton = document.getElementById('backToTop');
let form = document.getElementById('contact');
let messageBox = document.getElementById('formMessage');
let menu = document.getElementById('navbar');

// Dark mode
function changeMode() {
  if (document.body.classList.contains('dark-mode')) {
    document.body.classList.remove('dark-mode');
    darkButton.textContent = 'Dark Mode';
    localStorage.setItem('darkMode', 'off');
  } else {
    document.body.classList.add('dark-mode');
    darkButton.textContent = 'Light Mode';
    localStorage.setItem('darkMode', 'on');
  }
}
darkButton.addEventListener('click', changeMode);

// Check if dark mode was on before, save
window.addEventListener('load', function() {
  if (localStorage.getItem('darkMode') === 'on') {
    document.body.classList.add('dark-mode');
    darkButton.textContent = 'Light Mode';
  }
});

// backtobutton, if scrolled down by 200px show button
window.addEventListener('scroll', function() {
  if (window.pageYOffset > 200) {
    topButton.style.display = 'block';
  } else {
    topButton.style.display = 'none';
  }
});

// button for going to
topButton.addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Timeline scroller
document.addEventListener('DOMContentLoaded', function() {
  let scroller = document.querySelector('.timeline-scroller');
  let title = document.getElementById('grading-phase');
  let phases = document.querySelectorAll('.timeline-phase');
  
  scroller.addEventListener('scroll', function() {
    phases.forEach(function(box) {
      let boxPosition = box.getBoundingClientRect();
      let scrollerPosition = scroller.getBoundingClientRect();
      
      if (boxPosition.left - scrollerPosition.left >= -100 && boxPosition.left - scrollerPosition.left <= 100) {
        let phaseName = box.getAttribute('data-phase');
        // Remove active class from all phases
        phases.forEach(phase => phase.classList.remove('active'));
        // Add active class to current phase
        box.classList.add('active');
        
        // Trigger title change with animation
        title.classList.add('change');
        setTimeout(() => {
          title.textContent = phaseName.charAt(0).toUpperCase() + phaseName.slice(1) + ' Projects';
          title.classList.remove('change');
        }, 250); // Halfway through the animation
      }
    });
  });
  
  // Initialize first phase as active
  if (phases.length > 0) {
    phases[0].classList.add('active');
  }
});

// Form validation
form.addEventListener('submit', function(event) {
  event.preventDefault();
  
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let message = document.getElementById('message');
  let allGood = true;
  
  // Check name
  if (name.value.trim() === '') {
    name.classList.add('is-invalid');
    allGood = false;
  } else {
    name.classList.remove('is-invalid');
  }
  
  // Check email
  if (!email.value.includes('@') || !email.value.includes('.')) {
    email.classList.add('is-invalid');
    allGood = false;
  } else {
    email.classList.remove('is-invalid');
  }
  
  // Check message
  if (message.value.trim() === '') {
    message.classList.add('is-invalid');
    allGood = false;
  } else {
    message.classList.remove('is-invalid');
  }
  
  // If correct then
  if (allGood) {
    messageBox.textContent = 'Thank you for your message! I will get back to you soon.';
    messageBox.classList.remove('visually-hidden', 'text-danger');
    messageBox.classList.add('text-success');
    form.reset();
  } else {
    messageBox.textContent = '';
    messageBox.classList.add('visually-hidden');
  }
});

// goes to
document.querySelectorAll('#navbar a.nav-link').forEach(function(link) {
  link.addEventListener('click', function(e) {
    if (this.hash !== '') {
      e.preventDefault();
      let target = document.querySelector(this.hash);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // dropdown for mobile
        let menuCollapse = bootstrap.Collapse.getInstance(document.querySelector('#navMenu'));
        if (menuCollapse && window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
          menuCollapse.hide();
        }
      }
    }
  });
});