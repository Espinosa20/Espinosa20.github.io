import {loginvalidation,adduser,Usercreate,loginWithGoogle,checkAdminAccess,getProducts, state2 } from "./global.js"

const btnvalidar = document.getElementById('loginbtn');
const btnregistar = document.getElementById('registerbtn');
const btngugul=document.getElementById('ingugul');
const btnlogin2=document.getElementById('loginbtn2');

function validarContrasena(contrasena){
  const condicion = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{14,}$/;
  return condicion.test(contrasena);
}
async function LoginInit(){

    const user = document.getElementById('emailuser').value
    const pws = document.getElementById('pwsuser').value

    const sesion = loginvalidation(user,pws)
    const confirmation = await sesion

    .then((userCredential) => {
        // Signed in 
        checkAdminAccess()
        alert("El usuario : "+user+" ingreso exitoso")
        window.location.href="../Templates/inicio.html"
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("The user : "+user+" no validation " + errorMessage)
      });
      
}
async function LoginInit2(){

  const user = document.getElementById('remailuser').value
  const pws = document.getElementById('rpwsuser').value

  const sesion = loginvalidation(user,pws)
  const confirmation = await sesion

  .then((userCredential) => {
      // Signed in 
      alert("El usuario : "+user+" ingreso exitoso")
      window.location.href="../Templates/vistaregistrada.html"
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("The user : "+user+" no validation " + errorMessage)
    });
    
}
async function goog(){
  await loginWithGoogle()
}
async function ingdatos(){
    const userr = document.getElementById('remailuser').value;
    const contra= document.getElementById('rpwsuser').value;
    const cedula = document.getElementById('cuser')
    const primer = document.getElementById('rname')
    const segundo = document.getElementById('rlastn')
    const tel = document.getElementById('tuser')
    if (validarContrasena(contra)) {
        try {
          const userCredential = await Usercreate(userr, contra);
          const registeredUser = userCredential.user;
          
          
          console.log(registeredUser);

          adduser(
            cedula.value,
            userr,
            primer.value,
            segundo.value,
            tel.value)
    
            alert('Usuario '+primer.value+' registrado');
          
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          alert(errorMessage);
}}else{alert("La contraseña debe tener al menos 14 caracteres, una mayúscula, un número y un carácter especial");}
}
window.addEventListener('DOMContentLoaded',async()=>{
    btngugul.addEventListener('click',goog)
    btnregistar.addEventListener('click',ingdatos)
    btnvalidar.addEventListener('click',LoginInit)
    btnlogin2.addEventListener('click',LoginInit2)
})
function mostrarProductos(productos) {
  const resultadoContainer = document.getElementById("resultado");
 
  resultadoContainer.innerHTML = "";

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("ml-card"); // Agrega la clase "ml-card" para el estilo similar a Mercado Libre

    const image = document.createElement("img");
    image.classList.add("card-image");
    image.src = producto.imagen;

    const idElement = document.createElement("p");
    idElement.textContent = ``;

    const nombreElement = document.createElement("p");
    nombreElement.classList.add("card-title"); // Agrega la clase "card-title" para el estilo similar a Mercado Libre
    nombreElement.textContent = producto.nombre;

    const descripElement = document.createElement("p");
    descripElement.classList.add("card-description"); // Agrega la clase "card-description" para el estilo similar a Mercado Libre
    descripElement.textContent = producto.descripcion;

    const categoriaElement = document.createElement("p");
    categoriaElement.textContent = `Categoría: ${producto.categoria}`;

    const precioElement = document.createElement("p");
    precioElement.classList.add("card-price"); // Agrega la clase "card-price" para el estilo similar a Mercado Libre
    precioElement.textContent = `$ ${producto.precio}`;

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
    buttonElement.addEventListener("click", function() {
      state2();
    });
    resultadoContainer.appendChild(card);
  });
}


// Evento que se dispara al cargar la página
window.addEventListener("DOMContentLoaded", async () => {
  // Obtén los productos y muéstralos en el HTML
  const productos = await getProducts();
  mostrarProductos(productos);
});