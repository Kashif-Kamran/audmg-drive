# Audmg Drive
**Serverless Media Storage and Retrieval System**

## Overview

This project was built to learn and explore the use of AWS Lambda functions and the Serverless Framework for creating a simple, scalable cloud-based file storage system. The primary goal was to create a personal drive where users can upload, view, and download files (audio and image).

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

The project uses a serverless architecture, which eliminates the need for traditional server management. It is deployed using the Serverless Framework and utilizes AWS services such as Lambda, S3, and API Gateway. Below are the primary Lambda functions:

### 1. Authentication Functions
- **Description**: Handles user login and signup operations. The structure is extendable to include additional features like password recovery and user profile management.
- **Functionality**:
  - User registration
  - User login with token-based authentication
  - Extendable for additional authentication flows (e.g., forgot password)

### 2. AuthValidator (Custom Authorizer)
- **Description**: A custom Lambda authorizer function that validates user authentication for accessing API Gateway resources.
- **Functionality**:
  - Verifies the `authToken` provided by the user and returns either an "Allow" or "Deny" policy.
  - Ensures that only authenticated users can access upload, retrieve, or other protected operations.

### 3. Upload Function
- **Description**: Handles file uploads (images and audio) by authenticated users. The uploaded files are stored in an S3 bucket.
- **Functionality**:
  - Validates the file type (image or audio)
  - Uploads the file to a secure S3 bucket

### 4. Retrieve Function
- **Description**: Allows authenticated users to retrieve and download their uploaded files.
- **Functionality**:
  - Retrieves file metadata from the S3 bucket
  - Provides a download link for the user to access their files

## Tech Stack

- **Backend**: AWS Lambda, API Gateway
- **Storage**: AWS S3 for file storage
- **Authentication**: Custom authentication mechanism with JWT-based tokens
- **Security**: Custom authorizer middleware on API Gateway
- **Monitoring**: AWS CloudWatch for logging and performance metrics
- **Deployment**: Serverless Framework

## Future Enhancements

This project provides a foundation for future improvements, which may include:

- **Extending Authentication Features**: Adding support for password recovery, email verification, and multi-factor authentication.
- **File Versioning**: Implementing version control for files uploaded by the users.
- **SQS & SNS Integration**: Incorporating SQS for queue management and SNS for notifications, such as sending alerts when a file is uploaded or when errors occur.
- **CI/CD Pipeline**: Automating the deployment process using AWS CodePipeline or a similar CI/CD tool.

## Conclusion

The Serverless Drive Project was built to gain practical experience with serverless architecture, cloud services, and AWS Lambda functions. Although a simple project, it serves as a strong foundation for further exploration into scalable, cloud-native development. The knowledge gained here will be invaluable for future work with AWS and other cloud-based systems.

## License

This project is licensed under the MIT License.
