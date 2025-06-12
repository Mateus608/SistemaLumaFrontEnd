document.querySelector('.save-btn').addEventListener('click', async function () {
    const notas = document.getElementById('notas').value;
    if (!notas) {
        alert('Escreva uma mensagem!')
        return;
    }

    let tipo = document.querySelector('input[name="opcao"]:checked');
    if (!tipo) {
        alert('Selecione o tipo da mensagem!')
        return;
    } else {
        tipo = document.querySelector('input[name="opcao"]:checked').value;
    }

    const el = document.getElementById("usuario");
    const usuario = JSON.parse(el.dataset.usuario);

    let dataAtual = new Date();

    let dia = String(dataAtual.getDate()).padStart(2, '0');
    let mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    let ano = dataAtual.getFullYear();

    let dataFormatada = `${dia}/${mes}/${ano}`;

    try {
        // Envia os dados para o servidor
        const response = await fetch('https://sistemalumabackend.onrender.com/message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    notas: notas,
                    tipo: tipo,
                    dataFormatada: dataFormatada,
                    usuario: usuario
                }
            )
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            alert('Anotações salvas! 💖');
            clear();
        } else {
            const errorData = await response.json();
            alert('Erro ao salvar nota: ' + errorData.error);
        }
    } catch (error) {
        console.error('Erro na requisição:', err);
        alert('Erro ao salvar nota. Tente novamente.');
    }

});

function clear() {
    document.getElementById('notas').value = '';
    document.querySelectorAll('input[name="opcao"]').forEach(input => {
        input.checked = false;
    });
}