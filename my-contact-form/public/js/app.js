// Função para fazer a rolagem suave até o topo da página
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.back-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

// Mostrar ou ocultar a seta conforme o usuário rola a página
window.addEventListener('scroll', function() {
    var backToTopButton = document.querySelector('.back-to-top');
    if (window.scrollY > 200) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

// Adicione aqui o código para o envio do formulário
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    fetch('/send-email', {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.redirected) {
            window.location.href = response.url; // Redireciona para a nova página
        }
    }).catch(error => {
        console.error('Erro:', error);
    });
});
