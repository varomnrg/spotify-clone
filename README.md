
# Playtify

A Spotify clone made as Generasi GIGIH 3.0 Full Stack Engineering Server Side Assignment




## API Reference

### Playlists

#### Get all playlists

```https
  GET /api/playlists
```

#### Get playlist by id

```https
  GET /api/playlists/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of playlist to fetch |

#### Add playlist

```https
  POST /api/playlists/
```
##### Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`   | `string` | **Required**. title of the playlist |
| `description`   | `string` | **Required**. description of the playlist |
| `owner`   | `string` | **Required**. owner of the playlist |

#### Get songs in a playlist  

###### Non sorted
```https
  GET /api/playlists/${id}/songs
```
###### Sorted
```https
  GET /api/playlists/${id}/songs?sort=${asc/desc}
```
##### Params
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`   | `string` | **Required**. Id of playlist to fetch |


#### Play a song in a playlist  

```https
  POST /api/playlists/${playlistId}/songs/${songId}/play
```
##### Params
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `playlistId`   | `string` | **Required**. Id of playlist to fetch |
| `songId`   | `string` | **Required**. Id of song to fetch |

### Songs

#### Get all songs

```https
  GET /api/songs
```

#### Get song by id

```https
  GET /api/songs/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of song to fetch |

#### Add song

```https
  POST /api/songs/
```
##### Body
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`   | `string` | **Required**. title of the songs |
| `artist`   | `array` | **Required**. list of artist of the songs |
| `playlistId`   | `string` | **Required**. id of the songs playlist |
| `url`   | `string` | **Required**. url of the song from spotify |
