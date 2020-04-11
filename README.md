# Get the Code
```
git clone https://github.com/MohammedNader99/Backend-team.git
```

### Dependencies

* NodeJS version 13.9.0
* MongoDB version 1.20.5


___Note___ :open using any text editor ex: Visual studio code, Atom..


# Development server

Navigate to http://localhost:8000/. The app will automatically reload 

# Build
## Install
you can run these commands to install :

```sh
npm install														# Install dependencie
```

## Run

Once installed, you can launch with this command:
```sh
# Running 
node Index.js
```

# seeds and modules example 
### Playlist Module:
It Contains (Name, Owner Id, Privacy, Cover Picture and the tracks that this playlist has)
```js
// for example
"playlist":[
    "Name":"...."
    "OwnerID":"...."
    "Privacy":"...."
    "CoverPic":"...."

    "Traks":{
        "ID":[
            "...."
            "...."
            "...."
        ]
    }
]
```

Seed ex: Classics that belongs to the user whose username is Hamadaaa , it is private and contains four tracks. 
```js
// for example
"playlist":[
    "Name":"Classics"
    "OwnerID":"4pdf445ksdjn2as23ws26d6d"
    "Privacy":"True"
    "CoverPic":"default.png"

    "Traks":{
        "ID":[
            "5e8cdc99c70aba1405d52022",
            "4pdf445ksdjn2as23ws26d6d",
            "5e8cdc99c70aba1405d52022"
        ]
    }
]
```


# Running unit tests

```sh
npm test               
```

# Generating Doc file 

```sh
npm run doc
```

# Generating API Doc 

```sh
apidoc -f “api\.js$”
```
