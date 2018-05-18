### - Firebase administration tools

> Administration tools for Firebase project with Nuxt.js

### - Requirements

You need [nodejs](https://nodejs.org/en/) with npm

### - First of all

- setting *server/config.js* 
  - set session keys (generate random [here](https://randomkeygen.com/))
  - set firebase API key and projectId


- get service accounts key
  - go to firebase project
  - move to "Project Settings -> Service Accounts"
  - generate key, rename and place to root of project


- setting database
	- enable cloud firestore with strict access
	- create user in firebase project (Authentication page) and copy uid
	- add collection "*administration-users*" with document "[your user uid]"
	- in user document set default structure:
		- email (*String*) = your user email
		- uuid (*String*) = your user uid
		- appearance (*Object*)
			- navigation (*Boolean*) = true/false
			- theme (*String*) = Light/Dark
			- color (*String*) = blue-grey
	- add collection "*administration-settings*" with document "*defaults*"
	- in defaults document set default appearance:
		- appearance (*Object*)
			- theme (*String*) = Dark/Light
			- color (*String*) = blue-grey

### - Build Setup

``` bash
# install dependencies
$ npm install

# craft svg icons
$ npm run icons

# serve with hot reload at localhost:8080
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://nuxtjs.org/guide) and [Firebase docs](https://firebase.google.com/docs/web/setup).
