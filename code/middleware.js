// public/js/main.js

const token = localStorage.getItem('token');

if (!token) {
  // Sem token, redireciona para login
  window.location.href = '/login';
} else {
  // Com token, tenta acessar a página principal protegida
  fetch('/', {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
  .then(res => {
    if (res.redirected) {
      // Se for redirecionado, é porque o token falhou
      window.location.href = '/login';
    } else {
      return res.text(); // Recebe HTML
    }
  })
  .then(html => {
    if (html) {
      document.open();
      document.write(html);
      document.close();
    }
  })
  .catch(() => {
    // Falha geral, volta pro login
    window.location.href = '/login';
  });
}