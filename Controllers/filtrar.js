import { filtrarPorCategoria } from './global.js';

const btnn = document.getElementById('btnfil');
const resultadoContainer = document.getElementById('resultado');

function mostrarDatosGradualmente(resultados, index) {
  if (index >= resultados.length) {
    return;
  }

  const resultado = resultados[index];

  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.classList.add('card-image');
  image.src = resultado.imagen;

  const idElement = document.createElement('p');
  idElement.textContent = ``;

  const nombreElement = document.createElement('p');
  nombreElement.textContent = `Nombre: ${resultado.nombre}`;

  const descripElement = document.createElement('p');
  descripElement.textContent = `Descripcion: ${resultado.descipcion}`;

  const categoriaElement = document.createElement('p');
  categoriaElement.textContent = `Categoría: ${resultado.categoria}`;

  const precioElement = document.createElement('p');
  precioElement.textContent = `Precio: ${resultado.precio}`;

  const buttonElement = document.createElement("button");
  buttonElement.classList.add("card-button"); // Agrega la clase "card-button" para el estilo similar a Mercado Libre
  buttonElement.textContent = `Comprar`;
  buttonElement.id = "comprarButton"; // Agrega el ID "comprarButton" al botón

  
  card.appendChild(image);
  card.appendChild(idElement);
  card.appendChild(nombreElement);
  card.appendChild(descripElement);
  card.appendChild(categoriaElement);
  card.appendChild(precioElement);
  card.appendChild(buttonElement);
  
  resultadoContainer.appendChild(card);

  setTimeout(() => {
    mostrarDatosGradualmente(resultados, index + 1);
  }, 500); // Delay de medio segundo (ajusta esto según tus necesidades)
}

function filtrarDatos() {
  const categoriaInput = document.getElementById('categoria');
  const categoria = categoriaInput.value;

  filtrarPorCategoria(categoria)
    .then((resultados) => {
      resultadoContainer.innerHTML = '';

      mostrarDatosGradualmente(resultados, 0);
    });
}

window.addEventListener('DOMContentLoaded', () => {
  btnn.addEventListener('click', filtrarDatos);
});