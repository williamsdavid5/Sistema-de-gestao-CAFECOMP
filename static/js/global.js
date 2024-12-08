//configurações globais do menu lateral
const menuLateralIcon = document.getElementById('menuLateralIcon');
const menuLateralIcon2 = document.getElementById('menuLateralIcon2');
const menuLateral = document.getElementById('menuLateral');

menuLateralIcon.addEventListener('click', () => {
    menuLateral.classList.toggle('show');
});

menuLateralIcon2.addEventListener('click', () => {
    menuLateral.classList.remove('show');
});

