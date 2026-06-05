
## Project Name

Single Page Application 


## Description

Single Page Application for managing internal company projects. The app supports authentication, role-based permissions, persistent sessions, dynamic navigation without page reloads, and CRUD operations against a simulated REST API powered by `json-server`.

Managers can administer every project. Collaborators can only view assigned projects and update their status.

## Technologies

- Vanilla JavaScript with Vite
- CSS3 responsive layout
- Fetch API
- localStorage session persistence
- json-server simulated REST API
- concurrently for running frontend and API together

## Installation

```bash
npm install
```

## Running Project & JSON Server

Run the frontend and API together:

```bash
npm start
```

Or run each service in separate terminals:

```bash

npm run dev
```

Expected local URLs:

- JSON Server API: `http://localhost:3000`

## Test Users

| Role | Email | Password |
| Manager | `manager@company.com` | `manager123` |
| user | `bruno@company.com` | `bruno123` |
| user | `camila@company.com` | `camila123` |


