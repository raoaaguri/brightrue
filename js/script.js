function toggleMobileNav(){
  document.getElementById('mobileNav').classList.toggle('open')
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting)
      setTimeout(() => e.target.classList.add('visible'), 80)
  })
}, {threshold: 0.1});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

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
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('tab-' + name).classList.add('active');
  event.target.classList.add('active');
}

function submitForm(){
  if(!document.getElementById('f-name').value || !document.getElementById('f-email').value){
    alert('Please fill in at least your name and email.');
    return
  }
  document.getElementById('formArea').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}
