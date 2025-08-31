# Autobahn Dashboard

## Overview

Welcome to the Angular Project! This project is designed to showcase a sample Angular application that interacts with the Autobahn API.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- Docker
- Git

## Getting Started

### 1. Clone the Repository
```
git clone https://github.com/farisgogic/autobahn-dashboard.git
```
### 2. Navigate to the Project Directory
```
cd autobahn-dashboard
```
### 3. Build the Docker Image
```
docker build -t autobahn-angular-project .
```
This command will build the Docker image containing the Angular app and its dependencies.

### 4. Run the Docker Container
```
docker run -p 8080:80 --name autobahn autobahn-angular-project
```
Replace `autobahn` with the desired name for your container.

### 5. Access the App

Open your web browser and go to http://localhost:8080 to access the Angular app.

## Additional Information

- **Stopping the Container:**
  To stop the Docker container, you can use the following command:
```
docker stop autobahn
```
Replace `autobahn` with the actual name of your container.

- **Removing the Container:**
If you want to remove the Docker container (after stopping it), use the following command:
```
docker rm autobahn
```
- **Removing the Image:**
To remove the Docker image, you can use:
```
docker rmi autobahn-angular-project
```
## Customization

Feel free to explore and modify the code to suit your needs. The project structure includes:

- src/: Angular source code.
- Dockerfile: Configuration for Docker container.

If you encounter any issues or have questions, please don't hesitate to reach out.

Happy coding!
