# MongoDB Atlas CRUD Tutorial with Express

This is am implementation of https://zellwk.com/blog/crud-express-mongodb/ done alongside [\#100Devs](https://leonnoel.com/100devs/) for refresher practice using Nodejs, Express, and MongoDB Atlas.

**Link to project:** (to be determined)

![alt tag](http://placecorgi.com/1200/650)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript, MongoDB, Node, Express

I have my own MongoDB servers but finally decided to kick the tires on MongoDB Atlas. That's working well, and I hid my password in an environment variable.

## Optimizations

I did some minor style optimizations like destructuring the `MongoClient` `require` statement and shortcut `req` and `res` like the cool kids. I also spelled Darth Vader's name correctly in the 50 plaecs it's in the code.

It could use some `console.log()` cleanup, and I don't like the fact that update and delete aren't idempotent so I would fix that if I were to continue on this project.

## Lessons Learned:

- MongoDB Atlas is fine
- Apparently *both* `'view-engine'` *and* `'view engine'` are equivalent and valid settings for `app.set()` ?!

## Examples:

Take a look at these couple examples that I have in my own portfolio:

**First Heroku:** https://github.com/JimOfLeisure/heroku-first

**Streamer Background:** https://github.com/JimOfLeisure/streamer-background

**HTML5Up Phantom Plus:** https://github.com/JimOfLeisure/html5up-phantom-plus
