# My project's name

BuddyFilms :clapper:

​

## Description

BuddyFilms is a MERN fullstack application which allows​ users to upload a movie their friend (_Buddy_) just recommended them to watch.

_‘Watchlist’_ is a list of movies the user is interested in and previously selected from _Films_.
_Remove icon_ - click it to remove the movie from your Watchlist.

_'Films'_ page displays all the movies uploaded.
The user can search for a movie as he types.
Rating is a valoration of the user’s friend (how the buddy rated the movie).
_Watchlist icon_ - click it to add the movie to your Watchlist.

_'Film detail'_ - here the user can see all the details of the movie (movie card) and edit it in case he is the one who uploaded the movie to BuddyFilms.

​

## User stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist.

- **Homepage** - As a user I want to be able to access the homepage with signup and login buttons.

- **Signup** - As a user I want to sign up to the website application to be able to use all its funcionalities.

- **Login** - As a user I want to be able to log in to the website application so I can get back to my account.

- **Logout** - As a user I want to be able to log out from the website application so that I can make sure no one will access my account.

- **See movies** - As a user I want to be able to see all the movies of all the users.

- **Movie detail** - As a user I want to be able to see the detail of a movie.

- **New movie** - As a user I want to be able to add a movie.

- **Update movie** - As a user I want to be able to update the information of my movies.

- **Watchlist** - As a user I want to be able to see the list of the movies I chose to watch.

- **User profile** - As a user I want to be able to see my profile.

​

## Backlog

- **Filter** - As a user I want to be able to filter the movies by categories such as Buddy, Watched, Rating.

- **Watched** - As a user I want to be able to mark a movie as Watched.

- **Rating** - As a user I want to be able to rate the movies with stars.

- **Review** - As a user I want to be able to write a review of the movies via a comment below the movie card.

​

## Models

### User model

```js
{
  email: { type: String, required: true, unique: true, match: [/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Please use a valid email address.'] },
  password: { type: String, required: [true, 'Password is required.'] },
}
```

### Movie model

```js
{
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  title: {
    type: String,
    required: true,
  },
  year: Number,
  country: String,
  director: String,
  channel: String,
  buddy: String,
  synopsis: String,
  rating: Number,
  imageUrl: String,
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

### Setup .env

You need to setup the `.env`

​

### Install the app

```
npm install
```

​

### Run the app with nodemon

```
npm run start:dev
```

​

## REST API endpoints

| Name         | Method | Endpoint          | Request body                                                                          | Redirects   |
| ------------ | ------ | ----------------- | ------------------------------------------------------------------------------------- | ----------- |
| Homepage     | GET    | `/`               |                                                                                       |             |
| Signup       | POST   | `/auth/signup`    | { email, password }                                                                   | /auth/login |
| Login        | POST   | `/auth/login`     | { email, password }                                                                   | /api/movies |
| Verify       | GET    | `/auth/verify`    |                                                                                       |             |
| See movies   | GET    | `/api/movies`     |                                                                                       |             |
| Movie detail | GET    | `/api/movies/:id` |                                                                                       |             |
| New movie    | POST   | `/api/movies`     | { owner, title, imageUrl, year, country, director, channel, buddy, synopsis, rating } | /api/movies |
| Update movie | PUT    | `/api/movies/:id` | { owner, title, imageUrl, year, country, director, channel, buddy, synopsis, rating } | /api/movies |
| Watchlist    | GET    | `/api/watchlist`  | { movieId }                                                                           |             |
| User profile | GET    | `/api/profile`    |                                                                                       |             |

​

## Links

- [Slides](https://slides.com/michaelajelinkova/buddy-films/fullscreen)
- [Frontend repository](https://github.com/jelin-mi/project-frontend)
- [Deployed version](https://buddy-films.netlify.app)
- [Instructions](https://slides.com/michaelajelinkova/buddy-films-instructions/fullscreen)
