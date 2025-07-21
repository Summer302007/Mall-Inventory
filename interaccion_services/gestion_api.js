const URL_INVENTORY = "http://localhost:3000/varietyProducts";

// Function to load and display products
function loadProducts() {
  fetch(URL_INVENTORY)
    .then(response => response.json())
    .then(data => {
      console.log("The products available are:", data);
      const productList = document.getElementById("inventoryTable");
      productList.innerHTML = ""; // Clear the table before displaying

      data.forEach(product => {
        // Create a new row for each product
        const row = document.createElement("tr");
        // Fill the row with product details
        row.innerHTML = `
          <td>${product.name}</td>
          <td>$${product.price}</td>
        `;
        productList.appendChild(row);
      });
    })
    .catch(error => console.error("Error loading products:", error));
}

loadProducts(); // Initial load

// Event listener for adding a new product
const addForm = document.getElementById("Adding");
addForm.addEventListener("submit", async (Event) => {
  Event.preventDefault();

  const name = document.getElementById("addName").value;
  const price = parseFloat(document.getElementById("addPrice").value);

  if (!name || isNaN(price)) {
    alert("Please enter a valid product name and price.");
    return;
  }

  const product = { name, price };

  try {
    // Send a POST request to add the new product
    const response = await fetch(URL_INVENTORY, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });

    if (response.ok) {
      alert("Product added successfully!");
      addForm.reset();
      loadProducts();
    } else {
      alert("Failed to add product.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while adding the product.");
  }
});

// Event listener for editing a product
const editForm = document.getElementById("edit");
editForm.addEventListener("submit", async (Event) => {
  Event.preventDefault();

  const name = document.getElementById("editName").value;
  const price = parseFloat(document.getElementById("editPrice").value);

  if (!name || isNaN(price)) {
    alert("Please enter a valid product name and price.");
    return;
  }

  try {
    const response = await fetch(URL_INVENTORY);
    const products = await response.json();
    const productToEdit = products.find(product => product.name === name);

    if (productToEdit) {
      const putResponse = await fetch(`${URL_INVENTORY}/${productToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price })
      });

      if (putResponse.ok) {
        alert("Product updated successfully!");
        editForm.reset();
        loadProducts();
      } else {
        alert("Failed to update product.");
      }
    } else {
      alert("Product not found.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while updating the product.");
  }
});

// Event listener for deleting a product
const deleteForm = document.getElementById("delete");
deleteForm.addEventListener("submit", async (Event) => {
  Event.preventDefault();

  const name = document.getElementById("deleteName").value;

  if (!name) {
    alert("Please enter the product name to delete.");
    return;
  }

  try {
    const response = await fetch(URL_INVENTORY);
    const products = await response.json();
    // Find the product to delete
    const productToDelete = products.find(product => product.name === name);

    if (productToDelete) {
      const deleteResponse = await fetch(`${URL_INVENTORY}/${productToDelete.id}`, {
        method: "DELETE"
      });

      if (deleteResponse.ok) {
        alert("Product deleted successfully!");
        deleteForm.reset();
        loadProducts();
      } else {
        alert("Failed to delete product.");
      }
    } else {
      alert("Product not found.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while deleting the product.");
  }
});


