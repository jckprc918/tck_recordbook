
// --- SDK & LIBRARY IMPORTS ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, onSnapshot, collection, getDocs, updateDoc, writeBatch, enableIndexedDbPersistence, query, where, addDoc, serverTimestamp, orderBy, limit, deleteDoc, startAfter, collectionGroup } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// --- FIREBASE CONFIG & INIT ---
const firebaseConfig = {
    apiKey: "AIzaSyBP4p26TLOqL9muN5JndpUZolaunzQgKC0",
    authDomain: "ie-entry.firebaseapp.com",
    projectId: "ie-entry",
    storageBucket: "ie-entry.appspot.com",
    messagingSenderId: "864058205761",
    appId: "1:864058205761:web:a70f7e3e20f0df3a8708c0",
    measurementId: "G-327XF816YG"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
try {
    enableIndexedDbPersistence(db).catch((err) => console.warn("Offline persistence failed.", err));
} catch (e) {
    console.error("Error enabling offline persistence: ", e);
}

// Screen navigation logic
document.addEventListener('DOMContentLoaded', () => {
    const screens = {
        'add-entry': document.getElementById('add-entry-screen'),
        'manage-entries': document.getElementById('manage-entries-screen'),
        'ai-scanner-upload': document.getElementById('ai-scanner-upload-screen'),
        'ai-scanner-review': document.getElementById('ai-scanner-review-screen'),
        'dashboard': document.getElementById('dashboard-screen'),
        'ai-scanner-source-select': document.getElementById('ai-scanner-source-select-screen'),
    };

    const buttons = {
        'add-entry': document.getElementById('add-entry-btn'),
        'manage-entries': document.getElementById('manage-entries-btn'),
        'dashboard': document.getElementById('dashboard-btn'),
        'journals': document.getElementById('journals-btn'),
    };

    function showScreen(screenId) {
        Object.values(screens).forEach(screen => {
            if (screen) screen.classList.add('hidden');
        });
        if (screens[screenId]) {
            screens[screenId].classList.remove('hidden');
        }
    }

    buttons['add-entry'].addEventListener('click', () => showScreen('add-entry'));
    buttons['manage-entries'].addEventListener('click', () => showScreen('manage-entries'));
    buttons['dashboard'].addEventListener('click', () => showScreen('dashboard'));

    // Default screen
    showScreen('add-entry');
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.getElementById('login-view').classList.add('hidden');
        document.getElementById('app-view').classList.remove('hidden');
    } else {
        document.getElementById('login-view').classList.remove('hidden');
        document.getElementById('app-view').classList.add('hidden');
    }
});

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(auth, email, password)
        .catch(error => {
            console.error('Error signing in:', error);
            document.getElementById('email-auth-error').textContent = 'Invalid credentials.';
        });
});
