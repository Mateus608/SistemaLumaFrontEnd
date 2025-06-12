const musicList = [
    "http://127.0.0.1:3000/music/all%20star.mp3",
    "http://127.0.0.1:3000/music/another%20song.mp3",
    "http://127.0.0.1:3000/music/yet%20another%20song.mp3"
  ];

  const audio = document.getElementById("background-music");
  let currentTrack = 0;

  function playNextTrack() {
    audio.src = musicList[currentTrack];
    audio.play().catch(err => console.error("Erro ao tocar música:", err));
  }

  // Avança para a próxima música quando a atual termina
  audio.addEventListener("ended", () => {
    currentTrack = (currentTrack + 1) % musicList.length;
    playNextTrack();
  });

  // Iniciar a primeira música (remova 'muted' se quiser ouvir)
  playNextTrack();

function soundEnable() {
  const audio = document.getElementById('background-music');
  audio.muted = false;
  audio.play();

  document.getElementById('sound').style.display = 'inline';
  document.getElementById('no-sound').style.display = 'none';

  // Atualiza o nome da música
  const title = getMusicName(audio.src);
  document.getElementById('music-title').textContent = `Tocando: ${title}`;
}

function soundDisable() {
  const audio = document.getElementById('background-music');
  audio.pause();
  audio.currentTime = 0;
  audio.muted = true;

  document.getElementById('sound').style.display = 'none';
  document.getElementById('no-sound').style.display = 'inline';

  document.getElementById('music-title').textContent = 'Nenhuma música tocando';
}

// Extrai o nome do arquivo da música a partir da URL
function getMusicName(url) {
  const path = url.split('/').pop();
  return decodeURIComponent(path.replace('.mp3', '').replace(/^\/+/, ''));
}