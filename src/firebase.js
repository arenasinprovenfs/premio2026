import { initializeApp } from "firebase/app"; 
import { getFirestore } from "firebase/firestore"; 
const firebaseConfig = { apiKey: "AIzaSyCBYv9AXSo4RxIdGNYnJp0irBqk42uic4Y", authDomain: "arena-sinprovenfs.firebaseapp.com", projectId: "arena-sinprovenfs", storageBucket: "arena-sinprovenfs.firebasestorage.app", messagingSenderId: "491408021011", appId: "1:491408021011:web:48b7f9536f6acadd07d1e6" }; 
const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app); 
