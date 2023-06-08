import { adduser, readprod, readuser } from "./global.js";

const formulario = document.getElementById('regusers') 
const btn = document.getElementById('btnsearch')
const visualizar = document.getElementById('container1')

formulario.addEventListener('submit',(e)=>{
    e.preventDefault()

    const cc = formulario['cedula']
    const primer = formulario['fname']
    const segundo = formulario['lname']
    const tel = formulario['phone']
    const img = formulario['response']

    adduser(
        cc.value,
        primer.value,
        segundo.value,
        tel.value,
        img.value)

        alert('Usuario '+cc.value+' registrado')
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
                <img src="${docSnap.data().image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${docSnap.data().fisrt} ${docSnap.data().last}</h5>
                    <p class="card-text">${docSnap.data().id}</p>
                    <p class="card-text">${docSnap.data().phone}</p>
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
