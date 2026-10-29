// Mobile menu
const burger = document.querySelector('.burger');
const nav = document.querySelector('nav.main');
if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(open));
  });
}

// News slider (buttons scroll one card at a time)
const track = document.getElementById('track');
document.querySelectorAll('.ctl button[data-dir]').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!track) return;
    const card = track.querySelector('.card');
    const step = card ? card.offsetWidth + 20 : 372;
    track.scrollBy({ left: Number(btn.dataset.dir) * step, behavior: 'smooth' });
  });
});
