# Audmg Drive

**Serverless Media Storage and Retrieval System**

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Logging and Monitoring](#logging-and-monitoring)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Welcome to the **Serverless Media Storage and Retrieval System** project! This project is a hands-on exploration of AWS cloud services and serverless architecture, primarily focusing on AWS Lambda functions. The application functions as a simple media storage service where users can authenticate, upload, view, and download audio and image files securely.

The application is designed to provide a foundation for cloud-based development, focusing on serverless technologies and AWS services. Although simple in concept, this project serves as a great starting point for future cloud-based applications with extended functionality.

## Features

- **User Authentication**: Users can sign up and log in to the system using custom authentication mechanisms.
- **Custom Authorizer**: AuthValidator middleware ensures that only authenticated users can access specific resources.
- **File Upload**: Users can upload image and audio files to the system, which are stored in an S3 bucket.
- **File Retrieval**: Authenticated users can retrieve and download their uploaded files.
- **Serverless Architecture**: The project is built using AWS Lambda, allowing for a scalable and cost-efficient backend.

## Learning Objectives

The primary focus of this project was to deepen understanding of the following AWS and Serverless concepts:

- **AWS Lambda Functions**: Core serverless computing service used to handle business logic, file uploads, and authentication.
- **AWS S3 Bucket**: Object storage service used to store audio and image files securely.
- **AWS API Gateway**: Provides RESTful API endpoints to access Lambda functions, ensuring security and scalability.
- **AWS CloudWatch**: Monitors the performance of Lambda functions and logs API activity for debugging and optimization.
- **AWS SQS (Simple Queue Service)**: Allows for message queue handling in a distributed system (planned for future improvements).
- **AWS SNS (Simple Notification Service)**: Set up notifications for certain events like file uploads or errors (planned for future improvements).
- **Serverless Framework**: Simplifies deployment, management, and configuration of AWS resources using YAML templates.

## Architecture

The application follows a serverless architecture using AWS services orchestrated by the Serverless Framework. Below is an overview of the system's components and their interactions:

1. **API Gateway**: Acts as the entry point for all client requests, routing them to appropriate Lambda functions.
2. **Lambda Functions**:
    - **Authentication Functions**: Handle user signup and login processes.
    - **AuthValidator Function**: Serves as a custom authorizer middleware to validate and authorize user requests.
    - **Upload Function**: Processes and stores uploaded media files to AWS S3.
    - **Retrieve Function**: Fetches and returns media files from AWS S3 for authenticated users.
3. **AWS S3 Bucket**: Stores media files securely and efficiently.
4. **AWS SQS (Simple Queue Service)**: Manages message queuing for processing tasks asynchronously.
5. **AWS SNS (Simple Notification Service)**: Sends notifications and alerts related to media processing and system events.
6. **AWS CloudWatch**: Monitors application logs and performance metrics, aiding in debugging and system optimization.

## Technologies Used

- **AWS Lambda**: For running serverless functions that handle application logic.
- **AWS S3**: For storing and retrieving media files.
- **AWS API Gateway**: For routing HTTP requests to Lambda functions.
- **AWS CloudWatch**: For logging, monitoring, and alerting.
- **AWS SQS**: For reliable and scalable message queuing.
- **AWS SNS**: For sending notifications and alerts.
- **Serverless Framework**: For deploying and managing serverless applications with ease.
- **Node.js**: Runtime environment for executing JavaScript code on the server side.

## Prerequisites

Before setting up and running this project, ensure you have the following prerequisites installed and configured:

- **Node.js (v12.x or later)**: Download and install Node.js
- **npm**: Comes bundled with Node.js.
- **Serverless Framework**: Install globally using npm:
     
    ```bash 
        npm install -g serverless
    ```
- **AWS Account**: [Create an AWS account](https://aws.amazon.com/free/) if you don't have one.
- **AWS CLI**: [Install and configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
- **AWS Credentials**: Configure your AWS credentials locally:
    
   
    ```bash
        aws configure
    ```
    Provide your AWS Access Key ID, Secret Access Key, default region, and output format when prompted.

## Installation and Setup

Follow these steps to set up and deploy the project:

### 1. Clone the Repository

```bash
    git clone https://github.com/Kashif-Kamran/audmg-drive.git
```

### 2. Install Dependencies


```bash
    npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and populate it with necessary environment variables:

```bash 
AWS_REGION=your-aws-region S3_BUCKET_NAME=your-s3-bucket-name JWT_SECRET=your-jwt-secret
```
### 4. Deploy the Application

Use the Serverless Framework to deploy the application to AWS:
```bash 
serverless deploy
```
This command will package and deploy all Lambda functions, create necessary AWS resources, and output the endpoints and resource identifiers.

### 5. Verify Deployment

After deployment, you will see output similar to:
```bash 
`Service Information service: serverless-media-storage stage: dev region: us-east-1 stack: serverless-media-storage-dev api keys:   None endpoints:   POST - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/signup   POST - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/login   POST - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/upload   GET  - https://xxxxxxxx.execute-api.us-east-1.amazonaws.com/dev/retrieve functions:   signup: serverless-media-storage-dev-signup   login: serverless-media-storage-dev-login   upload: serverless-media-storage-dev-upload   retrieve: serverless-media-storage-dev-retrieve
```

Make note of these endpoints as you will use them to interact with the application.

## Usage

### 1. User Signup

- **Endpoint**: `/signup`
- **Method**: POST
- **Description**: Registers a new user in the system.

**Request Body**:

```bash 
{   "username": "yourusername",   "password": "yourpassword",   "email": "youremail@example.com" }
```
**Response**:
```bash 

{   "message": "User registered successfully.",   "userId": "unique-user-id" }
```
### 2. User Login

- **Endpoint**: `/login`
- **Method**: POST
- **Description**: Authenticates a user and returns a JWT token.

**Request Body**:

```bash 

{   "username": "yourusername",   "password": "yourpassword" }
```

**Response**:


```bash
{   "message": "Login successful.",   "token": "jwt-token-string" }
```

**Note**: Use this token for authenticated requests by including it in the `Authorization` header as a Bearer token.

### 3. Upload Media

- **Endpoint**: `/upload`
- **Method**: POST
- **Description**: Uploads an image or audio file to the system.

**Headers**:

``` bash
    Authorization: Bearer your-jwt-token Content-Type: multipart/form-data
```
**Form Data**:

- `file`: The media file to upload.

**Response**:

``` bash

{"message": "File uploaded successfully.",   "fileUrl": "https://s3.amazonaws.com/your-s3-bucket/your-file-key" }

```
### 4. Retrieve Media

- **Endpoint**: `/retrieve`
- **Method**: GET
- **Description**: Retrieves a list of media files uploaded by the authenticated user.

**Headers**:

```bash
Authorization: Bearer your-jwt-token
```

**Response**:

```bash 

`{   "files": [     {       "fileName": "example.jpg",       "fileUrl": "https://s3.amazonaws.com/your-s3-bucket/example.jpg",       "uploadedAt": "2023-09-01T12:34:56Z"     },     {       "fileName": "audio.mp3",       "fileUrl": "https://s3.amazonaws.com/your-s3-bucket/audio.mp3",       "uploadedAt": "2023-09-02T08:22:30Z"     }   ] }`
```
## API Endpoints

|Endpoint|Method|Description|Authentication|
|---|---|---|---|
|`/signup`|POST|Register a new user|No|
|`/login`|POST|Authenticate user and obtain JWT token|No|
|`/upload`|POST|Upload media files (images/audios)|Yes|
|`/retrieve`|GET|Retrieve list of uploaded media files|Yes|

## Logging and Monitoring

The application leverages **AWS CloudWatch** for logging and monitoring purposes:

- **Logging**: All Lambda function executions are logged to CloudWatch Logs, providing detailed information about each request and response cycle, errors, and other important events.
- **Metrics**: CloudWatch Metrics monitor performance indicators such as invocation counts, durations, and error rates.
- **Alarms**: CloudWatch Alarms can be set up to notify administrators via **AWS SNS** when certain thresholds are breached, enabling proactive system management.

**Accessing Logs**:

You can access the logs through the AWS Console:

1. Navigate to the **CloudWatch** service.
2. Select **Logs** from the sidebar.
3. Choose the log group corresponding to your Lambda function.
4. View and analyze the log streams as needed.

## Future Enhancements

This project provides a foundation for future improvements, which may include:

- **Extending Authentication Features**: Adding support for password recovery, email verification, and multi-factor authentication.
- **File Versioning**: Implementing version control for files uploaded by the users.
- **SQS & SNS Integration**: Incorporating SQS for queue management and SNS for notifications, such as sending alerts when a file is uploaded or when errors occur.
- **CI/CD Pipeline**: Automating the deployment process using AWS CodePipeline or a similar CI/CD tool.

## Conclusion

The Serverless Drive Project was built to gain practical experience with serverless architecture, cloud services, and AWS Lambda functions. Although a simple project, it serves as a strong foundation for further exploration into scalable, cloud-native development. The knowledge gained here will be invaluable for future work with AWS and other cloud-based systems.

## License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

**Disclaimer**: This project is developed for educational purposes to understand and learn serverless architectures and AWS cloud services. It should not be used in production environments without proper security reviews and enhancements.


Thank you for exploring this project! Feel free to reach out for any questions or discussions related to serverless architectures and AWS services.
