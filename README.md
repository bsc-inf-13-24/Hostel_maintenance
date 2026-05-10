Hostel Maintenance Request System
Project Overview
The Hostel Maintenance Request System is a backend REST API developed using NestJS, TypeORM, and Oracle Database.
The system allows students to report hostel maintenance issues such as:
Electrical faults
Water leakages
Broken doors/windows
Plumbing issues
Internet/network problems
Administrators manage and monitor requests by:
Viewing all submitted requests
Updating request status
Prioritizing long-unresolved requests
Preventing duplicate maintenance reports
Managing admin accounts securely using JWT authentication
Objectives of the System
The system was designed to:
Digitize hostel maintenance reporting
Reduce manual reporting processes
Prevent duplicated maintenance requests
Improve issue prioritization
Track maintenance request status
Secure admin operations using authentication and authorization
Technologies Used
Technology
Purpose
NestJS
Backend framework
TypeScript
Programming language
TypeORM
ORM for database operations
Oracle Database
Data storage
JWT
Authentication
Passport JWT
Route protection
Bcrypt
Password hashing
Class Validator
Input validation
System Architecture
The project follows modular architecture using NestJS modules.
Main Modules
1. Requests Module
Handles all maintenance request operations.
2. Auth Module
Handles:
Registration
Login
JWT token generation
Role-based authorization
Database Tables
1. Requests Table
Stores maintenance requests.
Fields
Field
Description
id
Primary key
studentId
Student identifier
roomNumber
Hostel room number
issueType
Category of issue
description
Detailed issue explanation
status
Request status
priority
Request priority
createdAt
Request creation date
2. Users Table
Stores authenticated users.
Fields
Field
Description
id
Primary key
email
User email
password
Hashed password
role
User role (admin/student)
RESTful Principles Used

1. Stateless Communication
Each request contains all information needed to process it.
Example:
JWT token is sent in every protected request
Server does not store session information
This improves scalability and performance.
2. Resource-Based URLs
Resources are represented using URLs.
Examples:
Http
/requests
/auth/login
/auth/register
3. HTTP Methods
Different HTTP methods are used depending on the operation.
Method
Purpose
POST
Create data
GET
Retrieve data
PATCH
Update partial data
DELETE
Remove data
Authentication System
The project uses JWT authentication.
Authentication Flow
Step 1 — User Login
User logs in using email and password.
Step 2 — Token Generation
Server generates JWT token.
Step 3 — Token Usage
Client sends token in request headers.
Example:
Http
Authorization: Bearer your_token_here
Step 4 — Protected Routes
Server verifies token before allowing access.
Role-Based Authorization
The system supports two roles:
Role
Permissions
Student
Create and view requests
Admin
Manage requests and create admins
Duplicate Request Prevention
Problem
Different students may report the same issue multiple times.
Example:
Student A reports broken water pipe
Student B reports same broken pipe
This creates duplicated requests.
Solution Implemented
The system checks:
Room number
Issue type
Request status
If a similar unresolved request already exists:
New request is rejected
Existing request is reused
