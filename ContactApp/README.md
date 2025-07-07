React Contact Management App

A simple Contact Management System built using **React**, **Material UI**,**React Query**,**Zustand** and **React hook form**. It supports CRUD operations, search, favorites filtering, and pagination.

## 🚀 Features
- 📄 View a paginated list of contacts.
- 🔍 Search contacts by name.
- ⭐ Mark/unmark contacts as favorites.
- ✏️ Edit and delete contacts.
- ➕ Add new contacts.
- ☑️ Filter by favorites.
- 💾 Backend mock with JSON Server.


## 📦 Installation
1. **Clone the repository**
git clone https://github.com/techsachin95/ContactApp.git

2. **Move to the Root project Directory**
cd ContactApp

3. **Install Npm Package into Root Project Directory**
npm install

4. **Run The Project From Root Directory**
npm run dev  --(this will run front end)

5. **Run The Json Server From Root Directory Of Project**
npx json-server --watch db.json --port 3001 --routes routes.json       ---(this will run dummy server)


6.**End Points**
GET     /api/contacts          ----
POST    /api/contacts          ----
PUT     /api/contacts/:id      ----
DELETE  /api/contacts/:id      ----

7. **Supports Pagination,search,Favorite filter**
GET     /api/contacts?_page=2&_limit=10&q=John&favorite=true


