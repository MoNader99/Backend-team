define({ "api": [
  {
    "type": "post",
    "url": "api/album/:id/delete",
    "title": "delete album",
    "name": "Delete_album",
    "group": "Album",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>token to delete album</p>"
          }
        ],
        "Response Header": [
          {
            "group": "Response Header",
            "type": "String",
            "optional": false,
            "field": "x-auth",
            "description": "<p>[token given for the logging in user]</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[authentication failed]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden                [this album is not the artist's album]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Not found                [this album is not found]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n{\n   \"Token is not valid\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n   \"NotAuthorized\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Forbidden\n{\n   \"Notfound\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Album"
  },
  {
    "type": "post",
    "url": "api/album//like/:id",
    "title": "like album",
    "name": "Like_album",
    "group": "Album",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>user token to like album</p>"
          }
        ],
        "Response Header": [
          {
            "group": "Response Header",
            "type": "String",
            "optional": false,
            "field": "x-auth",
            "description": "<p>[token given for the logging in user]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n     {\n\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[authentication failed]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden                [Repeating the request more than once for the same user and the same album]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Not found                [this album is not found]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n{\n   \"Token is not valid\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n{\n   \"Token is Empty\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n   \"You have already liked that album\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"No album found\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"Invalid id\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Album"
  },
  {
    "type": "post",
    "url": "api/users/login",
    "title": "login for artist",
    "name": "Artist_login",
    "group": "Artists",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"ayamahmoudabdelfatah99@gmail.com\",\n  \"password\":\"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Response Header": [
          {
            "group": "Response Header",
            "type": "String",
            "optional": false,
            "field": "x-auth",
            "description": "<p>[token given for the logging in user]</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[authentication failed]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden                [User is not activated]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n{\n   \"Either email or passwrod is incorrect\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n   \"Please go to your inbox and click the link to activate your Email.\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Artists"
  },
  {
    "type": "post",
    "url": "/artists/profilepicture",
    "title": "Edit profile picture of the artist",
    "name": "Edit_profile_picture_of_the_artist",
    "group": "Artists",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Only an artist who has a verified account can edit his/her profile picture</p>"
          },
          {
            "group": "Header",
            "type": "JSON",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>The content of the request body in JSON format.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "Image",
            "description": "<p>Image he/she wants to upload to be his/her profile picture (MUST BE AN IMAGE with any extension)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>[The response of the sucess case is a message]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n       \"Image changed successfully\"\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>[no image file]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Cannot edit pp without auth token]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"Please Upload an image\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": Please Upload an image\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 No access\n{\n  \"error\": \"Unauthorized Access\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Artists"
  },
  {
    "type": "get",
    "url": "/artists",
    "title": "Get several Artists",
    "name": "GetSeveralArtists",
    "group": "Artists",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>Authorization Required. A valid access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "id",
            "description": "<p>ids array of each Artist's unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "artists",
            "description": "<p>An array of Artist objects containing the full details of each  Artist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"artists\": [\n        {\n            \"artistName\": \"Adele\",\n            \"genres\": [\n                \"pop\",\n                \"R&B\"\n            ],\n            \"about\": \"Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter\\n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\\n      commercial success unsurpassed among her peers.\",\n            \"rating\": 4\n        },\n        {\n            \"artistName\": \"HAmo Beeka\",\n            \"genres\": [\n                \"sha3by\",\n                \"R&B\"\n            ],\n            \"about\": \"Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter\\n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\\n      commercial success unsurpassed among her peers.\",\n            \"rating\": -1\n        },\n        {\n            \"artistName\": \"Eminem\",\n            \"genres\": [\n                \"Trap\",\n                \"Jazz\",\n                \"pop\",\n                \"Rap\"\n            ],\n            \"about\": \"Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem\\n     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer,\\n     record executive and actor. He is one of the most successful musical artists of the 21st century.\",\n            \"rating\": 4.6\n        }\n    ]\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Authentication failed,The token sent didn't belong to any user]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>[exceeded 50 ids]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>[invalid id]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>[artist not found]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AuthError-Response:",
          "content": "HTTP/1.1 401  Authentication Failure\n{\n   \"message\":\"authentication failed\"\n}",
          "type": "json"
        },
        {
          "title": "BadRequest-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\":\"maximum 50 ids\"\n}",
          "type": "json"
        },
        {
          "title": "forbidden-Response:",
          "content": "HTTP/1.1 403 forbidden\n{\n  \"message\":\"invalid id\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404\n{\n   \"message\":  \"artist not found\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Artists"
  },
  {
    "type": "Get",
    "url": "api/Artists/:id",
    "title": "Get artist",
    "name": "Get_Artist",
    "group": "Artists",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the artist needed to be retrived</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "object",
            "description": "<p>of type artist in JSON formatwith status code 200</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200 OK\n  {\n          \"artist\": {\n    \"_id\": \"5e6942b6646c86bc20fc9a93\",\n    \"email\": \"beeka70@hotmail.com\",\n    \"password\": \"$2b$10$sqP.uu/YJzYg0vErxw24TeMe8eeUzPtWCrSST8gGn9wMxYNQxqGNS\",\n    \"artistName\": \"HAmo Beeka\",\n    \"about\": \"Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter \\n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\\n      commercial success unsurpassed among her peers.\",\n    \"__v\": 0,\n    \"isActive\": false,\n    \"rating\": -1,\n    \"genres\": [\n        \"sha3by\",\n        \"R&B\"\n    ]\n}\n  }",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>authentication failed</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>[id is invalid]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request                    [Error while executing request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n {\n   \"Token is not valid\"\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"invalid id\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404\n{\n  \"can not find artist\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Artists"
  },
  {
    "type": "get",
    "url": "api/artists/confirm/:code",
    "title": "SignUp Confrimation",
    "name": "SignUp_Confirmed_for_artists",
    "group": "Artists",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>artist-specific code to activate his account</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "artist",
            "description": "<p>was activated successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"Email confirmed successfully!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized.",
            "description": "<p>Recieved a corrupted code.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "artist",
            "description": "<p>not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Artists"
  },
  {
    "type": "post",
    "url": "api/artists/signup",
    "title": "Create a new artist",
    "name": "SignUp_Request_for_artists",
    "group": "Artists",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "artistName",
            "description": "<p>Unique name of the artist</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the artist</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the artist</p>"
          },
          {
            "group": "Parameter",
            "type": "Srting",
            "optional": false,
            "field": "about",
            "description": "<p>A minimum of 100 characters that describe the artist</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "Artist",
            "description": "<p>added Successfully as inActive. Waiting for Email Confirmation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"Artist added Successfully as inActive. Waiting for Email Confirmation \"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "409": [
          {
            "group": "409",
            "optional": false,
            "field": "Conflict.",
            "description": "<p>the Artist already exists: duplicate artistName or email</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Internal",
            "description": "<p>Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Conflict Error-Response:",
          "content": "\"artistName and/or Email already exists \"",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Artists"
  },
  {
    "type": "post",
    "url": "/tracks/:playlistId/playlists",
    "title": "Add tracks to a playlist",
    "name": "AddTracksToAPlaylist",
    "group": "Playlists",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": ""
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "playlistId",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "url",
            "description": "<p>a list of Urls to be passed in the body parameters</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>[tracks has been successfully added to playlist]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\n  \"message\": \"tracks added successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>[Forbidden because you crossed the limiting number of tracks in a playlist which is 10]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[authentication failed]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>[playlist or tracks not found]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n   \"message\":  \"Forbidden because you crossed the limiting number of tracks in a playlist which is 1000\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n{\n   \"message\":  \"authentication failed\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404\n{\n   \"message\":  \"playlist not found\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404\n{\n   \"message\":  \"tracks not found\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Playlists"
  },
  {
    "type": "post",
    "url": "/playlists",
    "title": "Create a new playlist",
    "name": "CreatePlaylist",
    "group": "Playlists",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Only an User who has a verified account can create a playlist</p>"
          },
          {
            "group": "Header",
            "type": "JSON",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>The content of the request body in JSON format.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "playlistName",
            "description": "<p>Playlist name. (Obligatory)</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "privacy",
            "description": "<p>if the playlist is public or private (OPTIONAL default value is false)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "201",
            "description": "<p>[The response of the sucess case is the created playlist object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 201 OK\n{\n     \"_id\" : ObjectId(\"5e7511fa1a2c59902efa5544\"),\n     \"userId\" : \"5e7511fa1a2c59902efa552a\",\n     \"playlistName\" : \"RecyleBin\",\n     \"image\" : image object\n     \"tracks\" : [],\n    \"privacy\" : false,\n     \"__v\" : 0\n\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Cannot create playlist without auth token]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>[user cannot have 2 playlists with the same name]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>[wether there is a problem in creating or saving the playlist (unlikely to happen)]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 No access\n{\n  \"error\": \"Unauthorized Access\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Cannot create 2 playlists with the same name\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 No access\n{\n  \"error\": \"Could not create playlist\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Coult not create playlist due to missing info\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Playlists"
  },
  {
    "type": "delete",
    "url": "/playlists",
    "title": "Delete playlist",
    "name": "DeletePlaylist",
    "group": "Playlists",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Only a user  who has a verified account can delete his/her playlist</p>"
          },
          {
            "group": "Header",
            "type": "JSON",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>The content of the request body in JSON format.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "playlistName",
            "description": "<p>the name of the playlist he want to delete a track from</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>[the playlist has been deleted successfully]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200\n{\n  \"Playlist deleted succsesfully\"\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>[playlist name must be passed]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>[the passed playlist name doesnot belong to this user]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Cannot delete the playlist without auth token]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>[Cannot delete the playlist due to internal server error (Unlikely)]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Pass the playlistname that you want to delete\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"No playlist found to delete\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 No access\n{\n  \"error\": \"Unauthorized Access\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 No access\n{\n  \"error\": \"Could not delete playlist\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Playlists"
  },
  {
    "type": "delete",
    "url": "/playlists/tracks",
    "title": "Delete Track from playlist",
    "name": "DeleteTrackFromPlaylist",
    "group": "Playlists",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Only a user  who has a verified account can delete a track from his playlist</p>"
          },
          {
            "group": "Header",
            "type": "JSON",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>The content of the request body in JSON format.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "playlistName",
            "description": "<p>the name of the playlist he want to delete a track from</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "trackID",
            "description": "<p>the track id he wants to remove from his/her playlist</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>[the track has been deleted successfully]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200\n{\n  \"Track is successfully deleted from playlist\"\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>[playlist name must be passed]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>[the passed track id is not a valid track]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Cannot delete the track without auth token]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>[Cannot delete the track due to internal server error (Unlikely)]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Pass the playlistname that you want to delete a track from\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Pass the trackId that you want to delete\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"Invalid Track Id\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"Playlist not found\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Track is not in the playlist\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 No access\n{\n  \"error\": \"Unauthorized Access\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 No access\n{\n  \"error\": \"Could not remove the track from the playlist\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Playlists"
  },
  {
    "type": "get",
    "url": "/playlists/images",
    "title": "Get a playlist cover image",
    "name": "GetPlaylistCoverImage",
    "group": "Playlists",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Only an User who has a verified account can get the image of a playlist</p>"
          },
          {
            "group": "Header",
            "type": "JSON",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>The content of the request body in JSON format.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "playlistName",
            "description": "<p>Name of the playlist he wants to get its cover image</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "302",
            "description": "<p>[The response of the sucess case is the url to the image file]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 302\n{\n          .real Server Url will  be here/Pictures/default.png\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>[playlist name is missing (Obligatory filed)]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>[The passed playlist name doesnot belong to the user]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>[internal server error (Unlikely)]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Cannot create playlist without auth token]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Pass the playlistname to get it's image\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"Playlist does not exist\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 No access\n{\n  \"error\": \"Could not send the image\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 No access\n{\n  \"error\": \"Unauthorized Access\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Playlists"
  },
  {
    "type": "Get",
    "url": "api/Search",
    "title": "Search about a word",
    "name": "Search",
    "group": "Search",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "word",
            "description": "<p>word to search about</p>"
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>token to search</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "object",
            "description": "<p>containing five simplified arrays artists albums tracks profiles and playlists</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n     {\n{\n   \"artists\": [\n       {\n           \"_id\": \"5e6942b6646c86bc20fc9a92\",\n           \"artistName\": \"Adele\",\n           \"image\": {\n               \"data\": {\n                   \"type\": \"Buffer\",\n                   \"data\": [                  ]\n               },\n               \"_id\": \"5e7f8d10cf1f565c1d21a6cd\"\n           }\n       }\n   ],\n   \"Albums\": [\n       {\n          \"_id\": \"5e7a8bb2a986d07c0c22277d\",\n           \"albumName\": \"25\",\n           \"image\": {\n               \"data\": {\n                   \"type\": \"Buffer\",\n                   \"data\": [                  ]\n               },\n               \"_id\": \"5e7f8d10cf1f565c1d21a6cd\"\n           }\n       },\n           \"artistName\": \"Adele\",\n           \"artistId\": \"5e6942b6646c86bc20fc9a92\"\n       }\n   ],\n   \"Tracks\": [\n       {\n           \"_id\": \"5e7e626d4849be7c17be3552\",\n           \"trackName\": \"Hello\",\n           \"image\": {\n               \"data\": {\n                   \"type\": \"Buffer\",\n                   \"data\": [                  ]\n               },\n               \"_id\": \"5e7f8d10cf1f565c1d21a6cd\"\n           }\n       },\n           \"artistId\": \"5e6942b6646c86bc20fc9a92\"\n       }\n   ],\n       \"Playlists\": \"Playlists\": [\n       {\n           \"_id\": \"5e6942b6646c86bc20fc9a89\",\n           \"playlistName\": \"Dejavu\",\n           \"image\": {\n               \"data\": {\n                   \"type\": \"Buffer\",\n                   \"data\": [                  ]\n               },\n               \"_id\": \"5e7f8d10cf1f565c1d21a6cd\"\n           },\n           \"userName\": \"hamadaaa\",\n           \"userId\": \"5e6d547b639f2ca419a1c08d\"\n       }\n],\n                   ,\n  \"Users\": [{\n                   \"_id\": \"5e6d547b639f2ca419a1c08d\",\n           \"userName\": \"hamadaaa\",\n           \"image\": {\n               \"data\": {\n                   \"type\": \"Buffer\",\n                   \"data\": []\n                                   },\n               \"_id\": \"5e7f8d10cf1f565c1d21a6cd\"\n           }\n       }]\n     }",
          "type": "JSON"
        },
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n     {\n\n\n\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>authentication failed</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>Bad Request                    [Error while executing request</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n {\n   \"Token is not valid\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Search"
  },
  {
    "type": "post",
    "url": "api/track/like/:id",
    "title": "like track",
    "name": "Like_track",
    "group": "Track",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>user token to like track</p>"
          }
        ],
        "Response Header": [
          {
            "group": "Response Header",
            "type": "String",
            "optional": false,
            "field": "x-auth",
            "description": "<p>[token given for the logging in user]</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n     {\n\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[authentication failed]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden                [Repeating the request more than once for the same user and the same album]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Not found                [this album is not found]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n{\n   \"Token is not valid\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n{\n   \"Token is Empty\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n   \"You have already liked that track\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"No album found\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"Invalid id\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Track"
  },
  {
    "type": "post",
    "url": "/tracks",
    "title": "Add Track",
    "name": "AddTrack",
    "group": "Tracks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Only an Artist who has a verified account can add a track</p>"
          },
          {
            "group": "Header",
            "type": "JSON",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>The content of the request body in JSON format.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Track name. (Obligatory)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "URL",
            "description": "<p>the track URL  (Obligatory)</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "Duration",
            "description": "<p>Duration of the track in ms  (Obligatory)</p>"
          },
          {
            "group": "Parameter",
            "type": "object[]",
            "optional": false,
            "field": "image",
            "description": "<p>object      the cover image of the track (Obligatory)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "genre",
            "description": "<p>each track has only 1 genre. (Obligatory)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "201",
            "description": "<p>[The response of the sucess case is the created track object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 201 OK\n{\n     \"_id\" : ObjectId(\"5e7511fa1a2c59902efa5539\"),\n     \"artistId\" : \"5e7511fa1a2c59902efa552d\",\n     \"trackName\" : \"Godzilla\",\n      \"duration\" : 223000,\n      \"image\" : {\n         \"url\" : \"www.images/imag23e/23454\",\n         \"height\" : 176,\n         \"width\" : 65,\n         \"_id\" : ObjectId(\"5e7511fa1a2c59902efa5528\")\n      },\n     \"url\" : \"vvv\",\n     \"genre\" :\"Trap\"\n     \"rating\" : 9,\n     \"__v\" : 0\n\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Cannot upload the track without auth token]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>[Cannot upload the track without track name]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "409",
            "description": "<p>[url of an aleardy created track is passed.Cannot create 2 tracks with the same url ]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>[wehter there is a problem in creating or saving the track (unlikely to happen)]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 No access\n{\n  \"error\": \"Unauthorized Access\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Track name is required\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Track image is required\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Track url is required\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Track duration is required\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Image Info of track has to be provided\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 No access\n{\n  \"error\": \"This track is already created\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 409 No access\n{\n  \"error\": \"Cannot create 2 Tracks with the same name (trackName) for the same artist\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 No access\n{\n  \"error\": \"Could not add track (trackName)\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Tracks"
  },
  {
    "type": "delete",
    "url": "/tracks",
    "title": "Delete Track",
    "name": "DeleteTrack",
    "group": "Tracks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Only an Artist who has a verified account can delete his tracks</p>"
          },
          {
            "group": "Header",
            "type": "JSON",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>The content of the request body in JSON format.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "trackName",
            "description": "<p>the name of the track that the artist wants to delete(an artist cannot have 2 tracks with the same name)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>[the track has been deleted successfully]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " HTTP/1.1 200\n{\n  \"Track (trackName) was deleted successfully\"\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>[Cannot delete without the track name]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>[the artist is not the owner of this track or track does not exist]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Cannot delete the track without auth token]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>[Cannot delete the track due to internal server error (Unlikely)]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Pass the track name to delete\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"Track not found to be deleted\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 No access\n{\n  \"error\": \"Unauthorized Access\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 No access\n{\n  \"error\": \"Could not delete track \"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Tracks"
  },
  {
    "type": "Get",
    "url": "/tracks",
    "title": "Get several Track",
    "name": "GetSeveralTracks",
    "group": "Tracks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string[]",
            "optional": false,
            "field": "id",
            "description": "<p>An array of comma separated tracks Ids. Maximum 10 IDs.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object[]",
            "optional": false,
            "field": "tracks",
            "description": "<p>a set objects of type tracks in JSON format with status code 200</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n    \"tracks\": [\n        {\n            \"_id\": \"5e88ce838d92547020e1a65a\",\n            \"artistId\": \"5e88ce838d92547020e1a652\",\n            \"trackName\": \"Godzilla\",\n            \"duration\": 223000,\n            \"genre\": \"rap\",\n            \"url\": \"vvv\",\n            \"__v\": 0,\n            \"imagePath\": \"./Pictures/default.png\",\n            \"likes\": 0,\n            \"rating\": 9\n        },\n        {\n            \"_id\": \"5e88ce838d92547020e1a656\",\n            \"artistId\": \"5e88ce838d92547020e1a650\",\n            \"trackName\": \"Hello\",\n            \"duration\": 360000,\n            \"genre\": \"pop\",\n            \"url\": \"uuu\",\n            \"__v\": 0,\n            \"imagePath\": \"./Pictures/default.png\",\n            \"likes\": 0,\n            \"rating\": 10\n        }\n    ]\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>[Track not found]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n \"message\": \"can not find track\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\" : \"invalid id\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 forbidden\n{\n  \"message\" : \"max 50 Ids\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Tracks"
  },
  {
    "type": "Get",
    "url": "/tracks/:id",
    "title": "Get a Track",
    "name": "GetTrack",
    "group": "Tracks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the track that the artist wants to delete</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "tracks",
            "description": "<p>object of type track in JSON formatwith status code 200</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"tracks\": {\n    \"rating\": 10,\n    \"duration\": 360000,\n    \"_id\": \"5e6b7dac91cb724878446635\",\n    \"trackName\": \"Hello\",\n    \"url\": \"cccc\",\n    \"__v\": 0\n}\n }",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>[Track not found]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"Track not found\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404\n{\n  \"message\": \"invalid id\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Tracks"
  },
  {
    "type": "post",
    "url": "/users/forgot",
    "title": "Request to send email after forgetting password",
    "name": "ForgotPasswordRequest",
    "group": "User_privacy",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>in json form</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"abc@abc.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\" :\"Email Sent Successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>[Email Cannot BeSent  A problem while sending email]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>[email of the user not found ]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 serverError\n{\n  \"message\":\"Sending Failed\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 not found\n{\n   \"message\":\"Email not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "User_privacy"
  },
  {
    "type": "patch",
    "url": "/users/reset",
    "title": "Request to reset password",
    "name": "ResetRequest",
    "group": "User_privacy",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "token",
            "description": "<p>should be passed in query</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "newPassword",
            "description": "<p>should be passed in body in json form</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n \"message\": \"Password has been reset successfully\"\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 unauthorized\n{\n  \"message\": \"Reset Failed\"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "User_privacy"
  },
  {
    "type": "patch",
    "url": "/users/confirmPremium",
    "title": "User is confirmed to be a premium user",
    "name": "Acceptance_of_Premium_Request",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>the token that was sent in the link snet to the user's email</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n      \"message\" : \"Email confirmed successfully,Welcome To Premium Life!\"\n\n\n\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>authentication failed</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>user not found</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n {\n   \"message\":\"authentication Failed or invalid token\"\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404\n {\n   \"message\":\"not found\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "patch",
    "url": "/api/users/me/editprofile",
    "title": "edit current user's profile",
    "name": "Edit_Current_User's_Profile",
    "group": "Users",
    "header": {
      "fields": {
        "Header Fields": [
          {
            "group": "Header Fields",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Required. A valid access token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Body Parameters": [
          {
            "group": "Body Parameters",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>the name visible to othe users.</p>"
          },
          {
            "group": "Body Parameters",
            "type": "string",
            "optional": false,
            "field": "birthDate",
            "description": "<p>user's birthdate.</p>"
          },
          {
            "group": "Body Parameters",
            "type": "string",
            "optional": false,
            "field": "gender",
            "description": "<p>user's gender 'M' or 'F'.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "Bad",
            "description": "<p>request. invalid body parameters such as birthDate or gender.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Authentication",
            "description": "<p>failed.</p>"
          }
        ],
        "403": [
          {
            "group": "403",
            "optional": false,
            "field": "Conflict.",
            "description": "<p>userName already exists</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "user",
            "description": "<p>not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "AuthError-Response:",
          "content": "HTTP/1.1 401 Access denied\n{\n  \"error\": \"Authentication failed or invalied token.\"\n}",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "/users/profilepicture",
    "title": "Edit profile picture of the user",
    "name": "Edit_profile_picture_of_the_user",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Only an User who has a verified account can edit his/her profile picture</p>"
          },
          {
            "group": "Header",
            "type": "JSON",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>The content of the request body in JSON format.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "Image",
            "description": "<p>Image he/she wants to upload to be his/her profile picture (MUST BE AN IMAGE with any extension)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "200",
            "description": "<p>[The response of the sucess case is a message]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200\n{\n       \"Image changed successfully\"\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>[no image file]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Cannot edit pp without auth token]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"Please Upload an image\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": Please Upload an image\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 No access\n{\n  \"error\": \"Unauthorized Access\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/artists/related",
    "title": "Get Artists who sing at least 1 same genre as the passed artist",
    "name": "GetArtistRelatedArtists",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Only an User who has a verified account</p>"
          },
          {
            "group": "Header",
            "type": "JSON",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>The content of the request body in JSON format.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "artistId",
            "description": "<p>Id of the artist the  user wants to get his/her related artists</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "302",
            "description": "<p>[The response of the sucess case is an array of artists]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 302\n{\n       [\n  {\n      \"_id\": \"5e7511fa1a2c59902efa552d\",\n      \"password\": \"5080\",\n      \"artistName\": \"Eminem\",\n      \"about\": \"Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem\\n     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer, \\n     record executive and actor. He is one of the most successful musical artists of the 21st century.\",\n      \"__v\": 0,\n      \"isActive\": false,\n      \"rating\": 4.6,\n      \"genres\": [\n          \"Trap\",\n          \"Jazz\",\n          \"pop\",\n          \"Rap\"\n      ]\n  },\n  {\n      \"_id\": \"5e7511fa1a2c59902efa552c\",\n      \"email\": \"beeka70@hotmail.com\",\n      \"password\": \"$2b$10$sqP.uu/YJzYg0vErxw24TeMe8eeUzPtWCrSST8gGn9wMxYNQxqGNS\",\n      \"artistName\": \"HAmo Beeka\",\n      \"about\": \"Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter \\n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\\n      commercial success unsurpassed among her peers.\",\n      \"__v\": 0,\n      \"isActive\": false,\n      \"rating\": -1,\n      \"genres\": [\n          \"sha3by\",\n          \"R&B\"\n      ]\n  }\n ]\n\n}",
          "type": "JSON"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Cannot get related artists without auth token]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>[the artist id is not found in the DB]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>[the artist id is not passed]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 No access\n{\n  \"error\": \"Unauthorized Access\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"Id not found\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"Invalid Id\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Send the artist ID\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:id/premium",
    "title": "Send a confirmation mail to be a premium user",
    "name": "Join_Premium_Request",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>token Only users can request to premium</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the user should be passed in the path</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\n  \"message\": \"confirmation request has been sent, You will be a premium user soon\"\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\n  \"message\": \"You are already a premium user.Thanks for that\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>authentication failed</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>EmailCannotBeSent  A problem while sending email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n {\n   \"message\":\"authentication Failed\" \"\n }",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 server Error\n{\n  \"message\":\"error,failed to send\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "api/users/confirm/:code",
    "title": "SignUp Confrimation",
    "name": "SignUp_Confirmed_for_user",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>user-specific code to activate his account</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "User",
            "description": "<p>was activated successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"Email confirmed successfully!\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "401": [
          {
            "group": "401",
            "optional": false,
            "field": "Unauthorized.",
            "description": "<p>Recieved a corrupted code.</p>"
          }
        ],
        "404": [
          {
            "group": "404",
            "optional": false,
            "field": "User",
            "description": "<p>not found.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "api/users/signup",
    "title": "Create a new user",
    "name": "SignUp_Request_for_Users",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>Unique name of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isPremium",
            "description": "<p>default is false</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isActive",
            "description": "<p>default is false until the email is confirmed</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "birthDate",
            "description": "<p>birthdate of the user</p>"
          },
          {
            "group": "Parameter",
            "type": "Srting",
            "optional": false,
            "field": "gender",
            "description": "<p>gender of the user-Limited to 'M' or 'F'</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "optional": false,
            "field": "User",
            "description": "<p>added Successfully as inActive. Waiting for Email Confirmation</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"User added Successfully as inActive. Waiting for Email Confirmation \"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "409": [
          {
            "group": "409",
            "optional": false,
            "field": "Conflict.",
            "description": "<p>the user already exists: duplicate userName or email</p>"
          }
        ],
        "500": [
          {
            "group": "500",
            "optional": false,
            "field": "Internal",
            "description": "<p>Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Conflict Error-Response:",
          "content": "HTTP/1.1 409\n   \"UserName and/or Email already exists \"",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "post",
    "url": "api/users/login",
    "title": "login for user",
    "name": "User_login",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"ayamahmoudabdelfatah99@gmail.com\",\n  \"password\":\"1234\"\n}",
          "type": "json"
        }
      ]
    },
    "header": {
      "fields": {
        "Response Header": [
          {
            "group": "Response Header",
            "type": "String",
            "optional": false,
            "field": "x-auth",
            "description": "<p>[token given for the logging in user]</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[authentication failed]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "403",
            "description": "<p>Forbidden                [User is not activated]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n{\n   \"Either email or passwrod is incorrect\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n   \"Please go to your inbox and click the link to activate your Email.\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "patch",
    "url": "/users/:id/regular",
    "title": "User wants to unsubscribe from premium features",
    "name": "WithdrawPremiumServies",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>the token Only users</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the user has to be passed</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Your account has been changed to regular account\"\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 200\n {\n   \"message\":\"you are not premium , you already have a regular account \"\n }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[ authentication failed]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n {\n   \"message\":\"authentication Failed\" \"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  }
] });
