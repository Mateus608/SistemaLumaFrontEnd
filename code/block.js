window.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = '/';

    const response = await fetch('https://sistemalumabackend.onrender.com/validate', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) {
      localStorage.removeItem('token');
      window.location.href = '/'; // volta pro login
    }
  });