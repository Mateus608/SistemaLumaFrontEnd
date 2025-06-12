import { customSwal } from "./alertCustom.js";

document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('fa-eye')) {
    const id = e.target.getAttribute('data-id');

    try {
      const res = await fetch(`http://127.0.0.1:4040/annotations/${id}`);
      if (!res.ok) throw new Error('Mensagem não encontrada');
      const msg = await res.json();

      const iconPath = getIconPath(msg.tipo);
      customSwal.fire({
        showConfirmButton: true,
        html: `
          <img src="${iconPath}" alt="ícone" class="custom-icon" />
          <h2>${msg.tipo}</h2>
          <p>${msg.message}</p>
        `,
        customClass: {
          popup: 'custom-swal',
          htmlContainer: 'custom-swal-html'
        }
      });
    } catch (err) {
      console.error(err);
      customSwal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível buscar a mensagem.'
      });
    }
  }
});

document.addEventListener('click', async function (e) {
  if (e.target.classList.contains('fa-trash')) {
    const id = e.target.getAttribute('data-id');

    const confirmDelete = await customSwal.fire({
      title: 'Tem certeza?',
      text: 'Essa mensagem será excluída permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      const res = await fetch(`http://127.0.0.1:4040/annotations/${id}`, {
        method: 'DELETE'
      });

      const result = await res.json();

      if (res.ok) {
        customSwal.fire({
          icon: 'success',
          title: 'Excluído!',
          text: result.message
        });

        // ✅ Recarrega as mensagens após exclusão
        await carregarMensagens();
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error(err);
      customSwal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Não foi possível excluir a mensagem.'
      });
    }
  }
});

  function truncarMensagem(mensagem) {
    return mensagem.length > 20 ? mensagem.substring(0, 20) + '...' : mensagem;
  }

  async function carregarMensagens() {
    try {
      const response = await fetch('http://127.0.0.1:4040/annotations');
      const mensagens = await response.json();
      const tbody = document.getElementById('mensagens-tbody');

      // Limpa o conteúdo anterior (opcional)
      tbody.innerHTML = '';

      mensagens.forEach(msg => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td id="td-btn">
            <i class="fa-solid fa-eye" style="cursor: pointer;" data-id="${msg.idmessage}"></i>
            <i class="fa-solid fa-trash" style="color:rgb(255, 40, 40); cursor: pointer;" data-id="${msg.idmessage}"></i>
          </td>
          <td id="td-msg">
            ${truncarMensagem(msg.message)}
          </td>
        `;

        // Criar um <tr> de cabeçalho separado para cada mensagem (como no seu thead)
        const headerTr = document.createElement('tr');
        headerTr.innerHTML = `
          <th colspan="2" id="header-table">
            <div id="div-header">
                <p id="p-userDate">${msg.userMessage.charAt(0).toUpperCase() + msg.userMessage.slice(1)} - ${msg.dateMessage}</p> ${msg.tipo}
            <div>
          </th>
        `;

        // Adiciona o cabeçalho e a mensagem na tabela
        tbody.appendChild(headerTr);
        tbody.appendChild(tr);
      });
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  }

  // Carrega ao iniciar
  window.onload = carregarMensagens;

  function getIconPath(tipo) {
  switch (tipo.toLowerCase()) {
    case 'viagens':
      return 'http://127.0.0.1:3000/icons/viagens.png';
    case 'planos':
      return 'http://127.0.0.1:3000/icons/planos.png';
    case 'conversas':
      return 'http://127.0.0.1:3000/icons/conversas.png';
    case 'recados':
      return 'http://127.0.0.1:3000/icons/text-message.png';
    case 'mensagens':
      return 'http://127.0.0.1:3000/icons/mensagens.png';
    default:
      return 'http://127.0.0.1:3000/icons/image.png';
  }
}