let total = 0;
let history = [];

// Cargar datos guardados al iniciar
loadData();

document.getElementById("addButton").addEventListener("click", () => {
  const amount = parseInt(document.getElementById("amount").value);
  const itemName = document.getElementById("itemName").value.trim();
  const quantity = parseInt(document.getElementById("quantity").value) || 1; // Valor por defecto: 1

  if (isNaN(amount) || amount <= 0) {
    alert("Por favor, ingrese un monto válido.");
    return;
  }

  const totalAmount = amount * quantity;
  total += totalAmount;
  updateTotal();
  addToHistory(itemName, quantity, totalAmount);
  saveData();
  clearInputs();
});

function addToHistory(itemName, quantity, amount) {
  const entry = {
    itemName: itemName || "Sin nombre",
    quantity: quantity,
    amount: amount,
  };
  history.push(entry);
  updateHistory();
}

function updateHistory() {
  const historyElement = document.getElementById("history");
  historyElement.innerHTML = history
    .map(
      (entry, index) => `
        <div>
            <button onclick="removeEntry(${index})"><img src="./img/icons8-basura-llena.svg" width="24px"></button>
            <span>${entry.itemName}</span>
            <span class="quantity">x${entry.quantity}</span>
            <span class="amount positive">$${entry.amount.toLocaleString(
              "es-CL"
            )}</span>
        </div>
    `
    )
    .join("");
}

function removeEntry(index) {
  const entry = history[index];
  total -= entry.amount;
  history.splice(index, 1);
  updateTotal();
  updateHistory();
  saveData();
}

function updateTotal() {
  document.getElementById("totalAmount").textContent =
    total.toLocaleString("es-CL");
}

function clearInputs() {
  document.getElementById("itemName").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("amount").value = "";
}

function saveData() {
  localStorage.setItem("total", total);
  localStorage.setItem("history", JSON.stringify(history));
}

function loadData() {
  const savedTotal = localStorage.getItem("total");
  const savedHistory = localStorage.getItem("history");

  if (savedTotal) {
    total = parseInt(savedTotal);
    updateTotal();
  }

  if (savedHistory) {
    history = JSON.parse(savedHistory);
    updateHistory();
  }
}
document.getElementById("resetButton").addEventListener("click", () => {
  const confirmReset = confirm(
    "¿Estás seguro de que quieres reiniciar la tabla? Esto borrará todos los datos."
  );
  if (confirmReset) {
    total = 0;
    updateTotal();
    history = [];
    updateHistory(); // Esto ocultará el historial, el botón y el total automáticamente
    localStorage.removeItem("total");
    localStorage.removeItem("history");
  }
});

function updateHistory() {
  const historyElement = document.getElementById("history");

  // Mostrar el historial si hay al menos un dato
  if (history.length > 0) {
    historyElement.style.display = "block"; // Mostrar el historial
  } else {
    historyElement.style.display = "none"; // Ocultar el historial si está vacío
  }

  // Actualizar el contenido del historial
  historyElement.innerHTML = history
    .map(
      (entry, index) => `
        <div>
            <button onclick="removeEntry(${index})"><img src="./img/icons8-basura-llena.svg" width="24px"></button>
            <span>${entry.itemName}</span>
            <span class="quantity">x${entry.quantity}</span>
            <span class="amount positive">$${entry.amount.toLocaleString(
              "es-CL"
            )}</span>
        </div>
    `
    )
    .join("");
}

function updateHistory() {
  const historyElement = document.getElementById("history");
  const resetButton = document.getElementById("resetButton");
  const totalElement = document.querySelector(".total");

  // Mostrar u ocultar el historial, el botón de reiniciar y el total
  if (history.length > 0) {
    historyElement.style.display = "block"; // Mostrar el historial
    resetButton.style.display = "inline-block"; // Mostrar el botón de reiniciar
    totalElement.style.display = "block"; // Mostrar el total
  } else {
    historyElement.style.display = "none"; // Ocultar el historial
    resetButton.style.display = "none"; // Ocultar el botón de reiniciar
    totalElement.style.display = "none"; // Ocultar el total
  }

  // Actualizar el contenido del historial
  historyElement.innerHTML = history
    .map(
      (entry, index) => `
        <div>
            <button onclick="removeEntry(${index})"><img src="./img/icons8-basura-llena.svg" width="24px"></button>
            <span>${entry.itemName}</span>
            <span class="quantity">x${entry.quantity}</span>
            <span class="amount positive">$${entry.amount.toLocaleString(
              "es-CL"
            )}</span>
        </div>
    `
    )
    .join("");
}
