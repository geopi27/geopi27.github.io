const navigationToggle = document.querySelector('.navigation-toggle');
const primaryNavigation = document.querySelector('#primary-navigation');

function closeNavigation() {
  if (!navigationToggle || !primaryNavigation) return;
  navigationToggle.setAttribute('aria-expanded', 'false');
  primaryNavigation.classList.remove('is-open');
}

navigationToggle?.addEventListener('click', () => {
  const isOpen = navigationToggle.getAttribute('aria-expanded') === 'true';
  navigationToggle.setAttribute('aria-expanded', String(!isOpen));
  primaryNavigation.classList.toggle('is-open', !isOpen);
});

primaryNavigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeNavigation);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeNavigation();
    closePhotoModal();
  }
});

const photoModal = document.querySelector('[data-photo-modal]');
const modalImage = document.querySelector('[data-modal-image]');
const modalCaption = document.querySelector('[data-modal-caption]');

function openPhotoModal(imagePath, caption) {
  if (!photoModal || !modalImage || !modalCaption) return;
  modalImage.src = imagePath;
  modalImage.alt = caption;
  modalCaption.textContent = caption;
  photoModal.classList.add('is-visible');
  photoModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-is-open');
}

function closePhotoModal() {
  if (!photoModal || !modalImage) return;
  photoModal.classList.remove('is-visible');
  photoModal.setAttribute('aria-hidden', 'true');
  modalImage.src = '';
  document.body.classList.remove('modal-is-open');
}

document.querySelectorAll('[data-photo-gallery] [data-photo]').forEach((photoButton) => {
  photoButton.addEventListener('click', () => {
    openPhotoModal(photoButton.dataset.photo, photoButton.dataset.caption);
  });
});

document.querySelector('[data-close-modal]')?.addEventListener('click', closePhotoModal);

photoModal?.addEventListener('click', (event) => {
  if (event.target === photoModal) closePhotoModal();
});
