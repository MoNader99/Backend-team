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
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n \"deleted\"\n }",
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
            "description": "<p>Forbidden                [this album is not the artist's album]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Not found                [this album is not found or the id is not an object id]</p>"
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
          "content": "HTTP/1.1 404 Not found \n{\n   \"Notfound\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"invalid id\"\n}",
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
    "url": "/album/coverimage",
    "title": "Edit cover image of the album",
    "name": "Edit_Album_cover_image",
    "group": "Album",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>(artistToken)Only an artist who has a verified account can edit his/her album cover image</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "albumId",
            "description": "<p>Id of the album to be edited</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "photo",
            "description": "<p>sent as file in in form-data</p>"
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
          "content": "HTTP/1.1 200\n{\n       \"Album Image changed successfully\"\n}",
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
            "field": "404",
            "description": "<p>[Album is not found]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Cannot change track cover image without auth token]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Please Upload an image\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": Please Upload an image\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Missing Album Id\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"Album is not found.May be removed by the artist\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"Invalid Album ID\"\n}",
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
    "groupTitle": "Album"
  },
  {
    "type": "get",
    "url": "/album/:id",
    "title": "Get Album",
    "name": "GetAlbum",
    "group": "Album",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>Required</p>"
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
            "field": "albumId",
            "description": "<p>Id of the album in the url</p>"
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
            "description": "<p>[The response of the success case is an album object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 302\n{\n  \"returnedAlbum\": {\n      \"_id\": \"5e8cea27f80b6f47045be012\",\n      \"albumName\": \"This Acting\",\n      \"imagePath\": \"sia.png\",\n      \"artistName\": \"Sia\",\n      \"tracks\": [\n          \"5e8cea26f80b6f47045be001\",\n          \"5e8cea26f80b6f47045be002\"\n      ],\n      \"likes\": 9\n  }\n}\n\n}",
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
            "description": "<p>Not found                   [the album id is not found ]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized               [authentication failed]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found \n{\n  \"Id not found\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized\n{\n   \"Token is Empty\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized \n{\n   \"User does not have access or does not exist\"\n}",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Album"
  },
  {
    "type": "get",
    "url": "/albums/homepage/popular",
    "title": "Get popular Albums for homepage",
    "name": "GetPopularAlbums",
    "group": "Album",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>Required token of the user</p>"
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
            "field": "albums",
            "description": "<p>An array of Album objects containing the full details of each  Album</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n     \"albums\": \n[\n   {\n      \"_id\": \"5e89f2caaaa6bd3f481675f5\",\n      \"artistId\": \"5e89f2caaaa6bd3f481675eb\",\n      \"albumName\": \"25\",\n      \"__v\": 0,\n      \"likes\": 88,\n      \"rating\": 5,\n      \"tracks\": [\n          \"5e89f2caaaa6bd3f481675f0\",\n          \"5e89f2caaaa6bd3f481675f1\"\n      ],\n      \"imagePath\": \"default.png\"\n},\n\n  {\n      \"_id\": \"5e89f2caaaa6bd3f481675f6\",\n      \"artistId\": \"5e89f2caaaa6bd3f481675e8\",\n      \"albumName\": \"bla bla\",\n      \"__v\": 0,\n      \"likes\": 100,\n      \"rating\": 5,\n      \"tracks\": [\n          \"5e89f2caaaa6bd3f481675f0\",\n          \"5e89f2caaaa6bd3f481675f1\"\n      ],\n      \"imagePath\": \"default.png\"\n}\n],\n\n}",
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
            "description": "<p>Unauthorized               [authentication failed]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized \n{\n   \"message\":\"authenticaton failed\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Album"
  },
  {
    "type": "get",
    "url": "/albums/byartist/:artistId",
    "title": "Get Albums by an artist",
    "name": "Get_Albums_by_an_artist",
    "group": "Album",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>Required</p>"
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
            "description": "<p>Id of the artist</p>"
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
            "field": "albums",
            "description": "<p>array of objects of type album in JSON format with status code 200</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200\n\n      {\n \"ALBUMS\":[ {\n      \"_id\": \"5e89f2caaaa6bd3f481675f5\",\n      \"artistId\": \"5e89f2caaaa6bd3f481675eb\",\n      \"albumName\": \"25\",\n      \"__v\": 0,\n      \"likes\": 1,\n      \"rating\": null,\n      \"tracks\": [\n          \"5e89f2caaaa6bd3f481675f0\",\n          \"5e89f2caaaa6bd3f481675f1\"\n      ],\n      \"imagePath\": \"default.png\"\n  },\n{\n      \"_id\": \"5e89f2caaaa6bd3f481675f5\",\n      \"artistId\": \"5e89f2caaaa6bd3f481675eb\",\n      \"albumName\": \"25\",\n      \"__v\": 0,\n      \"likes\": 1,\n      \"rating\": null,\n      \"tracks\": [\n          \"5e89f2caaaa6bd3f481675f0\",\n          \"5e89f2caaaa6bd3f481675f1\"\n      ],\n      \"imagePath\": \"default.png\"\n  }\n]\n}",
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
            "description": "<p>Not found                   [the album id is not found ]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized               [authentication failed]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n  \"Id not found\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized\n{\n   \"Token is Empty\"\n}",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Album"
  },
  {
    "type": "post",
    "url": "album/like/unlike/:id",
    "title": "Like or Unlike album",
    "name": "Like_or_Unlike_album",
    "group": "Album",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>sent as a parameter in the url</p>"
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
            "description": "<p>user token to like or unlike album (in header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"Like\"\n }",
          "type": "string"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"Unlike\"\n }",
          "type": "string"
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
            "description": "<p>Unauthorized          [authentication failed]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Not found                [this album is not found]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized\n{\n   \"Token is not valid\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401  Unauthorized\n{\n   \"Token is Empty\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"No album found\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"Invalid id\"\n}",
          "type": "string"
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
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>token for frontend to send the response</p>"
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
            "field": "x-auth",
            "description": "<p>(ArtistToken)Only an artist who has a verified account can edit his/her profile picture</p>"
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
            "type": "file",
            "optional": false,
            "field": "photo",
            "description": "<p>sent as file in in form-data</p>"
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
    "url": "/artists/homepage/popular",
    "title": "Get popular Artists for homepage",
    "name": "GetPopularArtists",
    "group": "Artists",
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
          "content": "    HTTP/1.1 200 OK\n    {\n     \"artists\": [\n        {\n            \"_id\": \"5e88ce838d92547020e1a652\",\n            \"artistName\": \"Eminem\",\n            \"genres\": [\n                \"Trap\",\n                \"Jazz\",\n                \"pop\",\n                \"Rap\"\n            ],\n            \"about\": \"Marshall Bruce Mathers III (born October 17, 1972), known professionally as Eminem\\n     (/ˌɛmɪˈnɛm/; often stylized as EMINƎM), is an American rapper, songwriter, record producer,\\n     record executive and actor. He is one of the most successful musical artists of the 21st century.\",\n            \"rating\": 4.6,\n            \"imagePath\": \"./Pictures/defaultuser.png\"\n        },\n        {\n            \"_id\": \"5e88ce838d92547020e1a650\",\n            \"artistName\": \"Adele\",\n            \"genres\": [\n                \"pop\",\n                \"R&B\"\n            ],\n            \"about\": \"Adele Laurie Blue Adkins (born May 5, 1988) is a British singer-songwriter\\n    who has sold millions of albums worldwide and won a total of 15 Grammys as well as an Oscar.\\n     Adele's first two albums, 19 and 21, earned her critical praise and a level of\\n      commercial success unsurpassed among her peers.\",\n            \"rating\": 4,\n            \"imagePath\": \"./Pictures/Adele.png\"\n        }\n    ]\n}",
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
          "content": "    HTTP/1.1 200 OK{\n     \n{\n   \"_id\" : ObjectId(\"5e8902475501bd142cbeff13\"),\n   \"email\" : \"be12@hotmail.com\",\n   \"password\" : \"$2b$10$sqP.uu/YJzYg0vErxw24TeMe8eeUzPtWCrSST8gGn9wMxYNQxqGNS\",\n   \"artistName\" : \"Billie Eilish\",\n   \"about\" : \"Billie Eilish is an American singer-songwriter who first shot to prominence when she uploaded her breakout hit \\n    \\\"Ocean Eyes\\\" to SoundCloud in 2015. ... She worked with her brother, Finneas O'Connell, to record \\\"Ocean Eyes,\\\"\\n     a song O'Connell had initially written for his band\",\n   \"gender\" : \"M\",\n   \"birthDate\" : ISODate(\"2001-12-18T00:00:00.000Z\"),\n   \"imagePath\" : \"./Pictures/Billie-Eilish.png\",\n   \"isActive\" : false,\n   \"rating\" : -1,\n   \"genres\" : [\n       \"sha3by\",\n       \"R&B\"\n   ],\n   \"__v\" : 0\n}\n   \n     }",
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
            "description": "<p>Bad Request                    [Error while executing request]</p>"
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
    "name": "SignUp_Confirmed_for_artist",
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
          "content": "    HTTP/1.1 200 OK\n{\n      \"Email confirmed successfully!\"\n}",
          "type": "string"
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
      },
      "examples": [
        {
          "title": "Unauthorized Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n      \"artistName and/or Email already exists \"\n\n}",
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
            "type": "string",
            "optional": false,
            "field": "day",
            "description": "<p>birthdate of the artist-day: 2 digits</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "month",
            "description": "<p>birthdate of the artist-month: 2 digits</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "year",
            "description": "<p>birthdate of the artist-year: 2 digits</p>"
          },
          {
            "group": "Parameter",
            "type": "Srting",
            "optional": false,
            "field": "gender",
            "description": "<p>gender of the artist-Limited to 'M' or 'F'</p>"
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
          "content": "    HTTP/1.1 200 OK\n{\n       \"Artist added Successfully as inActive. Waiting for Email Confirmation \"\n}",
          "type": "string"
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
          "content": "{\n     \"artistName and/or Email already exists \"\n}",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Artists"
  },
  {
    "type": "get",
    "url": "/album/like/me",
    "title": "Get user's current Liked Albums",
    "name": "GetUserCurrentLikedAlbums",
    "group": "Library",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>Required</p>"
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
            "description": "<p>[The response of the success case is Albums ID(s)]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 302\n[\n \"5e8b45fb97022f4d7cd9907e\"\n]",
          "type": "Array"
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
            "description": "<p>Unauthorized               [authentication failed]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized\n{\n   \"Token is Empty\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized \n{\n   \"User does not have access or does not exist\"\n}",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Library"
  },
  {
    "type": "get",
    "url": "/tracks/like/me",
    "title": "Get user's current Liked Tracks",
    "name": "GetUserCurrentLikedTracks",
    "group": "Library",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>Required</p>"
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
            "description": "<p>[The response of the success case is track ID(s)]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 302\n[\n \"5e8b45fb97022f4d7cd9907e\"\n]",
          "type": "Array"
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
            "description": "<p>Unauthorized               [authentication failed]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized\n{\n   \"Token is Empty\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized \n{\n   \"User does not have access or does not exist\"\n}",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Library"
  },
  {
    "type": "get",
    "url": "/notification/artistupadtes",
    "title": "get notification of artist updates",
    "name": "GetArtistUpdatesNotifications",
    "group": "Notifications",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>Required token of the user</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  [\n  {\n      \"_id\": \"5e9e5c54d8f9952f3060cfb5\",\n      \"text\": \"Eminem released a new Song (Lose Ypurself)\",\n      \"sourceId\": \"5e9e3b99f2196e181a41e089\",\n      \"userType\": \"artist\",\n      \"__v\": 0,\n      \"sentTo\": [\n          \"5e9e6287e1bd0b278ce05fb4\"\n      ],\n      \"sent\": true\n  }\n]\n\n\n   \n}",
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
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized \n{\n   \"message\":\"Token is not valid\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Notifications"
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
            "field": "trackId",
            "description": "<p>a list of tracks ids to be passed in the body parameters</p>"
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
            "field": "x-auth",
            "description": "<p>(UserToken)Only an User who has a verified account can create a playlist</p>"
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
          "content": " HTTP/1.1 201 OK\n{\n     \"_id\" : ObjectId(\"5e7511fa1a2c59902efa5544\"),\n     \"userId\" : \"5e7511fa1a2c59902efa552a\",\n     \"playlistName\" : \"RecyleBin\",\n     \"imagePath\" : defaultimage.png\n     \"tracks\" : [],\n    \"privacy\" : false,\n     \"__v\" : 0\n\n}",
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
            "field": "x-auth",
            "description": "<p>(UserToken)Only a user  who has a verified account can delete his/her playlist</p>"
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
            "field": "x-auth",
            "description": "<p>(UserToken)Only a user  who has a verified account can delete a track from his playlist</p>"
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
            "field": "x-auth",
            "description": "<p>(UserToken)Only an User who has a verified account can get the image of a playlist</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "playlistName",
            "description": "<p>The playlist that you want to get its image</p>"
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
          "content": "HTTP/1.1 302\n{\n       default.png\n}",
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
    "type": "get",
    "url": "/playlists/me",
    "title": "Get current user's playlist",
    "name": "GetUserCurrentPlaylist",
    "group": "Playlists",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>Required</p>"
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
            "description": "<p>[The response of the success case is playlist object(s)]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "   HTTP/1.1 302\n\n {\n\"playlist\": [\n     {\n         \"privacy\": true,\n         \"imagePath\": \"default.png\",\n         \"tracks\": [\n             \"5e8a701954fe752c1498f729\",\n             \"5e8a701954fe752c1498f72a\"\n         ],\n         \"_id\": \"5e8a701954fe752c1498f72f\",\n         \"userId\": \"5e8a701954fe752c1498f721\",\n         \"playlistName\": \"Dejavu\",\n         \"__v\": 0\n    },\n    {\n         \"privacy\": true,\n         \"imagePath\": \"default.png\",\n         \"tracks\": [\n             \"5e8a701954fe752c1498f729\",\n             \"5e8a701954fe752c1498f72a\",\n             \"5e8a701954fe752c1498f72b\",\n             \"5e8a701954fe752c1498f72c\"\n         ],\n         \"_id\": \"5e8a701954fe752c1498f730\",\n         \"userId\": \"5e8a701954fe752c1498f721\",\n         \"playlistName\": \"Classics\",\n         \"__v\": 0\n     },\n     {\n         \"privacy\": false,\n         \"imagePath\": \"default.png\",\n         \"tracks\": [\n             \"5e8a701954fe752c1498f729\",\n             \"5e8a701954fe752c1498f72a\",\n             \"5e8a701954fe752c1498f72b\",\n             \"5e8a701954fe752c1498f72c\",\n             \"5e8a701954fe752c1498f72d\"\n         ],\n         \"_id\": \"5e8a701954fe752c1498f731\",\n         \"userId\": \"5e8a701954fe752c1498f721\",\n         \"playlistName\": \"X\",\n         \"__v\": 0\n     }\n ]\n}",
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
            "description": "<p>Unauthorized               [authentication failed]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized\n{\n   \"Token is Empty\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized \n{\n   \"User does not have access or does not exist\"\n}",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Playlists"
  },
  {
    "type": " post ",
    "url": "/playlists/:playlistId/like/unlike/me",
    "title": "Like and Unlike a playlist",
    "name": "Like_and_unlike_playlist",
    "group": "Playlists",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "playlistId",
            "description": "<p>should be passed in params</p>"
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
            "description": "<p>user's token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success - Response:",
          "content": "HTTP / 1.1 200 OK\n{\n   \"message\":\"liked a playlist\"\n}",
          "type": "JSON"
        },
        {
          "title": "Success - Response:",
          "content": "HTTP / 1.1 200 OK\n{\n   \"message\":\"unliked a playlist\"\n}",
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
            "description": "<p>[playlist not found]</p>"
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
            "field": "400",
            "description": "<p>[trying to like a private playlist]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"playlist not found\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"invalid id\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error - Response:",
          "content": "HTTP / 1.1 401   Unauthorized\n{\n       \"message\":\"authentication failed\"\n    }",
          "type": "JSON"
        },
        {
          "title": "Error - Response:",
          "content": "HTTP / 1.1 401  Bad Request\n{\n          \"message\":\"forbidden you can not like a private playlist\"\n    }\n\n\n\n/",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Playlists"
  },
  {
    "type": " post ",
    "url": "/playlists/:playlistId/edit",
    "title": "edit a playlist 's name",
    "name": "edit_a_playlist_'s_name",
    "group": "Playlists",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "playlistId",
            "description": "<p>should be passed in params</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "playlistName",
            "description": "<p>should be passed in body</p>"
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
            "description": "<p>user's token</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success - Response:",
          "content": "HTTP / 1.1 200 OK\n{\n    \"message\": \"playlist name changed successfully\"\n}",
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
            "description": "<p>[playlist not found]</p>"
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
            "field": "403",
            "description": "<p>[changing another user's playlist]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>[user can not have two or more playlists with the same name]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"playlist not found\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"invalid id\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error - Response:",
          "content": "HTTP / 1.1 401   Unauthorized\n{\n       \"message\":\"authentication failed\"\n    }",
          "type": "JSON"
        },
        {
          "title": "Error - Response:",
          "content": "HTTP / 1.1 403  Forbidden\n{\n          \n    \"message\": \"you are not allowed to make this request\"\n    }",
          "type": "JSON"
        },
        {
          "title": "Error - Response:",
          "content": "HTTP / 1.1 400  Bad Request\n{\n          \n    \"message\": \"you already have a playlist with the same name\"\n    }\n\n\n\n/",
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
    "url": "/playlists/liked/me",
    "title": "get a user's liked playlists",
    "name": "get_a_user's_liked_playlists",
    "group": "Playlists",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>user's token</p>"
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
            "field": "likedPlaylists",
            "description": "<p>array of likedPlaylists object</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success - Response:",
          "content": "HTTP / 1.1 200 OK\n\n{\n\n\"likedPlaylists\": [\n     \n       {\n          \"creator\": \"monica\",\n          \"playlistId\": \"5e9d5c3c682ddc25100e72cd\",\n          \"playlistName\": \"favs\",\n          \"likes\": 1,\n          \"tracks\": [\n              \"5e9d5ba78d6d7148a8860da3\"\n          ],\n          \"imagePath\": \"default.jpeg\",\n          \"privacy\": false\n      },\n      {\n          \"creator\": \"Spotify\",\n          \"playlistId\": \"5ea08233370ecb40db0e0b68\",\n          \"playlistName\": \"indies\",\n          \"likes\": 2,\n          \"tracks\": [\n              \"5e9d5ba78d6d7148a8860da3\",\n              \"5e9d5ba78d6d7148a8860da4\",\n              \"5e9d5ba78d6d7148a8860da5\",\n              \"5e9d5ba78d6d7148a8860da7\",\n              \"5e9d5ba78d6d7148a8860da6\"\n          ],\n         \"imagePath\": \"default.jpeg\",\n          \"privacy\": false\n     }\n  ]\n}",
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
            "description": "<p>[no liked playlists]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[authentication failed]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"the user has not liked any playlist yet\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error - Response:",
          "content": "HTTP / 1.1 401   Unauthorized\n{\n       \"message\":\"authentication failed\"\n    }\n\n\n/",
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
    "url": "/Search",
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
            "description": "<p>token for frontend to send the response</p>"
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
          "content": "    HTTP/1.1 200 OK\n     {\n{\n   \"artists\": [\n       {\n           \"_id\": \"5e6942b6646c86bc20fc9a92\",\n           \"artistName\": \"Adele\",\n           \"imagePath\" : \"./Pictures/default.png\",\n       }\n   ],\n   \"Albums\": [\n       {\n          \"_id\": \"5e7a8bb2a986d07c0c22277d\",\n           \"albumName\": \"25\",\n           \"imagePath\" : \"./Pictures/default.png\",\n           \"artistName\": \"Adele\",\n           \"artistId\": \"5e6942b6646c86bc20fc9a92\"\n       }\n   ],\n   \"Tracks\": [\n       {\n           \"_id\": \"5e7e626d4849be7c17be3552\",\n           \"trackName\": \"Hello\",\n           \"imagePath\" : \"./Pictures/default.png\",\n           \"artistId\": \"5e6942b6646c86bc20fc9a92\"\n       }\n   ],\n       \"Playlists\": \"Playlists\": [\n       {\n           \"_id\": \"5e6942b6646c86bc20fc9a89\",\n           \"playlistName\": \"Dejavu\",\n           \"imagePath\" : \"./Pictures/default.png\",\n           \"userName\": \"hamadaaa\",\n           \"userId\": \"5e6d547b639f2ca419a1c08d\"\n       }\n],\n                   ,\n  \"Users\": [{\n                   \"_id\": \"5e6d547b639f2ca419a1c08d\",\n           \"userName\": \"hamadaaa\",\n           \"imagePath\" : \"./Pictures/default.png\",\n       }]\n     }",
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
            "description": "<p>Bad Request                    [Error while executing request]</p>"
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
    "url": "/tracks/single",
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
            "field": "x-auth",
            "description": "<p>(ArtistToken)Only an Artist who has a verified account can add a track</p>"
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
            "field": "trackName",
            "description": "<p>Track name. (Obligatory) sent as multipart data</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "genre",
            "description": "<p>each track has only 1 genre. (Obligatory) sent as multipart data</p>"
          },
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "track",
            "description": "<p>the audio track the artist wants to upload sent as multipart data</p>"
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
          "content": "    HTTP/1.1 201 OK\n   \n{\n  \"__v\": 0,\n  \"artistId\": \"5e9cb30adf88aea050c0778a\",\n  \"trackName\": \"Amaro\",\n  \"genre\": \"Arabic\",\n  \"trackPath\": \"Amaro--5e9cb30adf88aea050c0778a.mp3\",\n  \"_id\": \"5e9cbdb92728b58c0f310d13\",\n \"type\": \"Single\",\n  \"imagePath\": \"default.jpeg\",\n  \"likes\": 0\n }",
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
            "description": "<p>[The artist is trying to add a new track with the same name of one of his tracks (the same artist cannot have 2 tracks with the same exact name)]</p>"
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
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Missing trackName\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Please upload a track\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Track is above limit size\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Missing genre\"\n}",
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
            "field": "x-auth",
            "description": "<p>(ArtistToken)Only an Artist who has a verified account can delete his tracks</p>"
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
    "type": "post",
    "url": "/tracks/coverimage",
    "title": "Edit cover image of the track",
    "name": "Edit_Track_cover_image",
    "group": "Tracks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>(artistToken)Only an artist who has a verified account can edit his/her track cover image</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "trackName",
            "description": "<p>Name of the track the artist wants to edit it's cover image</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "file",
            "optional": false,
            "field": "photo",
            "description": "<p>sent as file in in form-data</p>"
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
          "content": "HTTP/1.1 200\n{\n       \"Track Image changed successfully\"\n}",
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
            "field": "404",
            "description": "<p>[Track doesnot belong to the user]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Cannot change track cover image without auth token]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Please Upload an image\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": Please Upload an image\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Missing track Name\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"Track is not found\"\n}",
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
    "groupTitle": "Tracks"
  },
  {
    "type": "Get",
    "url": "/tracks/byartist/:id",
    "title": "Get tracks by artist",
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
            "description": "<p>the id of the artist</p>"
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
            "description": "<p>array of objects of type track in JSON format with status code 200</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"tracks\": [{\n     \"rating\": 10,\n     \"duration\": 360000,\n     \"_id\": \"5e6b7dac91cb724878446635\",\n     \"trackName\": \"Hello\",\n     \"url\": \"cccc\",\n     \"__v\": 0\n },\n {\n       \"rating\": 10,\n       \"duration\": 360000,\n       \"_id\": \"5e6b7dac91cb724878446635\",\n       \"trackName\": \"Hello\",\n       \"url\": \"cccc\",\n       \"__v\": 0\n   }]\n }",
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
          "content": "  HTTP/1.1 404 Not Found\n {\n\"Track not found\"\n  }",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Tracks"
  },
  {
    "type": "post",
    "url": "/tracks",
    "title": "Get several Tracks",
    "name": "Get_Several_Tracks",
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
          "content": "   HTTP/1.1 200 OK\n{\n    \"tracks\": [\n        {\n            \"_id\": \"5e9d5ba78d6d7148a8860da7\",\n            \"trackName\": \"When I'm Gone\",\n            \"artistName\": \"Eminem\",\n            \"albumName\": \"When I'm Gone\",\n            \"type\": \"Single\",\n            \"genre\": \"Rap\",\n            \"numberOfTimesPlayed\": 0,\n            \"likes\": 12,\n            \"trackPath\": \"When I'm Gone-Eminem-seeds.mp3\",\n            \"imagePath\": \"default.jpeg\"\n        },\n        {\n            \"_id\": \"5e9d5ba78d6d7148a8860da5\",\n            \"trackName\": \"Tamaly m3ak\",\n            \"artistName\": \"Amr Diab\",\n            \"albumName\": \"El Leila\",\n            \"type\": \"Album\",\n            \"genre\": \"Arabic\",\n            \"numberOfTimesPlayed\": 0,\n            \"likes\": 10,\n            \"trackPath\": \"Tamaly m3ak-Amr Diab-seeds.mp3\",\n            \"imagePath\": \"default.jpeg\"\n        },\n         \n        null  // if you send an id that is not in the database\n              // \n    ]\n}",
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
            "description": "<p>[empty array of ids]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>[invalid id]</p>"
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
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"message\":\"empty array of ids\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\" : \"invalid id\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 forbidden\n{\n  \"message\" : \"max 10 Ids\"\n}",
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
    "url": "track/like/unlike/:id",
    "title": "Like or Unlike track",
    "name": "Like_or_Unlike_track",
    "group": "Tracks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "id",
            "description": "<p>sent as a parameter in the url</p>"
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
            "description": "<p>user token to like or unlike track (in header)</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"Like\"\n }",
          "type": "string"
        },
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n {\n     \"Unlike\"\n }",
          "type": "string"
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
            "description": "<p>Unauthorized          [authentication failed]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>Not found                [this track is not found]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "500",
            "description": "<p>Internal Server Error</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized\n{\n   \"Token is not valid\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401  Unauthorized\n{\n   \"Token is Empty\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"No track found\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found\n{\n   \"Invalid id\"\n}",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Tracks"
  },
  {
    "type": "get",
    "url": "/tracks/recentlyplayed",
    "title": "RecentlyPlayedTracks",
    "name": "RecentlyPlayed",
    "group": "Tracks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>(UserToken)Only an User who has a verified account can get the last 5 tracks he/she played</p>"
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
            "description": "<p>[The response of the sucess case is an array of the last 5 played songs ]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "[ \n      {\n          \"__v\" : 0,\n          \"trackPath\" : \"2Scratch - SUPERLIFE (feat. Lox Chatterbox).mp3\",\n          \"genre\" : \"R&B\",\n          \"trackName\" : \"Super Life\",\n          \"artistId\" : \"5ea225ded6322b2846bf0e1d\",\n          \"_id\" : ObjectId(\"5ea225ded6322b2846bf0e30\"),\n          \"type\" : \"Single\",\n          \"numberOfTimesPlayed\" : 1,\n          \"imagePath\" : \"Superlife42011663_800_800.jpg\",\n          \"likes\" : 12\n      }, \n      {\n          \"__v\" : 0,\n          \"trackPath\" : \"Youm Talat-Amr Diab-seeds.mp3\",\n          \"genre\" : \"Arabic\",\n          \"trackName\" : \"Youm Talat\",\n          \"artistId\" : \"5ea225ded6322b2846bf0e1a\",\n          \"_id\" : ObjectId(\"5ea225ded6322b2846bf0e2a\"),\n          \"type\" : \"Album\",\n          \"numberOfTimesPlayed\" : 0,\n          \"imagePath\" : \"default.jpeg\",\n          \"likes\" : 20\n      }, \n      {\n          \"__v\" : 0,\n          \"trackPath\" : \"When I'm Gone-Eminem-seeds.mp3\",\n          \"genre\" : \"Rap\",\n          \"trackName\" : \"When I'm Gone\",\n          \"artistId\" : \"5ea225ded6322b2846bf0e19\",\n          \"_id\" : ObjectId(\"5ea225ded6322b2846bf0e2b\"),\n          \"type\" : \"Single\",\n          \"numberOfTimesPlayed\" : 0,\n          \"imagePath\" : \"When_I'm_Gone_(Eminem_song).jpg\",\n          \"likes\" : 10\n      }, \n      {\n          \"__v\" : 0,\n          \"trackPath\" : \"Way Down We Go.Kaleowith Lyrics ..mp3\",\n          \"genre\" : \"Alternative Rock\",\n          \"trackName\" : \"Way Down We Go\",\n          \"artistId\" : \"5ea225ded6322b2846bf0e1b\",\n          \"_id\" : ObjectId(\"5ea225ded6322b2846bf0e2c\"),\n          \"type\" : \"Single\",\n          \"numberOfTimesPlayed\" : 0,\n          \"imagePath\" : \"KaleoWayDownWeGo.jpg\",\n          \"likes\" : 10\n      }\n  ],",
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
            "description": "<p>[The user didnot play any tracks ]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Cannot get last 5 played tracks without auth token]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n   \"You haven't played any tracks yet\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 No access\n{\n   \"Unauthorized Access\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n   \"User not found\"\n}",
          "type": "JSON"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Tracks"
  },
  {
    "type": "get",
    "url": "/tracks/stream",
    "title": "Stream a single track",
    "name": "Streaming",
    "group": "Tracks",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>(User Token)Only an user who has a verified account can play a track</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "trackId",
            "description": "<p>Id of the track the user wants to listen to</p>"
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
            "description": "<p>[Explanation of wht is going to happen]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "The connection is going to remain open to send chuncks of the track 4000 bytes after each other\nThe user is eligible to pause, fast foward or go backwards while playing a song",
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
            "description": "<p>[Cannot play a track without auth token]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>[Cannot play the track without track ID]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "404",
            "description": "<p>[Cannot play a track if the track id is wrong or the track is deleted by the artist]</p>"
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
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Missing track ID\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"Track not found. Maybe deleted by the artist\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"Invalid track ID\"\n}",
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
    "title": "forget password      [Request to send email after forgetting password]",
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
    "title": "reset Password  [Request to reset password after triggering forget password]",
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
    "type": "put",
    "url": "/api/changepassword",
    "title": "Change password",
    "name": "change_password",
    "group": "User_privacy",
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
            "field": "oldPassword",
            "description": "<p>In the Body of the request</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "newPassword",
            "description": "<p>In the Body of the request</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n    \"Password has been changed successfully\"\n}",
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
            "description": "<p>Forbidden                [Password is incorrect]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized               [authentication failed]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403  Forbidden \n{\n   \"Password is incorrect\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized\n{\n   \"Token is Empty\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized \n{\n   \"User does not have access or does not exist\"\n}",
          "type": "JSON"
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
    "title": "confirmation of premium account [ User is confirmed to be a premium user]",
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
            "description": "<p>should be passed in query of url the token that was sent in the link sent to the user's email</p>"
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
            "field": "gender",
            "description": "<p>user's gender 'M' or 'F'.</p>"
          }
        ],
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "day",
            "description": "<p>birthdate of the user-day: 2 digits</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "month",
            "description": "<p>birthdate of the user-month: 2 digits</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "year",
            "description": "<p>birthdate of the user-year: 2 digits</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n  {\n   \"updated\"\n}",
          "type": "string"
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
          "content": "    HTTP/1.1 401 Access denied\n{\n   \"Authentication failed or invalied token.\"\n}",
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
            "field": "x-auth",
            "description": "<p>(UserToken)Only an User who has a verified account can edit his/her profile picture</p>"
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
            "type": "file",
            "optional": false,
            "field": "photo",
            "description": "<p>sent as file in in form-data</p>"
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
    "type": "post",
    "url": "/users/:artistId/follow",
    "title": "follow an artist",
    "name": "FollowAnArtist",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>Required token of the user</p>"
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
            "description": "<p>id of artist you want to follow</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n  \"message\":\"followed\"\n\n\n   \n}",
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
            "field": "404",
            "description": "<p>[artist not found]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized \n{\n   \"message\":\"authenticaton failed\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404   Not-Found  \n{\n   \"message\":\"artist not found\"\n}",
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
            "field": "x-auth",
            "description": "<p>Front end token</p>"
          },
          {
            "group": "Header",
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
          "content": "HTTP/1.1 401 No access\n{\n  \"error\": \"Token is not valid\"\n}",
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
    "url": "/users/followed/artists",
    "title": "Get followed artists of the user",
    "name": "GetFollowedArtitsOfTheUser",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>Required token of the user</p>"
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
            "description": "<p>simplified array of artists objects</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 200 OK\n{\n   \"artists\":\n[\n{  \"artistName\":\"Adele\",\n    \"followDate\": \"2020-04-04T18:14:27.889Z\",\n  \n  \"rate\":\"3\"\n },\n  {\n\n    \"artistName\":\"Eminem\",\n    \"followDate\": \"2020-04-04T18:14:27.889Z\",\n    \"rate\":\"7\"\n   }\n\n\n   ]\n}",
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
            "description": "<p>Unauthorized               [authentication failed]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized \n{\n   \"message\":\"authenticaton failed\"\n}",
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
    "url": "/users/me",
    "title": "Get User Profile",
    "name": "GetUserProfile",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>Required</p>"
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
            "description": "<p>[The response of the success case is an album object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 302\n{\n     {\n \"_id\": \"5e8a0d954b4daf4ee08a2f65\",\n  \"userName\": \"ranime\",\n  \"email\": \"ranimemohamed8@gmail.com\",\n  \"password\": \"$2b$10$lPLeQWsAgsQHywSK1VS/GO6bN/uCA9v/aWVPf18HlNXFPzFnpSzxC\",\n  \"gender\": \"F\",\n  \"birthDate\": \"1999-05-30T00:00:00.000Z\",\n  \"__v\": 0,\n  \"likedAlbums\": [],\n  \"likedTracks\": [],\n  \"imagePath\": \"defaultuser.png\",\n  \"isActive\": true,\n  \"isPremium\": false\n}\n\n}",
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
            "description": "<p>Not found                   [the user id is not found ]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized               [authentication failed]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found \n{\n  \"Id not found\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized\n{\n   \"Token is Empty\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized \n{\n   \"User does not have access or does not exist\"\n}",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "GET User Profile By ID",
    "name": "GetUserProfileByID",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>token for frontend to send the response</p>"
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
            "field": "userId",
            "description": "<p>Id of the user</p>"
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
            "description": "<p>[The response of the success case is a user object]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "    HTTP/1.1 302\n{\n    \n     \"likedAlbums\": [\"5e8a701954fe752c1498f729\",\n              \"5e8a701954fe752c1498f72a\"]\n     \"likedTracks\": [\"5e8a701954fe752c1498f72c\",\n              \"5e8a701954fe752c1498f72d\"] \n\n}",
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
            "description": "<p>Not found                   [the user id is not found ]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>Unauthorized               [authentication failed]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not found \n{\n  \"Id not found\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized\n{\n   \"Token is Empty\"\n}",
          "type": "string"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401   Unauthorized \n{\n   \"Token Invalid\"\n}",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/premium",
    "title": "request for a premium account   [ Send a confirmation mail to be a premium user]",
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
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401\n {\n   \"message\":\"authentication Failed or invalid token \"\n }",
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
          "content": "    HTTP/1.1 200 OK\n{\n      \"Email confirmed successfully!\"\n}",
          "type": "string"
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
      },
      "examples": [
        {
          "title": "Unauthorized Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n     \"userName and/or Email already exists \"\n}",
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
            "type": "string",
            "optional": false,
            "field": "day",
            "description": "<p>birthdate of the user-day: 2 digits</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "month",
            "description": "<p>birthdate of the user-month: 2 digits</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "year",
            "description": "<p>birthdate of the user-year: 2 digits</p>"
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
          "content": "    HTTP/1.1 200 OK\n{\n       \"User added Successfully as inActive. Waiting for Email Confirmation \"\n}",
          "type": "string"
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
            "description": "<p>request.some/all parameters are missing or sent in an invalid form.</p>"
          }
        ],
        "409": [
          {
            "group": "409",
            "optional": false,
            "field": "Conflict.",
            "description": "<p>the user already exists: duplicate userName or email</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Conflict Error-Response:",
          "content": "   HTTP/1.1 409\n{\n      \"UserName and/or Email already exists \"\n}",
          "type": "string"
        },
        {
          "title": "Bad request Error-Response:",
          "content": "   HTTP/1.1 400\n{\n      \"Missing some fields in the request body\"\n}",
          "type": "string"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "./api.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/tracks/top/EndPointIsNotFinal",
    "title": "ArtistTopTracks",
    "name": "TopTracks",
    "group": "Users",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>(UserToken)Only a User who has a verified account can get top 5 tracks of an artist</p>"
          },
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "artistId",
            "description": "<p>ID of the artist to get his/her top 5 tracks</p>"
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
            "description": "<p>[The response of the sucess case is the track info , the actual track will not be sent]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 302\n{\n        Array of 5 tracks including the track info\n        [{\n            trackName:\n            trackImage;\n            duration of the track\n            imageName of the track\n            genre of thr track(if needed)\n            wether if the track is single or in an album(to be introduced later in the database)\n            \n\n        },{\n            same as above for track2\n        },{\n            same as above to track 3\n        },{\n            same as above to track 4\n        },{\n            same as above to track 5 \n        }] \n}",
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
            "description": "<p>[The artist did not release any tracks ]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "400",
            "description": "<p>[The artist id is not passed ]</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "401",
            "description": "<p>[Cannot get last top 5 tracks of an artist without auth token]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 No access\n{\n  \"error\": \"The artist did not release any tracks\"\n}",
          "type": "JSON"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 No access\n{\n  \"error\": \"Missing artist Id\"\n}",
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
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "x-auth",
            "description": "<p>token for frontend to send the response</p>"
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
    "url": "/users/regular",
    "title": "return to regular    [ User wants to unsubscribe from premium features]",
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
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"Your account has been changed to regular account\"\n}",
          "type": "json"
        },
        {
          "title": "Success-Response:",
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
