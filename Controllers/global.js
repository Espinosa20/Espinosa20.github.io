import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider, 
    signInWithPopup
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc,query, where } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyDQ5jV8yQbKb6joKH8MczzVpoc94ym6vKM",
  authDomain: "primero-352614.firebaseapp.com",
  projectId: "primero-352614",
  storageBucket: "primero-352614.appspot.com",
  messagingSenderId: "246852451100",
  appId: "1:246852451100:web:68fef6fb5483737b6e98d9"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const loginvalidation=(email,password)=>signInWithEmailAndPassword(auth, email, password);
export const Usercreate=(email, password)=>createUserWithEmailAndPassword(auth, email, password);

export const logout=()=>signOut(auth);
export function state2(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("registrado");
      window.location.href="../Templates/carrito.html"
    } else {
      // User is signed out
      // ...
      
      console.log("no registrado");
      window.location.href="../Templates/registro.html"
    }
  });
}
export function state(){
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log("registrado");
    } else {
      // User is signed out
      // ...
      
      console.log("no registrado");
      window.location.href="../index.html"
    }
  });
}
export const adduser=(cedula,correo,nombre,apellido,celular)=>
  setDoc(doc(db, "usuarios", cedula),{
    cedula,
    correo,
    nombre,
    apellido,
    celular
  });
  export const addprod=(id,nombre,descipcion,categoria,precio,imagen)=>
  setDoc(doc(db, "productos", id),{
    id,
    nombre,
    descipcion,
    categoria,
    precio,
    imagen
  });
  export const readprod=(id)=>
  getDoc(doc(db, "productos", id));

  export async function filtrarPorCategoria(categoria) {
    try {
      // Obtiene una referencia a la colección que deseas consultar
      const db = getFirestore();
      const collectionRef = collection(db, 'productos');
  
      // Realiza la consulta para filtrar por una categoría específica
      const q = query(collectionRef, where('categoria', '==', categoria));
  
      const querySnapshot = await getDocs(q);
  
      // Aquí obtienes los datos filtrados
      const resultados = querySnapshot.docs.map((doc) => doc.data());
  
      return resultados;
    } catch (error) {
      console.log('Error al obtener los datos:', error);
      return [];
    }
  }
  
export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  //return signInWithPopup(auth, provider);
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    alert("Sesión iniciada correctamente con Google.");
    window.location.href="../Templates/vistaregistrada.html";
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
};

export function checkAdminAccess() {
  onAuthStateChanged(auth, (user) => {
    let isAdmin = false; // Variable para verificar si el usuario es administrador

    if (user) {
      // Verificar el correo electrónico del usuario
      if (user.email === 'admin@admin.com') {
        isAdmin = true;
      }
    }

    // Redireccionar según el estado del usuario
    if (isAdmin) {
      window.location.href = '../Templates/inicio.html';
    } else {
      window.location.href = '../Templates/vistaregistrada.html';
    }
  });
}

// Función para obtener los productos desde la base de datos
export async function getProducts() {
  const db = getFirestore();
  const productosRef = collection(db, "productos");
  const productosSnapshot = await getDocs(productosRef);

  const productos = [];
  productosSnapshot.forEach((doc) => {
    productos.push(doc.data());
  });

  return productos;
}
