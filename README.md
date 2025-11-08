# KnowCraft

A full-stack fintech application built with React, TypeScript, and Express.

## How to Run This Project

### Prerequisites
- Node.js (v18 or higher)
- npm

### Main Steps

1. **Clone the repository**
```bash
git clone https://github.com/Kunj2411/know-craft.git
cd know-craft
```

2. **Install dependencies**
```bash
npm install
```

3. **Build the project**
```bash
npm run build
```

4. **Start the development server**

**For Windows:**
```cmd
start-dev.bat
```

**For Linux/Mac:**
```bash
npm run dev
```

**Alternative (all platforms):**
```bash
set NODE_ENV=development && npx tsx server/index.ts
```

5. **Access the application**
- Open browser and go to `http://localhost:5000`
- Login with any username/password
- Select "Internal" user type to access Knowledge Base
- Navigate to Knowledge Base via sidebar or `http://localhost:5000/#/knowledge`

### Production
```bash
npm run build
npm start
```

## Features
- Chat interface
- Analytics dashboard
- Audit logs
- Knowledge base management