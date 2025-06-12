const customSwal = Swal.mixin({
    confirmButtonText: 'OK',
    confirmButtonColor: '#047400', // Cor do botão
    background: '#0D1117', // Cor de fundo do alerta
    color: '#ffffff', // Cor do texto
    customClass: {
      icon: 'custom-icon'
    }
});

export {customSwal};