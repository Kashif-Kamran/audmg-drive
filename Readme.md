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

The primary goal of this project is to gain practical experience with various AWS services and understand how they interact within a serverless framework. This README provides detailed information about the project's structure, setup, usage, and the learning outcomes achieved through its development.

## Features

- **User Authentication**: Secure user registration and login system to manage access to media files.
- **Media Upload**: Authenticated users can upload image and audio files to the system.
- **Media Retrieval**: Users can view and download their uploaded media files.
- **Access Control**: Custom authorization to ensure users can only access their own files.
- **Scalable and Serverless**: Leveraging AWS services to provide a highly scalable and cost-effective solution.
- **Logging and Monitoring**: Comprehensive logging and monitoring using AWS CloudWatch.
- **Asynchronous Processing**: Utilizing AWS SQS and SNS for reliable and asynchronous message processing.

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

Possible improvements and extensions to the project include:

- **Forgot Password Functionality**: Implementing password recovery and reset processes.
- **File Metadata Management**: Adding the ability to edit and manage metadata associated with uploaded files.
- **Thumbnail Generation**: Automatically generating thumbnails for uploaded images.
- **Transcoding Audio Files**: Converting uploaded audio files into different formats using services like AWS Elastic Transcoder.
- **Pagination and Search**: Implementing pagination and search capabilities for retrieving media files.
- **Improved Security**: Enhancing security measures with features like multi-factor authentication (MFA) and encryption at rest and in transit.
- **Frontend Integration**: Developing a user-friendly frontend application using frameworks like React or Angular to interact with the backend services.
- **CI/CD Pipeline**: Setting up continuous integration and deployment pipelines using tools like AWS CodePipeline and CodeBuild.

## License

This project is licensed under the **MIT License** - see the LICENSE file for details.

---

**Disclaimer**: This project is developed for educational purposes to understand and learn serverless architectures and AWS cloud services. It should not be used in production environments without proper security reviews and enhancements.


Thank you for exploring this project! Feel free to reach out for any questions or discussions related to serverless architectures and AWS services.
