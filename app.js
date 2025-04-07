// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDybRyESfnDvtbrX1jqkRhXtzXLy7z-_po",
    authDomain: "roomexpensestracker.firebaseapp.com",
    databaseURL: "https://roomexpensestracker-default-rtdb.firebaseio.com",
    projectId: "roomexpensestracker",
    storageBucket: "roomexpensestracker.appspot.com",
    messagingSenderId: "893846473165",
    appId: "1:893846473165:web:492a47286ca8b01acb5c84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Add roommate
function addRoommate() {
    let name = document.getElementById("roommateName").value;
    if (name.trim() === "") return;
    
    const roommatesRef = ref(db, "roommates");
    push(roommatesRef, { name });
    document.getElementById("roommateName").value = "";
}

// Add expense
function addExpense() {
    let expenseName = document.getElementById("expenseName").value;
    let expenseAmount = document.getElementById("expenseAmount").value;
    if (expenseName.trim() === "" || expenseAmount.trim() === "") return;
    
    const expensesRef = ref(db, "expenses");
    push(expensesRef, { name: expenseName, amount: expenseAmount });
    document.getElementById("expenseName").value = "";
    document.getElementById("expenseAmount").value = "";
}

// Load roommates
function loadRoommates() {
    const roommatesRef = ref(db, "roommates");
    onValue(roommatesRef, (snapshot) => {
        const list = document.getElementById("roommateList");
        list.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            let li = document.createElement("li");
            li.textContent = childSnapshot.val().name;
            list.appendChild(li);
        });
    });
}

// Load expenses
function loadExpenses() {
    const expensesRef = ref(db, "expenses");
    onValue(expensesRef, (snapshot) => {
        const list = document.getElementById("expenseList");
        list.innerHTML = "";
        snapshot.forEach((childSnapshot) => {
            let li = document.createElement("li");
            li.textContent = `${childSnapshot.val().name}: ₹${childSnapshot.val().amount}`;
            list.appendChild(li);
        });
    });
}

// Load data on page load
document.addEventListener("DOMContentLoaded", () => {
    loadRoommates();
    loadExpenses();
});
