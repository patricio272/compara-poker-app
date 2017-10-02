# compara-poker-app
ComparaOnline Poker WebApp made with Node.js v7.4.0, Sails.js v0.12.13 & @angular/cli v1.0.0-beta.32.3

The backend was made with Sails.js for 2 reasons:
* Client has no access to final endpoint, this adds a security layer to the server where the actual endpoints live.
* Error handling and fault tolerance is transparent to the client.

### Installation

```sh
$ npm install -g @angular/cli
$ npm install -g sails
$ git checkout development
$ cd backend && npm install
$ cd ..
$ cd frontend && npm install
$ cd ..
```

### Running Backend

```sh
$ cd backend
$ sails lift
```

### Running Frontend

```sh
$ cd frontend
$ ng serve
```

Once everything is up & running, in your browser, go to http://localhost:4200

Have fun!!
