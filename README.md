# Portfolio Website

A professional portfolio website built with React, TypeScript, Vite, and Tailwind CSS.

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Docker** - Containerization for production deployment

## Project Structure

```
src/
├── components/     # Reusable UI components
├── sections/      # Page sections (Hero, About, Projects, etc.)
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── types/         # TypeScript type definitions
└── assets/        # Static assets (images, icons, etc.)
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Docker

### Prerequisites

- Docker installed on your system
- Docker Compose (optional, for easier management)

### Build Docker Image

```bash
# Build the Docker image
docker build -t portfolio .

# Build with environment variables (optional)
docker build --build-arg VITE_API_URL=https://api.example.com -t portfolio .
```

### Run Container

```bash
# Run the container (basic)
docker run -p 8080:80 portfolio

# Run with custom port mapping
docker run -p 3000:80 portfolio

# Run in detached mode (background)
docker run -d -p 8080:80 --name portfolio-container portfolio

# Run with environment variables
docker run -p 8080:80 -e VITE_API_URL=https://api.example.com portfolio
```

### Docker Commands

```bash
# View running containers
docker ps

# Stop container
docker stop portfolio-container

# Start stopped container
docker start portfolio-container

# Remove container
docker rm portfolio-container

# View container logs
docker logs portfolio-container

# Execute command in running container
docker exec -it portfolio-container sh

# Remove image
docker rmi portfolio
```

### Docker Compose (Optional)

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  portfolio:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    environment:
      - VITE_API_URL=https://api.example.com
    restart: unless-stopped
```

Then run:

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Production Deployment

The Docker image uses:
- **Multi-stage build**: Optimized for size (~25MB final image)
- **Nginx Alpine**: Lightweight web server
- **Health checks**: Built-in container health monitoring
- **Gzip compression**: Enabled for better performance
- **SPA routing**: Configured for React Router (if added later)
- **Security headers**: Basic security headers included

### Environment Variables

The build supports environment variables via build args:

```bash
docker build --build-arg VITE_API_URL=https://api.example.com -t portfolio .
```

Common Vite environment variables:
- `VITE_API_URL` - API endpoint URL
- `VITE_APP_TITLE` - Application title
- Any other `VITE_*` variables you need

## Key Setup Decisions

1. **Vite over Next.js**: Chosen for faster dev experience, simpler setup, and full control over routing (if needed later).

2. **Tailwind CSS**: Utility-first approach for rapid development and consistent design system.

3. **Multi-stage Dockerfile**: 
   - Builder stage: Compiles TypeScript and bundles assets
   - Production stage: Serves static files via nginx (lightweight, production-ready)

4. **Folder Structure**: 
   - Separates concerns (components vs sections)
   - Scalable for future growth
   - Clear organization for team collaboration

5. **TypeScript**: Type safety from the start to catch errors early and improve developer experience.
