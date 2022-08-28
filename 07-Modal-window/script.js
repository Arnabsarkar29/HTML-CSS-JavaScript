'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const hide_overlay_modal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
const open_modal_ovelay = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', open_modal_ovelay);
}

btnCloseModal.addEventListener('click', hide_overlay_modal);
overlay.addEventListener('click', hide_overlay_modal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (!modal.classList.contains('hidden')) {
      hide_overlay_modal();
    }
  }
});
