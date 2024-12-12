const slides = document.querySelectorAll('.slide');
const buttons = document.querySelectorAll('.botaoSlider');
let currentSlide = 0;
const slideInterval = 5000; // Tempo de intervalo entre slides (em milissegundos)

// Função para mostrar o slide ativo e destacar o botão
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });

    buttons.forEach((button, i) => {
        button.classList.remove('active');
        if (i === index) {
            button.classList.add('active');
        }
    });
}

// Configuração inicial
showSlide(currentSlide);

// Adiciona eventos aos botões
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetSlideTimer();
    });
});

// Função para alternar automaticamente os slides
function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

// Timer para avançar automaticamente os slides
let slideTimer = setInterval(nextSlide, slideInterval);

// Função para reiniciar o timer quando um botão for clicado
function resetSlideTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, slideInterval);
}

const botaoVerCaixa = document.getElementById('botaoVerCaixa');

botaoVerCaixa.addEventListener('click', () => {
    window.location.href = 'portalTransparencia.html'
});