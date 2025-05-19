# Digital Shadow Scan

A comprehensive tool for analyzing and monitoring digital footprints.

## Project Structure

```
digital-shadow-scan/
├── frontend/           # React frontend application
│   ├── src/           # Source files
│   ├── public/        # Static files
│   └── package.json   # Frontend dependencies
├── backend/           # Node.js backend server
│   ├── services/      # Backend services
│   └── package.json   # Backend dependencies
└── package.json       # Root package.json for managing both frontend and backend
```

## Setup Instructions

1. Install dependencies for all parts of the application:
   ```bash
   npm run install:all
   ```

2. Create a `.env` file in the backend directory with the following variables:
   ```
   OPENAI_API_KEY=your_openai_api_key
   SERPAPI_API_KEY=your_serpapi_key
   ```

3. Start the development servers:
   ```bash
   # Start both frontend and backend
   npm run dev

   # Or start them separately
   npm run dev:frontend
   npm run dev:backend
   ```

## Available Scripts

- `npm run install:all` - Install dependencies for all parts of the application
- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend development server
- `npm run dev:backend` - Start only the backend development server
- `npm run build` - Build both frontend and backend
- `npm run build:frontend` - Build only the frontend
- `npm run build:backend` - Build only the backend

## Technologies Used

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- React Router
- React Query

### Backend
- Node.js
- Express
- OpenAI API
- SerpAPI
- CORS

## Project info

**URL**: https://lovable.dev/projects/86c7a4f4-0644-4dcc-ac39-af8ab528d858

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/86c7a4f4-0644-4dcc-ac39-af8ab528d858) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/86c7a4f4-0644-4dcc-ac39-af8ab528d858) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
