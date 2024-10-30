<script type="module">
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBi78ryVirCe10Wa9INSs1WtSEDy3OS27o",
    authDomain: "codeservirreactapp.firebaseapp.com",
    projectId: "codeservirreactapp",
    storageBucket: "codeservirreactapp.appspot.com",
    messagingSenderId: "596886885380",
    appId: "1:596886885380:web:3e5cab84baf8816c5d1151"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("contact-form").addEventListener("submit", async function(event) {
        event.preventDefault();

        // Create form data object
        var formData = new FormData(this);
        var data = {};
        formData.forEach(function(value, key){
            data[key] = value;
        });

        console.log(data);

        try {
            // Add data to Firestore
            await addDoc(collection(db, "LearningcontactUs"), data);
            alert("Thankyou so much we will conect to you as seen as possible !");
        } catch (error) {
            console.error('Error adding document:', error);
            alert("There was an error sending your message. Please try again.");
        }
    });
});
</script>
