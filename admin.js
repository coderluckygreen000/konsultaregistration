// admin.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPjh1bUNs1br4ajemDmdsQ8Dqaw0_9z6E",
  authDomain: "konsulta-registration.firebaseapp.com",
  projectId: "konsulta-registration",
  storageBucket: "konsulta-registration.firebasestorage.app",
  messagingSenderId: "229307370338",
  appId: "1:229307370338:web:9626221e7f280e1035ba3b",
  measurementId: "G-3XT06BPGF5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Load data from Firestore
async function loadData() {
  const table = document.getElementById("dataTable");
  table.innerHTML = ""; // Clear previous data

  const snapshot = await getDocs(collection(db, "registrations"));

  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${data.philhealthId}</td>
      <td>${data.lastName}, ${data.firstName}</td>
      <td>${data.dob}</td>
      <td>${data.clientType}</td>
      <td>${data.email || ""}</td>
      <td class="action-column">
        <button class="send-confirm-btn" data-id="${docSnap.id}">Send Confirmation</button>
        <button class="delete-btn" data-id="${docSnap.id}">Delete</button>
      </td>
    `;

    table.appendChild(row);
  });

  // Attach delete event listeners
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      if (confirm("Are you sure you want to delete this entry?")) {
        await deleteDoc(doc(db, "registrations", id));
        loadData(); // Refresh table after deletion
      }
    });
  });

  // Attach send confirmation event listeners
  document.querySelectorAll(".send-confirm-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      // Find user data by id from snapshot docs
      const userDoc = snapshot.docs.find(doc => doc.id === id);
      if (userDoc) {
        const user = userDoc.data();
        const email = user.email;
        if (!email) {
          alert("No email found for this user.");
          return;
        }
        const fullName = `${user.lastName}, ${user.firstName}`;
        const philhealthId = user.philhealthId;

const subject = encodeURIComponent("Konsulta Registration Confirmation");

const body = encodeURIComponent(
  `Good day ${fullName},\n\n` +
  `We are pleased to inform you that your PhilHealth ID: ${philhealthId} has been successfully registered.\n\n` +
  `You are now officially registered with Shalom Laboratory for the Konsulta Program.\n\n` +
  `If you have any inquiries, feel free to email us at: shalomla.website@gmail.com\n\n` +
  `Thank you and stay healthy!\n\n` +
  `Best regards,\n` +
  `Shalom Laboratory Team`
);



        // Open default mail client with prefilled email
        window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
      } else {
        alert("User data not found.");
      }
    });
  });
}



















// Live search (in case HTML search fails)
document.getElementById("searchInput").addEventListener("input", function () {
  const filter = this.value.toLowerCase();
  const rows = document.querySelectorAll("#dataTable tr");
  rows.forEach(row => {
    const text = row.textContent.toLowerCase();
    row.style.display = text.includes(filter) ? "" : "none";
  });
});

// Initial load
loadData();
