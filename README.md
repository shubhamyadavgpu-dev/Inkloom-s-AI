# ✦ Inkloom AI
### AI-Powered Brand Governance Workspace

Inkloom AI is a brand governance workspace designed to help teams maintain consistent brand communication, review content, manage brand guidelines, and identify potential brand-rule violations.

It provides a centralized platform for managing content submissions, checking brand compliance, and monitoring review activities.

---

## 🚀 Features

- **Dashboard:** View submission statistics, pending reviews, approvals, and brand rules.
- **Content Management:** Create, view, search, and manage content submissions.
- **Brand Library:** Store and manage brand guidelines and rules.
- **Content Analysis:** Check submitted content against defined brand rules.
- **Review Management:** Track submission statuses such as Pending, Review, Approved, and Revision.
- **Insights:** Monitor content review activities and submission statistics.
- **Team & Access:** Dedicated workspace section for team-related functionality.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Frontend structure |
| CSS3 | Styling and Glassmorphism UI |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | REST API development |
| MySQL | Database management |

## 📂 Project Structure

```text
Inkloom-AI/
│
├── frontend/
│   ├── index.html
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── dashboard.js
│   ├── submissions.js
│   ├── brandRules.js
│   ├── analysis.js
│   ├── errorHandler.js
│   ├── schema.sql
│   ├── package.json
│   └── .env.example
│
└── README.md
```

*Adjust the frontend filenames and folder structure if your repository uses different names.*

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd Inkloom-AI
```

### 2. Set Up the Database

- Start your MySQL Server.
- Open MySQL Workbench or the MySQL terminal.
- Execute the `backend/schema.sql` file.

Verify the database:

```sql
SHOW DATABASES;
USE inkloom_ai;
SHOW TABLES;
```

### 3. Configure the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=inkloom_ai

CLIENT_ORIGIN=http://127.0.0.1:5500
```

Replace the database password with your own MySQL password.

### 4. Start the Backend

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

### 5. Start the Frontend

Open the frontend's `index.html` using VS Code Live Server.

The frontend and backend communicate through REST APIs.

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Check API and database connection |
| GET | `/api/dashboard` | Retrieve dashboard statistics |
| GET | `/api/submissions` | Retrieve submissions |
| POST | `/api/submissions` | Create a submission |
| PATCH | `/api/submissions/:id/status` | Update submission status |
| DELETE | `/api/submissions/:id` | Delete a submission |
| GET | `/api/brand-rules` | Retrieve brand rules |
| POST | `/api/brand-rules` | Add a brand rule |
| POST | `/api/analyze` | Analyze content against brand rules |

## 🎨 UI Design

Inkloom AI uses a modern Glassmorphism-inspired interface with a purple color palette, translucent surfaces, subtle shadows, and interactive dashboard elements.

## 🔮 Future Enhancements

- AI-powered brand voice analysis.
- Advanced content suggestions and corrections.
- User authentication and role-based access control.
- Analysis history and detailed reporting.
- Team collaboration and approval workflows.

## 👨‍💻 Development Status

Inkloom AI is under active development. Features and functionality are being implemented and improved progressively.

## 📄 License

This project is currently developed for educational and hackathon purposes. A formal open-source license can be added when selected.
