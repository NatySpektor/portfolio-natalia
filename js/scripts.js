// Portfólio de Natália Spektor
// Interações: menu mobile, navegação ativa, animações, barras de habilidades,
// botão voltar ao topo e modo claro/escuro.

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const backToTop = document.getElementById('backToTop');
  const themeToggle = document.getElementById('themeToggle');
  const navLinks = document.querySelectorAll('.side-nav .nav-link');
  const sections = document.querySelectorAll('main section[id]');

  // Ano automático no rodapé
  document.getElementById('year').textContent = new Date().getFullYear();

  // Menu mobile
  function toggleMenu(open) {
    sidebar.classList.toggle('open', open);
    menuOverlay.classList.toggle('show', open);
    mobileMenu.setAttribute('aria-expanded', open);
    mobileMenu.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
  }

  mobileMenu.addEventListener('click', () => toggleMenu(!sidebar.classList.contains('open')));
  menuOverlay.addEventListener('click', () => toggleMenu(false));
  navLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

  // Destaca o item do menu correspondente à seção visível
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const active = document.querySelector(`.side-nav .nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => observer.observe(section));

  // Animações de entrada
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Anima as barras de habilidades quando aparecem
  const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.progress-bar').forEach(bar => {
          bar.style.width = `${bar.dataset.width}%`;
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  const skills = document.getElementById('habilidades');
  if (skills) skillObserver.observe(skills);

  // Botão voltar ao topo
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('show', window.scrollY > 450);
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Modo escuro com preferência salva no navegador
  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
  }
  themeToggle.addEventListener('click', () => {
    const dark = document.body.classList.toggle('dark');
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light');
    themeToggle.innerHTML = dark ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
  });
});
