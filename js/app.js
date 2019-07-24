import { API } from './api.js';
import * as UI from './interfaz.js';

UI.formularioBuscar.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //obtener datos del usuario
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;
            // el formulario esta vacio y muestra error
          if (artista === '' || cancion === '') {
              UI.divMensajes.innerHTML = 'Error.... todos los datos son obligatorios';
              UI.divMensajes.classList.add('error');
              setTimeout(() => {
                UI.divMensajes.innerHTML = '';
                UI.divMensajes.classList.remove('error');
              }, 3000);
          } else {
            // el formulario esta lleno y muestra la api
            const api = new API(artista, cancion);
            api.consultarAPI()
            .then(data => {
                if (data.respuesta.lyrics) {
                    // la cancion existe
                    const letra = data.respuesta.lyrics;
                    UI.divResultado.textContent = letra;
                } else {
                    // la cancion no existe
                    UI.divMensajes.innerHTML = 'Error.... la canción no existe prueba con otra busqueda';
                    UI.divMensajes.classList.add('error');
                    setTimeout(() => {
                      UI.divMensajes.innerHTML = '';
                      UI.divMensajes.classList.remove('error');
                      UI.formularioBuscar.reset();
                    }, 3000);
                }
            });
          }

});