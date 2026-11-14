'use strict';
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
if (menuButton && mobileNav) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    mobileNav.hidden = expanded;
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }));
}

const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project-card');
filters.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  projects.forEach(card => { card.hidden = selected !== 'all' && card.dataset.category !== selected; });
}));

const projectDetails = [
  {category:'01 / POOLSIDE', title:'The Stillwater Residence', description:'A study in quiet luxury: restrained geometry, timeless natural textures and the gentle rhythm of outdoor living.'},
  {category:'02 / GARDENS', title:'The Verdant Courtyard', description:'An intimate retreat imagined around sculptural greenery, layered materials and the restorative quality of natural light.'},
  {category:'03 / OUTDOOR LIVING', title:'The Solstice Pavilion', description:'An elegant gathering space where architecture opens to the landscape and everyday entertaining feels exceptional.'},
  {category:'04 / POOLSIDE', title:'The Horizon House', description:'A considered expression of contemporary outdoor living, where generous proportions and warm finishes create a sense of escape.'}
];
const dialog = document.getElementById('project-dialog');
if (dialog && typeof dialog.showModal === 'function') {
  const dialogImg = document.getElementById('dialog-img');
  document.querySelectorAll('.project-open').forEach(button => button.addEventListener('click', () => {
    const detail = projectDetails[Number(button.dataset.project)];
    const source = button.querySelector('img');
    if (!detail || !source) return;
    dialogImg.src = source.src;
    dialogImg.alt = source.alt;
    document.getElementById('dialog-category').textContent = detail.category;
    document.getElementById('dialog-title').textContent = detail.title;
    document.getElementById('dialog-description').textContent = detail.description;
    dialog.showModal();
  }));
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}

const form = document.getElementById('contact-form');
if (form) form.addEventListener('submit', event => {
  event.preventDefault();
  document.getElementById('form-note').textContent = 'Demo preview complete. No information was sent or saved. This is a fictional business concept created by APTMARK.';
  form.reset();
});
