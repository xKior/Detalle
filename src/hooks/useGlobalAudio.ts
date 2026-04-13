import { useEffect, useState } from 'react';

let globalAudio: HTMLAudioElement | null = null;

export const useGlobalAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Crear la instancia global solo una vez
    if (!globalAudio) {
      globalAudio = new Audio('/AlgoQueSeQuede.mp3');
      globalAudio.loop = true;
      globalAudio.volume = 0.5;

      // Restaurar tiempo guardado
      const savedTime = localStorage.getItem('audioTime');
      if (savedTime) {
        globalAudio.currentTime = parseFloat(savedTime);
      }

      // Intentar autoplay
      globalAudio.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });

      // Guardar tiempo periódicamente
      const interval = setInterval(() => {
        if (globalAudio) {
          localStorage.setItem('audioTime', globalAudio.currentTime.toString());
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, []);

  const toggleAudio = () => {
    if (globalAudio) {
      if (globalAudio.paused) {
        globalAudio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      } else {
        globalAudio.pause();
        setIsPlaying(false);
      }
    }
  };

  return { isPlaying, toggleAudio };
};

export const stopGlobalAudio = () => {
  if (globalAudio) {
    localStorage.setItem('audioTime', globalAudio.currentTime.toString());
    globalAudio.pause();
  }
};
