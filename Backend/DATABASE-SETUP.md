# Inkloom AI — MySQL Database Setup

These files are designed for the current Inkloom AI backend using Node.js, Express, `mysql2`, and the database name `inkloom_ai`.

## Files

- `schema.sql` — creates the database and the three tables used by the backend.
- `seed.sql` — inserts sample submissions and brand rules. It is safe to run more than once.
- `ERD.md` — explains the table relationships.

## 1. Start MySQL

Make sure your MySQL Server is running. Open MySQL Workbench or the MySQL command line.

## 2. Create the database and tables

Run the complete contents of `schema.sql`.

Command-line alternative from the folder containing these files:

```bash
mysql -u root -p < schema.sql
```

Enter your MySQL password when prompted.

## 3. Insert demo data

Run `seed.sql` after the schema has been created:

```bash
mysql -u root -p < seed.sql
```

## 4. Connect the backend

In the backend folder, create `.env` using `.env.example` as the template:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=inkloom_ai
CLIENT_ORIGIN=http://127.0.0.1:5500
```

Replace `YOUR_MYSQL_PASSWORD` with your actual local MySQL password. Do not share or commit `.env`.

## 5. Verify the database

Run these commands in MySQL:

```sql
USE inkloom_ai;
SHOW TABLES;
SELECT * FROM submissions;
SELECT * FROM brand_rules;
SELECT * FROM analyses;
```

You should see these tables: `submissions`, `brand_rules`, and `analyses`.

## 6. Start and check the backend

From the backend folder:

```bash
npm install
npm run dev
```

Open `http://localhost:5000/api/health`. A successful response confirms that the API can reach MySQL.

## Important notes

- Run `schema.sql` before `seed.sql`.
- The schema uses MySQL 8-compatible SQL and InnoDB foreign keys.
- `analyses.submission_id` becomes `NULL` if its submission is deleted, so analysis history is not deleted with the submission.
- The current backend's analysis is rule-based. The database stores its JSON result; it does not itself provide an AI model.
- Do not run a `DROP DATABASE` command unless you intentionally want to erase the project data.
