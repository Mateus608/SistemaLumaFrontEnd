const carousel = document.getElementById('carousel');
const imgs = Array.from(carousel.querySelectorAll('img'));
const total = imgs.length;

let currentIndex = 0;

function atualizarCarrossel() {
  imgs.forEach((img, i) => {
    img.classList.remove('active', 'visible');
    img.style.order = 0;
  });

  // Ativo
  const ativo = imgs[currentIndex];
  ativo.classList.add('active', 'visible');
  ativo.style.order = 0;

  // Próximo
  const nextIndex = (currentIndex + 1) % total;
  imgs[nextIndex].classList.add('visible');
  imgs[nextIndex].style.order = 1;

  // Anterior
  const prevIndex = (currentIndex - 1 + total) % total;
  imgs[prevIndex].classList.add('visible');
  imgs[prevIndex].style.order = -1;
}

function proximo() {
  currentIndex = (currentIndex + 1) % total;
  atualizarCarrossel();
}

function anterior() {
  currentIndex = (currentIndex - 1 + total) % total;
  atualizarCarrossel();
}

// Inicializa
atualizarCarrossel();


// Controle botões
document.getElementById('nextBtn').onclick = proximo;
document.getElementById('prevBtn').onclick = anterior;

// Autoplay a cada 5s
setInterval(proximo, 5000);

// Anotações persistidas localStorage
const textarea = document.getElementById('notas');
window.onload = () => {
    atualizarCarrossel();
};

function abrirPainel() {
  document.getElementById('painel').classList.add('aberto');
}

function fecharPainel() {
  document.getElementById('painel').classList.remove('aberto');
}

function annotations() {
  window.location.href = 'http://127.0.0.1:3000/annotations';
}

document.getElementById('btn-sair').addEventListener('click', async () => {
                try {
                    const response = await fetch('http://127.0.0.1:4040/logout', {
                        method: 'POST',
                        credentials: 'include' // enviar o cookie
                    });

                    const result = await response.json();

                    if (result.success) {
                        window.location.href = '/'; // redireciona para login
                    } else {
                        alert('Erro ao fazer logout');
                    }
                } catch (error) {
                    console.error('Erro no logout:', error);
                    alert('Erro na conexão. Tente novamente.');
                }
            });