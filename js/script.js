function toggleMobileNav(){
  const menu = document.getElementById('mobileNav');
  const hamburger = document.getElementById('hamburger');
  menu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', menu.classList.contains('open'));
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      // Trigger lazy loading for images
      if(e.target.tagName === 'IMG' && e.target.dataset.src) {
        e.target.src = e.target.dataset.src;
        e.target.removeAttribute('data-src');
      }
      // Add reveal animation
      setTimeout(() => e.target.classList.add('visible'), 80);
      observer.unobserve(e.target);
    }
  })
}, {threshold: 0.1});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
document.querySelectorAll('img[data-src]').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
  let cur = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if(window.scrollY >= s.offsetTop - 100)
      cur = s.id
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = (a.getAttribute('href') === '#' + cur) ? 'var(--blue)' : ''
  });
});

function showTab(name) {
  document.querySelectorAll('.comp-pane').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  document.getElementById('tab-' + name).classList.add('active');
  event.target.classList.add('active');
  event.target.setAttribute('aria-selected', 'true');
}

function submitForm(){
  if(!document.getElementById('f-name').value || !document.getElementById('f-email').value){
    alert('Please fill in at least your name and email.');
    return
  }
  document.getElementById('formArea').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

function toggleFaqSection(element) {
  const section = element.closest('.faq-section');
  const isOpen = section.classList.contains('open');
  
  // Close all sections
  document.querySelectorAll('.faq-section').forEach(s => {
    s.classList.remove('open');
    s.querySelector('.faq-section-title').setAttribute('aria-expanded', 'false');
    const content = s.querySelector('.faq-section-content');
    content.style.maxHeight = '0px';
  });
  
  // Open clicked section if it wasn't open
  if (!isOpen) {
    section.classList.add('open');
    element.setAttribute('aria-expanded', 'true');
    const content = section.querySelector('.faq-section-content');
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}

