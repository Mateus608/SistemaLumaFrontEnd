const dataInicial = new Date("2025-04-26T00:00:00");

function atualizarContador() {
    const agora = new Date();
    let diff = agora - dataInicial;

    if (diff <= 0) {
        document.getElementById("counter").textContent = "Ainda não começou!";
        return;
    }

    let totalSegundos = Math.floor(diff / 1000);

    const anos = Math.floor(totalSegundos / (365.25 * 24 * 60 * 60));
    totalSegundos -= anos * 365.25 * 24 * 60 * 60;

    const dias = Math.floor(totalSegundos / (24 * 60 * 60));
    totalSegundos -= dias * 24 * 60 * 60;

    const horas = Math.floor(totalSegundos / 3600);
    totalSegundos -= horas * 3600;

    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;

    document.getElementById("counter").textContent =
        `${anos} ano(s), ${dias} dia(s), ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

atualizarContador(); // chamada inicial
setInterval(atualizarContador, 1000); // atualiza a cada segundo