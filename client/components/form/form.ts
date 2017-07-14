export default function initForms() {
  for (const input of Array.from(document.querySelectorAll('.form input, .form textarea'))) {
    const i = input as (HTMLInputElement | HTMLTextAreaElement);
    if (i.value.length === 0) {
      i.classList.remove('input-not-empty');
    } else {
      i.classList.add('input-not-empty');
    }
    input.addEventListener('change', (ev) => { // ts-lint:disable-line
      const target = ev.target as (HTMLInputElement | HTMLTextAreaElement);
      if (target.value.length === 0) {
        target.classList.remove('input-not-empty');
      } else {
        target.classList.add('input-not-empty');
      }
    });
  }
}
