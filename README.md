Freelance Project Matching Platform

Overview

This project aims to develop an application that allows owners or freelacers to log in using their mobile number, upload their projects, and let programmers view these projects and submit proposals. Additionally, a third user role, the admin, is responsible for overseeing both owners and programmers. The admin must verify programmers' identities to ensure they are real individuals.

User Roles

The platform consists of three main user roles:

Owners:

Can create projects.

Can review, accept, or reject received proposals.

Freelancers:

Can submit proposals for projects.

Can create projects.

Admin:

Has full oversight of all users and , projects and proposals.

Verifies the identity of freelancers.

Binary Representation for Matching

Each project and programmer's skill set is represented as a binary vector. Each position in the vector represents a specific skill or attribute, where:

1 indicates the presence of a skill.

0 indicates the absence of a skill.

Matching Algorithm

Projects are labeled with required skills as binary vectors, and programmers have profiles containing their skills in the same format. The algorithm calculates the similarity between binary vectors of projects and freelancers using the cosine similarity method. Projects are then ranked for each programmer based on the similarity score. The highest-ranked projects are recommended to programmers, ensuring they see the most relevant opportunities.

Unique Features

This system differentiates itself from existing platforms with the following features:

Dark/Light Mode Toggle

Sorting: Projects can be sorted alphabetically or by creation date.

Filtering: Projects can be filtered by status (All, Open, Closed).

Intelligent Project Recommendations: Uses a binary attribute algorithm to suggest the most suitable projects to each programmer.

Tech Stack

Backend: Node.js

Database: MongoDB

Frontend: React, React Query, Tailwind CSS

Recommendation System: Binary representation attributes with cosine similarity

Project Workflow

Owners register and upload projects.

Freelancers register, verify their identity, and set up their skill profile.

The recommendation system matches projects with programmers based on skills.

Programmers submit proposals for suitable projects.

Employers review and accept/reject proposals.

The administrator oversees all interactions and verifies programmers' identities.

Installation & Setup

Clone the repository:

git clone https://github.com/your-repo.git
cd your-repo

Install backend dependencies:

cd backend
npm install

Install frontend dependencies:

cd frontend
npm install

Start the development servers:

cd backend
npm run dev

cd frontend
npm start

Contributing

Contributions are welcome! Please follow the standard Git workflow:

Fork the repository.

Create a new branch (feature-branch).

Commit your changes.

Push to your fork.

Submit a pull request.

License

This project is licensed under the MIT License.

Contact

For any questions or suggestions, please reach out via asal.razavi1381@gmail.com.
