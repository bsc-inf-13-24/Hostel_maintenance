HOSTEL MAINTENANCE SYSTEM – TEAM PRESENTATION NOTES
1. Project Overview
Our project is a Hostel Maintenance Management System.
It allows:
•	Students → report maintenance issues
•	Admin → manage, track, and resolve those issues
________________________________________
2.  Problem Statement
In many hostels:
•	Issues are reported manually
•	Reports get lost or delayed
•	No proper tracking system
 Our system solves this by digitizing the process.
________________________________________
3. Objective
To build a system that:
•	Allows students to submit maintenance requests
•	Helps admins manage and resolve them efficiently
________________________________________
4.  System Design
 Technologies used
•	Backend: NestJS
•	Database: Oracle
•	Testing: Postman
________________________________________
 Database Design
We used ONE table only: requests
Fields:
•	id
•	studentId
•	roomNumber
•	issueType
•	description
•	status
•	createdAt
________________________________________
 Important Design Decision
We intentionally used one table to keep the system:
•	simple
•	normalized
•	easy to manage
 Features like priority and duplicate prevention are handled in the service layer, not by adding more tables.
________________________________________
5.  System Functionality
 Student
•	Create request
•	View their own requests
 Admin
•	View all requests
•	Update request status
•	Delete requests
________________________________________
🔁 Duplicate Prevention
•	Before saving a request, system checks:
o	same room
o	same issue type
o	status still pending
 Prevents multiple reports of the same issue
________________________________________
 Prioritization
•	Priority is based on how long a request stays unresolved
Rules:
•	0–1 days → Low
•	2–3 days → Medium
•	4–6 days → High
•	7+ days → Urgent
 This is calculated dynamically, not stored in the database
________________________________________
 Status Flow
•	pending → in-progress → fixed
________________________________________
7. Testing
We used Postman to test:
•	POST (create request)
•	GET (fetch requests)
•	PATCH (update status)
•	DELETE (remove request)
________________________________________
8.  Technical Implementation
•	DTOs → validate incoming data
•	Controllers → handle HTTP requests
•	Services → contain business logic
•	TypeORM → connects NestJS to Oracle DB
________________________________________
9.  About Admin Login 
We initially planned to include an admin login system.
However:
We focused on implementing core system functionality first
Current state:
•	Admin and student actions are separated at endpoint level
Future improvement:
•	Add authentication using JWT
•	Add users table with roles (admin/student)
________________________________________
10. Key Design Justification
We did NOT create extra tables because:
•	Duplicate handling is logic, not data
•	Priority is calculated, not stored
•	Adding tables would overcomplicate the system
________________________________________
11. Conclusion
Our system:
•	Improves reporting of maintenance issues
•	Prevents duplication
•	Prioritizes unresolved problems
•	Provides a structured way to manage hostel maintenance
•	________________________________________
ENDPOINTS

Endpoint // student make a request
POST /requests

 Body (JSON)
{
  "studentId": 1,
  "roomNumber": "A12",
  "issueType": "Electrical - Broken switch",
  "description": "Switch is not working"
}

GET /requests/student/1 // student view his requests

Endpoint // admin view all requests
GET /requests

GET /requests/1 //admin retrieve specific request

PATCH /requests/1 // admin updates a requests,
{
"status": "in-progress"
}

DELETE /requests/1 //admin deletes requests


/// In our case, the admin usually updates only the status field, not the whole request. So PATCH is more appropriate because it allows partial updates.
/////“We separated functionality logically using endpoints like /requests for admin and /requests/student/:id for students, but since they operate on the same resource, we kept them under one base route to maintain consistency.


