let container = document.getElementsByClassName("container")[0];
let itemName = document.getElementById("item-name");
let itemAmount = document.getElementById("item-amount");
let addBtn = document.getElementById("add");
let removeBtn = document.getElementById("remove");
let errorMsg = document.getElementsByClassName("error")[0];
let totalAmount = 0;
let totalAmountDisplay = document.createElement("p")


addBtn.addEventListener("click", () => {
    addItem();
});

window.addEventListener("keydown", function (e) {
    if (e.key === 'Enter') {
        addItem();
    }
});

removeBtn.addEventListener("click", () => {
    removeItem();
});

function addItem() {
    let itemAmountVal = parseFloat(itemAmount.value);
    let itemNameVal = itemName.value;
    if (itemNameVal === "" || isNaN(itemAmountVal)) {
        errorMsg.style.display = "block";
    } else {
        let itemShow = document.createElement('p');
        itemShow.classList.add("added-item");
        itemShow.innerText = itemNameVal + " : " + itemAmountVal;
        container.appendChild(itemShow);

        if (totalAmountDisplay) {
            totalAmountDisplay.remove();
        }

        totalAmountDisplay.classList.add("total-amount");
        totalAmount = totalAmount + itemAmountVal;
        totalAmountDisplay.textContent = "Total Amount: " + totalAmount.toFixed(2);
        container.appendChild(totalAmountDisplay);

        itemName.value = "";
        itemAmount.value = "";
        errorMsg.style.display = "none";
        saveData();
    }
}

function removeItem() {
    let addedItems = document.querySelectorAll(".added-item");
    addedItems.forEach(item => item.remove());
    totalAmount = 0;
    totalAmountDisplay.textContent = "Total Amount: " + totalAmount.toFixed(2);
    errorMsg.style.display = "none";
    itemName.value = "";
    itemAmount.value = "";
    saveData();
}

function saveData() {
    let items = [];
    document.querySelectorAll(".added-item").forEach(item => {
        items.push(item.innerText);
    });
    localStorage.setItem("items", JSON.stringify(items));
    localStorage.setItem("totalAmount", totalAmount);
}

function showData() {
    let savedItems = JSON.parse(localStorage.getItem("items"));
    if (savedItems) {
        savedItems.forEach(itemText => {
            let itemShow = document.createElement('p');
            itemShow.classList.add("added-item");
            itemShow.innerText = itemText;
            container.appendChild(itemShow);
        });
    }
    totalAmount = parseFloat(localStorage.getItem("totalAmount")) || 0;
    totalAmountDisplay.textContent = "Total Amount: " + totalAmount.toFixed(2);
    container.appendChild(totalAmountDisplay);
}

// Load data when the page loads
window.onload = showData;