# Freelance Project Matching Platform

## 🚀 Overview
This project aims to develop an intelligent freelance platform where **owners** and **freelancers** can log in using their mobile number, upload projects, and allow programmers to view these projects and submit proposals. Additionally, an **admin** role is responsible for managing users and ensuring freelancer identity verification.

## 👥 User Roles
### 🔹 Owners
- Create and manage projects.
- Review, accept, or reject received proposals.

### 🔹 Freelancers
- Submit proposals for available projects.
- Create new projects.

### 🔹 Admin
- Has full oversight of users, projects, and proposals.
- Verifies the identity of freelancers to ensure authenticity.

---
## 📌 Intelligent Matching System
Each project and freelancer’s skill set is represented as a **binary vector**, where:
✅ `1` = Skill is present  
❌ `0` = Skill is absent  

### 🔍 Matching Algorithm
Projects and freelancers are labeled with skills as binary vectors. The system calculates similarity scores using the **cosine similarity method** to rank and recommend the most relevant projects for each freelancer. This ensures optimal project allocation.

---
## ✨ Unique Features
- 🌙 **Dark/Light Mode Toggle** for better user experience.
- 🔤 **Sorting** projects by alphabetical order or creation date.
- 🏷️ **Filtering** projects based on status (All, Open, Closed).
- 🤖 **AI-powered Project Recommendations** using a binary attribute matching algorithm.

---
## 🛠 Tech Stack
- **Backend:** Node.js
- **Database:** MongoDB
- **Frontend:** React, React Query, Tailwind CSS
- **Recommendation System:** Binary representation attributes with cosine similarity

---
## 🔄 Project Workflow
1️⃣ Owners register and upload projects.  
2️⃣ Freelancers register, verify their identity, and set up their skill profile.  
3️⃣ The **recommendation system** matches projects to freelancers based on skill similarity.  
4️⃣ Freelancers submit proposals for suitable projects.  
5️⃣ Owners review and **accept/reject proposals**.  
6️⃣ The **Admin oversees** the entire process and verifies freelancers' identities.  

---
## 💻 Installation & Setup
#### 🔹 Clone the repository:
```bash
git clone https://github.com/your-repo.git
cd your-repo
```
#### 🔹 Install backend dependencies:
```bash
cd backend
npm install
```
#### 🔹 Install frontend dependencies:
```bash
cd frontend
npm install
```
#### 🔹 Start the development servers:
```bash
cd backend
npm run dev
```
```bash
cd frontend
npm start
```

---
## 🤝 Contributing
We welcome contributions! Follow these steps:
1. **Fork** the repository.
2. Create a **new branch** (`feature-branch`).
3. **Commit** your changes.
4. **Push** to your fork.
5. Submit a **pull request**.

---
## 📜 License
This project is licensed under the **MIT License**.

---
## 📩 Contact
For any questions or suggestions, feel free to reach out:  
📧 **asal.razavi1381@gmail.com**
