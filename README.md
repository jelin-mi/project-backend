# My project's name

Buddy Films :clapper: 
​

​
## Description

Buddy Films is an application which allows​ users to write down a movie their friend (*Buddy*) just recommended them to see.

*‘Watchlist’* is a list of movies the user is interested in and previously added or selected from the main list (Films).

*'Films'* page displays all the movies recommended.
The user can search for a movie as he types and / or filter by different categories.
Rating is a valoration of the user’s friend (what the buddy said).

*'Film detail'* - here the user can see all the details of the movie (movie card).
There are 2 icons representing these actions when clicking on them:

1.  Watchlist icon - click on it to add it to the Watchlist
2.  Watched icon - click on it to mark the movie as already seen.

​
## User stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist.

- **500** - As a user I want to see a nice error page when the server does not work properly.

- **Homepage** - As a user I want to be able to access the homepage with signup and login buttons.

- **Signup** - As a user I want to sign up to the website application to be able to use all its funcionalities.

- **Login** - As a user I want to be able to log in to the website application so I can get back to my account.

- **Logout** - As a user I want to be able to log out from the website application so that I can make sure no one will access my account.

- **User profile** - As a user I want to be able to see my profile and edit it.

- **Film detail** - As a user I want to be able to see the detail of a movie and edit it.

- **Films** - As a user I want to be able to see all the movies of all the users.

- **New film** - As a user I want to be able to add movies to my user profile.

- **See films** - As a user I want to be able to see the movies I added to my Watchlist.

- **Update film** - As a user I want to be able to update the information of movies (Edit the Film detail).

- **Delete film** - As a user I want to be able to delete movies from my profile.

​
## Backlog

- **Filter** - As a user I want to be able to filter the movies by categories such as Buddy, Watched, Rating.

- **Watched** - As a user I want to be able to mark a movie as Watched.

- **Add to Watchlist** - As a user I want to be able to add a movie created by other user into my Watchlist.

- **Rating** - As a user I want to be able to rate the movies with stars.

- **Review** - As a user I want to be able to write a review of the movies via a comment below the movie card.

​
## Models

### User model

```js
{
    email: String,
    hashedPassword: String,
    userName: String,
    favouriteMovies: String,
    preferredDirector: String,
    myBuddies: String,
    avatar: String,
}
```

### Movie model

```js
{
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    name: String,
    year: Number,
    director: String,
    channel: String,    
    buddy: String,
    synopsis: String,
    rating: Number,
}
```
​
### setup .env

you need to setup the `.env` like `.env.sample`

​
### Install the app

```
npm install
```
​
### Run the app

```
npm run start
```

​
## REST API endpoints
​
| Name                   | Method | Endpoint                            | Description                                      | Body                                  | Redirects                |
| ---------------------- | ------ | ----------------------------------- | ------------------------------------------------ | ------------------------------------- | ------------------------ |
| Homepage               | GET    | /                                   | See the main page                                |                                       |                          |
| Signup form            | GET    | /auth/signup                        | See the form to sign up                          |                                       |                          |
| Signup                 | POST   | /auth/signup                        | Sign up a user                                   | { mail, password }                    | /user-profile            |
| Log in form            | GET    | /auth/login                         | See the form to log in                           |                                       |                          |
| Log in                 | POST   | /auth/login                         | Log in the user                                  | { mail, password }                    | /films                   |
| Log out                | POST   | /auth/logout                        | Log out the user                                 |                                       | /auth/login              |
| User profile           | GET    | /user                               | See the profile page with editable form          |                                       |                          |
| User profile edit form | GET    | /user/edit                          | See edit form with user's previous information   |                                       |                          |
| User profile edit      | POST   | /user/edit                          | Send updated data of the user                    | { name, favouriteMovies, etc. }       | /user-profile            |
| Watchlist              | GET    | /watchlist/list                     | See user's movies                                |                                       |                          |
| Films                  | GET    | /films                              | See all the movies of all users                  |                                       |                          |
| Film add form          | GET    | /watchlist/add                      | See form to upload a new movie                   |                                       |                          |
| Film add               | POST   | /watchlist/add                      | Upload a movie to user's Watchlist               | { name, year, director, etc. }        | /user-watchlist/{filmId} |
| Film detail            | GET    | /watchlist/{filmId}                 | See the Film detail page with editable form      |                                       |                          |
| Film edit form         | GET    | /watchlist/{filmId}/edit            | See edit form with movies's previous information |                                       |                          |
| Film edit              | POST   | /{userId}/watchlist/{filmId}/edit   | Edit movie's details                             | { name, year, director, etc. }        | /user-watchlist/{filmId} |
| Film delete            | POST   | /{userId}/watchlist/{filmId}/delete | Delete the movie from user's Watchlist           |                                       | /user-watchlist          |

​
​

## Links

- [Slides]()
- [Frontend repository](https://github.com/jelin-mi/project-frontend)
- [Deployed version]()
