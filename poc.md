## Backend Activities

Technology: Nodejs, express, Mongoose

- AUTHENTICATION:
	- Register --> username, email and password 
	- Login --> email and password
	- CRUD Operations:
		`Schema (#id, #user_name, #email, *password)` --> *mandatory_field, #unique
		- POST: register new User details
		- GET: get user deatils by email
		- PUT: Update user deatils by email
		- DELETE: Remove user details by email
		- POST: login user

- POST:
    - CRUD Operations:
        `Schema (#post_id(id), *owner(ref(user.id)), title(str), description(str), *imageUrl[], hastags[])` --> *mandatory_field, #unique
        - POST: Create new record
        - GET: Get post by post_id
        - GET: Get all the post by user_id
        - PUT: Update the post by post_id
        - DELETE: Remove the post by post_id


- USER:
    - CRUD Opration:
        `Schema (follower_id(ref(user.id)), following_id(ref(user.id))), status[enum(FOLLOW, UNFOLLOW, REQUESTED)]`
        - POST: Follow/Unfollow user
        - GET: Get all following list by user_id
        - GET: Get all follower list by user_id



----------------------------------------------------------------------------------
----------------------------------------------------------------------------------


## Frontend Activities

Technology: React, Bootstrap

- Navbar    --> Profile, Login, register

- Login Page
    - Form

- Register Page
    - Form

- Profile Page
    - User details (username)
        - Card
    
    - Create New post
        - Form
    
    - Show all users post
        - Cards

    - Update user post
        - Form 