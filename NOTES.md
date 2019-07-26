# Docker

## Mongo

`docker exec <mongodb container> sh -c 'mongodump --archive' > db.dump`
`docker exec -i <mongodb container> sh -c 'mongorestore --archive' < db.dump`
