📇 Contact Management Web App (MERN)

A simple Contact Management System built to demonstrate MERN stack fundamentals.
Users can create, view, and delete contacts with proper validation and real-time UI updates — no page reloads.

🚀 Tech Stack
Frontend

React.js
Axios
Tailwind CSS
useState (state management)

Backend
Node.js
Express.js
MongoDB

✨ Features

➕ Create a new contact
📋 View all contacts
❌ Delete a contact
📱 Responsive UI
⚡ No page reloads

🧾 Contact Fields
Field	Required	Validation
Name	✅ Yes	Required
Email	❌ No	Must be valid email format
Phone	✅ Yes	Required
Message	❌ No	Optional

📂 Project Structure
ContactManagement/
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── routes/
│   │   │   └── contactRoutes.js
│   │   └── models/
│   │       └── Contact.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   └── config.js
│   └── package.json

▶️ How to Run the Project

1️⃣ Backend Setup
cd backend
npm install
Create .env file:

PORT=3000
MONGO_URI=mongodb://localhost:27017/contactdb

Run backend:
npm run dev

2️⃣ Frontend Setup
cd frontend
npm install
npm start

📌 Error Handling

Backend sends meaningful error messages
Frontend reads error via:
error.response?.data?.message

❌ What Is NOT Included
❌ Authentication / Login
❌ Advanced state management (Redux, Context)

