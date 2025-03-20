**Task Manager**

# Running the Project with Docker

This project includes Docker configurations to simplify the setup and deployment process. Follow the steps below to build and run the application using Docker Compose.

## Prerequisites

- Ensure Docker and Docker Compose are installed on your system.
- Verify that the required Node.js version (22.13.1-slim) is supported by your Docker installation.

## Environment Variables

- The application uses environment variables defined in the `.env` file. Ensure this file is present and correctly configured before proceeding.

## Build and Run Instructions

1. Build the Docker images and start the services:

   ```bash
   docker-compose up --build
   ```

2. Access the application:

   - Frontend: [http://localhost:3000](http://localhost:3000)

## Services and Ports

- **app**: The main application service, exposed on port `3000`.
- **amplify**: The backend service, not directly exposed.

## Notes

- The `app` service depends on the `amplify` service, which must be running for full functionality.
- Adjust the `docker-compose.yml` file if additional customization is required.

For further details, refer to the Dockerfiles and Compose file included in the project.