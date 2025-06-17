# Interview Prep AI 🎯

AI-powered platform to help users practice for technical interviews. It offers real-time Q&A sessions, topic-based interview preparation, and personalized experiences using Google Generative AI.

---

## 🧠 Features

- ✍️ Interactive interview sessions powered by GenAI  
- 📚 Topic-focused interview preparation  
- 🧩 Syntax-highlighted markdown for code questions  
- 🎥 Animated and responsive UI with Framer Motion  
- 🔐 JWT-based user authentication  
- 📁 Profile picture upload (Multer)  
- 🌐 Fully RESTful backend API with Express + MongoDB  

---

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM 7
- Tailwind CSS 4
- Framer Motion
- React Icons, Lucide React
- React Markdown & Syntax Highlighter
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT (Authentication)
- Multer (Image Uploads)
- Google GenAI SDK (`@google/genai`)
- Dotenv for environment variables

---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- MongoDB Atlas or local MongoDB instance
- Google GenAI API Key

---

### 🔧 Installation

```bash
# Clone the repo
git clone https://github.com/Vijay-Keshvala/Interview-prep-ai.git
cd Interview-prep-ai


📦 Setup Frontend
bash
Copy
Edit
cd client
npm install
npm run dev
🛠️ Setup Backend
bash
Copy
Edit
cd backend
npm install
# Create a .env file in /backend
npm run dev
.env Example
env
Copy
Edit
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/interviewPrep
JWT_SECRET=your_jwt_secret
GOOGLE_API_KEY=your_genai_key
📁 Folder Structure
bash
Copy
Edit
Interview-prep-ai/
│
├── client/               # React Frontend
│   ├── components/
│   ├── pages/
│   └── utils/
│
├── backend/              # Node.js Backend
│   ├── routes/
│   ├── models/
│   └── controllers/
✨ Acknowledgements
Google Generative AI SDK

Tailwind CSS

Framer Motion

React Markdown

📜 License
This project is licensed under the MIT License.

👤 Author
Vijay Keshvala
GitHub • LinkedIn

yaml
Copy
Edit

---

Let me know if you want to add badges (e.g., "Made with React", "Build Passing") or an animated project preview section at the top!