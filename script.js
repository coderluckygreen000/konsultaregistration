// Import Firebase SDK with correct version
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 🔸 Your Firebase Project Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPjh1bUNs1br4ajemDmdsQ8Dqaw0_9z6E",
  authDomain: "konsulta-registration.firebaseapp.com",
  projectId: "konsulta-registration",
  storageBucket: "konsulta-registration.firebasestorage.app",
  messagingSenderId: "229307370338",
  appId: "1:229307370338:web:9626221e7f280e1035ba3b",
  measurementId: "G-3XT06BPGF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle form submission
document.getElementById("registrationForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await addDoc(collection(db, "konsultaRegistrations"), {
      philhealthId: document.getElementById("philhealthId").value,
      lastName: document.getElementById("lastName").value,
      firstName: document.getElementById("firstName").value,
      middleName: document.getElementById("middleName").value,
      dob: document.getElementById("dob").value,
      clientType: document.getElementById("clientType").value,
      email: document.getElementById("email").value, // ✅ Add this line
      timestamp: new Date()
    });

    alert("✅ Registration successful! Data saved in Firestore.");
    document.getElementById("registrationForm").reset();
  } catch (error) {
    console.error("❌ Error saving data:", error);
    alert("⚠️ Failed to save registration. Please try again.");
  }
});
