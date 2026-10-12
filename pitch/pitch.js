(() => {
  'use strict';
  const slides = [...document.querySelectorAll('.slide')];
  const stage = document.querySelector('#stage');
  const viewport = document.querySelector('#viewport');
  const notes = document.querySelector('#notes');
  const dialog = document.querySelector('#screen-dialog');
  const previous = document.querySelector('#previous');
  const next = document.querySelector('#next');
  const toggle = document.querySelector('#notes-toggle');
  const screenNames = {ask: 'Ask Juan', intake: 'Guided intake', match: 'Care matches', check: 'Care options', consult: 'Simulated consultation', locate: 'Medicine listings', review: 'Consent and booking review', prescription: 'Prescription wallet', home: 'E-JUAN Home'};
  let current = 0;
  const dots = slides.map((slide, i) => {
    const button = document.createElement('button');
    button.setAttribute('aria-label', `Slide ${i + 1}: ${slide.querySelector('h1, h2').textContent}`);
    button.addEventListener('click', () => show(i));
    document.querySelector('#progress').append(button);
    return button;
  });
  function fit() {
    stage.style.setProperty('--scale', Math.min(viewport.clientWidth / 1600, viewport.clientHeight / 900));
  }
  function show(index) {
    current = Math.max(0, Math.min(slides.length - 1, index));
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    dots.forEach((dot, i) => { if (i === current) dot.setAttribute('aria-current', 'step'); else dot.removeAttribute('aria-current'); });
    previous.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    document.querySelector('#counter').textContent = `${current + 1} / ${slides.length}`;
    const note = window.PITCH_NOTES[current];
    document.querySelector('#notes-title').textContent = `Slide ${note.slide}: ${note.title}`;
    document.querySelector('#notes-timing').textContent = `${note.presenter} · Target ${note.target} seconds`;
    document.querySelector('#notes-script').textContent = note.script;
    document.querySelector('#notes-sources').textContent = note.sources;
    document.querySelector('#notes-emphasis').replaceChildren(...note.emphasis.map(text => { const li = document.createElement('li'); li.textContent = text; return li; }));
    notes.scrollTop = 0;
    document.title = `E-JUAN · Slide ${current + 1} of ${slides.length}`;
    if (location.hash !== `#${current + 1}`) location.hash = String(current + 1);
  }
  function readHash() {
    const number = Number(location.hash.slice(1));
    show(Number.isInteger(number) && number >= 1 && number <= slides.length ? number - 1 : 0);
  }
  function toggleNotes(force) {
    notes.hidden = force === undefined ? !notes.hidden : !force;
    toggle.setAttribute('aria-expanded', String(!notes.hidden));
    if (notes.hidden && notes.contains(document.activeElement)) toggle.focus();
  }
  async function fullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      document.querySelector('#announcement').textContent = 'Fullscreen is unavailable in this browser. The deck still fits the window.';
    }
  }
  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  toggle.addEventListener('click', () => toggleNotes());
  document.querySelector('#notes-close').addEventListener('click', () => toggleNotes(false));
  document.querySelector('#fullscreen').addEventListener('click', fullscreen);
  document.querySelector('#print').addEventListener('click', () => window.print());
  document.querySelector('#screen-close').addEventListener('click', () => dialog.close());
  document.querySelectorAll('[data-screen]').forEach(button => button.addEventListener('click', () => {
    const image = button.querySelector('img');
    document.querySelector('#screen-title').textContent = screenNames[button.dataset.screen];
    document.querySelector('#enlarged-screen').src = image.src;
    document.querySelector('#enlarged-screen').alt = image.alt;
    dialog.showModal();
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { if (dialog.open) return; toggleNotes(false); if (document.fullscreenElement) fullscreen(); return; }
    if (dialog.open || event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    if ((event.key === ' ' || event.key === 'Enter') && event.target.closest('button, a')) return;
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(event.key)) { event.preventDefault(); show(current + 1); }
    if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(event.key)) { event.preventDefault(); show(current - 1); }
    if (event.key === 'Home') { event.preventDefault(); show(0); }
    if (event.key === 'End') { event.preventDefault(); show(slides.length - 1); }
    if (event.key.toLowerCase() === 'n') { event.preventDefault(); toggleNotes(); }
    if (event.key.toLowerCase() === 'f') { event.preventDefault(); fullscreen(); }
  });
  window.addEventListener('hashchange', readHash);
  window.addEventListener('resize', fit);
  document.addEventListener('fullscreenchange', () => {
    document.querySelector('#fullscreen').innerHTML = document.fullscreenElement ? 'Exit fullscreen' : 'Present <kbd>F</kbd>';
    fit();
  });
  readHash();
  fit();
})();
