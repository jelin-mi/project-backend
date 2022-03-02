# My project's name

Buddy Films :clapper: 
​

​
## Description

Buddy Films is an application which allows​ users to write down a movie their friend (*Buddy*) just recommended them to watch.

*‘Watchlist’* is a list of movies the user is interested in and previously added or selected from the main list (Movies).

*'Movies'* page displays all the movies uploaded.
The user can search for a movie as he types and / or filter by different categories.
Rating is a valoration of the user’s friend (what the buddy said).

*'Movie detail'* - here the user can see all the details of the movie (movie card).
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

- **See movies** - As a user I want to be able to see all the movies of all the users.

- **Movie detail** - As a user I want to be able to see the detail of a movie.

- **New movie** - As a user I want to be able to add a movie.

- **Update movie** - As a user I want to be able to update the information of my movies.

- **Watchlist** - As a user I want to be able to see the movies people recommended me.

- **User profile** - As a user I want to be able to see my profile and edit it.

​
## Backlog

- **Filter** - As a user I want to be able to filter the movies by categories such as Buddy, Watched, Rating.

- **Watched** - As a user I want to be able to mark a movie as Watched.

- **Rating** - As a user I want to be able to rate the movies with stars.

- **Review** - As a user I want to be able to write a review of the movies via a comment below the movie card.



## Models

### User model

```js
{
    email: String,
    password: String,
    name: String,
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
    title: String,
    year: Number,
    director: String,
    channel: String,    
    buddy: String,
    synopsis: String,
    rating: Number,
}
```

### Watchlist model

```js
{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    movie: { type: Schema.Types.ObjectId, ref: 'Movie' }, 
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












## Overview for Frontend ?  //TODO
​
| Name                   | Method | Endpoint                             | Description                                      | Body                                  | Redirects                 |
| ---------------------- | ------ | ------------------------------------ | ------------------------------------------------ | ------------------------------------- | ------------------------- |
| Homepage               | GET    | /                                    | See the main page                                |                                       |                           |
| Signup form            | GET    | /auth/signup                         | See the form to sign up                          |                                       |                           |
| Signup                 | POST   | /auth/signup                         | Sign up a user                                   | { email, password, name }             | /auth/login               |
| Log in form            | GET    | /auth/login                          | See the form to log in                           |                                       |                           |
| Log in                 | POST   | /auth/login                          | Log in the user                                  | { email, password, name }             | /api/movies               |
| Log out                | POST   | /auth/logout                         | Log out the user                                 |                                       | /auth/login               |
| User profile           | GET    | /user                                | See the profile page with editable form          |                                       |                           |
| User profile edit form | GET    | /user/edit                           | See edit form with user's previous information   |                                       |                           |
| User profile edit      | POST   | /user/edit                           | Send updated data of the user                    | { name, favouriteMovies, etc. }       | /api/user/:id             |
| Watchlist              | GET    | /watchlist/list                      | See user's movies                                |                                       |                           |
| Movies                 | GET    | /movies                              | See all the movies of all users                  |                                       |                           |
| Movie add form         | GET    | /watchlist/add                       | See form to upload a new movie                   |                                       |                           |
| Movie add              | POST   | /watchlist/add                       | Upload a movie to user's Watchlist               | { title, year, director, etc. }       | /user-watchlist/{movieId} |
| Movie detail           | GET    | /watchlist/{movieId}                 | See the Movie detail page with editable form     |                                       |                           |
| Movie edit form        | GET    | /watchlist/{movieId}/edit            | See edit form with movies's previous information |                                       |                           |
| Movie edit             | POST   | /{userId}/watchlist/{movieId}/edit   | Edit movie's details                             | { title, year, director, etc. }       | /user-watchlist/{movieId} |
| Movie delete           | POST   | /{userId}/watchlist/{movieId}/delete | Delete the movie from user's Watchlist           |                                       | /user-watchlist           |

​

## REST API endpoints

| Name                | Method    | Endpoint                   | Request body                                                         | Redirects                     |
|---------------------| --------- | -------------------------- | -------------------------------------------------------------------- | ----------------------------- |
| Homepage            | GET       | `/`                        |                                                                      |                               |
| Signup              | POST      | `/auth/signup`             | { email, password }                                                  | /auth/login                   |
| Login               | POST      | `/auth/login`              | { email, password }                                                  | /api/movies                   |
| Verify              | GET       | `/auth/verify`             |                                                                      |                               |
| See movies          | GET       | `/api/movies`              |                                                                      |                               |
| Movie detail        | GET       | `/api/movies/:id`          |                                                                      |                               |
| New movie           | POST      | `/api/movies`              | { owner, title, year, director, channel, buddy, synopsis, rating }   | /api/movies                   |
| Update movie        | PUT       | `/api/movies/:id`          | { owner, title, year, director, channel, buddy, synopsis, rating }   | /api/movies                   | 
| Watchlist           | GET       | `/api/movies/watchlist`    |                                                                      |                               | 
| User profile        | GET       | `/api/:userId`             |                                                                      |                               |
| User profile edit   | PUT       | `/api/:userId/edit`        | { name, favouriteMovies, preferredDirector, myBuddies, avatar }      | /:userId                      |
| User profile delete | DELETE    | `/api/:userId/delete`      |                                                                      | /                             |



## Links

- [Slides](TBC)
- [Frontend repository](https://github.com/jelin-mi/project-frontend)
- [Deployed version](https://buddy-films.netlify.app)