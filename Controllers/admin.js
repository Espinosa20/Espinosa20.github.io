import { addprod, readprod, state } from "./global.js";
state();
const btnaddprod=document.getElementById('inprod');
const formulario = document.getElementById('regusers') 
const btn = document.getElementById('btnsearch')
const visualizar = document.getElementById('container1')
formulario.addEventListener('submit',(e)=>{
    e.preventDefault()

    const id = formulario['idprod']
    const nombre = formulario['nprod']
    const descripcion = formulario['dprod']
    const categoria = formulario['cprod']
    const precio = formulario['pprod']
    const imagen = formulario['response']
    addprod(
        id.value,
        nombre.value,
        descripcion.value,
        categoria.value,
        precio.value,
        imagen.value)

        alert('Producto '+nombre.value+' registrado')
})
async function getdetails(){
    const ced= document.getElementById('edtid').value

    const docRef = readprod(ced)
    const docSnap = await docRef

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        let html=""
        html=`
            <div class="card" style="width: 18rem;">
                <img src="${docSnap.data().imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${docSnap.data().id} ${docSnap.data().nombre}</h5>
                    <p class="card-text">${docSnap.data().descipcion}</p>
                    <p class="card-text">${docSnap.data().categoria}</p>
                    <p class="card-text">${docSnap.data().precio}</p>
                </div>
            </div>
        `
        visualizar.innerHTML=html
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}
window.addEventListener('DOMContentLoaded',async()=>{
    btn.addEventListener('click',getdetails)
})