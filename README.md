# Hello Movie
Implementation of a Web Application for users to do movies review.
## Backend
Used Python + Flask + MongoDB to implement backend api.
### User Authentication
#### Login
To Login, please use the following api
```
method: 'POST'
route: /api/auth/login
body: {email: example@email.com, password: examplePwd}
```
#### Signup
To Signup, please use the following api
```
method: 'POST'
route: /api/auth/signup
body: {name: exampleName email: example@email.com, password: examplePwd}
```
#### User
##### GET
To Get the infomation of a user, please use the following api
```
method: 'GET'
route: /api/auth/user/<userID>
```
##### PUT
To Update the infomation of a user, please use the following api
```
## email should not be changed
method: 'PUT'
route: /api/auth/user/<userID>
body: {name: newName email: example@email.com, password: newPwd}
```
##### DELETE
To Delete a user, please use the following api
```
method: 'DELETE'
route: /api/auth/user/<userID>
```
#### Reviews
##### GET
To Get all reviews, please use the following api
```
method: 'GET'
route: /api/reviews
```
##### POST
To post a new review, please use the following api
```
method: 'POST'
route: /api/reviews
body: {movie_id:movie_id,like:true,content:content,user_id: user_id,user_name: name}
```
#### ReviewWithMovie
##### GET
To Get all reviews with of a given movie, please use the following api
```
method: 'GET'
route: /api/movie_reviews/<movie_id>
```
#### Review
##### GET
To Get a review with given id, please use the following api
```
method: 'GET'
route: /api/review/<id>
```
##### DELETE
To Delete a review with given id, please use the following api
```
method: 'DELETE'
route: /api/review/<id>
body: {user_id: user_id}
```
##### PUT
To Put a review with given id, please use the following api
```
method: 'PUT'
route: /api/review/<id>
body: {movie_id:movie_id,like:true,content:content,user_id: user_id, user_name: name}
```
#### Watching Lists 
##### POST
To post a new watching list item, please use the following api
```
method: 'POST'
route: /api/watchingLists
body: {movie_id: movie_id, user_id: user_id}
```
#### Watching Lists With User
##### GET
To get the watching list of a user, please use the following api
```
method: 'GET'
route: /api/watching_user/<user_id>
```
#### Watching List Item
##### DELETE
To delete a watching list item, please use the following api
```
method: 'DELETE'
route: /api/watchingListItem/<id>
body: {user_id: user_id}
```
#### Friends
##### POST
To add a new friend to a given user, please use the following api
```
method: 'POST'
route: /api/friends
body: {cur_id: cur_user_id, friend_id: friend_user_id}
```
#### Friends Lists With User
##### GET
To get the friends list of a user, please use the following api
```
method: 'GET'
route: /api/friend_user/<user_id>
```
#### Friend
##### DELETE
To delete a friend item, please use the following api
```
method: 'DELETE'
route: /api/friend/<id>
body: {user_id: user_id}
```

## Frontend
Using react to implement frontend view.
### Auth pages
Auth pages show up when user first open the web application.
#### Login
- If the user already have an account, he can directly login. After login, the user would be directed to Movies page. 
- If the user does not have an account, he can click 'To Signup' button and navigate to Signup page.
#### Signup
- If the user already have an account, he can click 'To Login' button and navigate to Login page.
- If the user does not have an account, he can fill in the information and signup. After signup, the user would be directed to Movies page. 
### Content pages
Content pages show up after user finishing user authentication.
### Movies
#### Info
- Use TMDB API to get movies information
  - Movie information contains title, genre, popularity, vote-average, vote-count, release date, overview, and language
  - User can search the name of the movies
  - User can view movies between list view and grid view
  - User can choose a genre, and corresponding list of movies would return
  - User can sort the movies by popularity ascending/descending order
  - User can sort the movies by release date ascending/descending order 
  - User can click 'view detail' button to view the detail information of the movie
#### Review
- Each movie would have its own review section in detail movie view
- If a movie does not have any reviews yet, a message would display
- User can click a button to add review to this movie
- A review contain like/dislike, the name of the reviewer, and detail content of the review
- Only the reviews that added by the current use would show update and delete button
- User can click delete button to delete this review
- User can click update button to update the content of the review
### Friends
- Display the friends information of a user
- If the user does not add any friends, a message would be shown
- A list of fried with name, and email would display in this page
- User can click the "view watching list" button to view the watching list of a friend
- User can click "delete" button to delete a friend from his friend list
- User can enter the email address of a user and then click add a new friend to add this user to his friend list. If the email does not exist, a error message would display
### Home
#### User basic information
- Home page display user's basic information. 
- User can update a new name and password using 'Update' button. 
- User can logout by clicking 'Logout' button.
#### Watching List
- A list of movies in current user's watching list would be displayed
- User can click view detail to view more information of the movie
- User can click "remove" button to remove this movie from the watching list