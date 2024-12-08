const slider = document.getElementById("deslizante");
const box = document.getElementById("conteudo");

// Atualiza a opacidade do elemento sempre que o valor do slider mudar
slider.addEventListener("input", () => {
    const opacityValue = (slider.value / 100); // Pega o valor do slider
    box.style.opacity = opacityValue; // Define a opacidade no estilo inline
});