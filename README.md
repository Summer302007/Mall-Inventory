# Mall Inventory Management

This is a small web application to manage products in a shopping mall.  
It uses a **local fake REST API** powered by `json-server` and performs **CRUD operations** using `Fetch API`.

---

# Features

- Add new products
- Edit existing products
- Delete products
- Display product list in a table
- Handles errors gracefully

---

# Technologies Used

- HTML5 + CSS3
- JavaScript (ES6)
- JSON Server (fake API)
- Live Server (for testing frontend locally)

---

# Project Strucrure
```
interaccion_services/
├── mall_inventory.html      # Main HTML file
├── style.css                # Styling file
├── gestion_api.js           # JavaScript logic (CRUD)
└── inventory.json           # Fake backend data
```

---

# Requirements

- Node.js & npm installed  
- `json-server` installed globally:
```bash
sudo npm install -g json-server

