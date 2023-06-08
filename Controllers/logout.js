import { logout } from "./global.js";

const btnCerrarSesion = document.getElementById('logout');

btnCerrarSesion.addEventListener('click', async () => {
  try {
    await logout();
    alert("Sesión cerrada correctamente.");
    window.location.href="../index.html";
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al cerrar la sesión.");
  }
});