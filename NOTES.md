# Docker

## Mongo

`docker exec <mongodb container> sh -c 'mongodump -d p20-backend --archive' > db.dump`
`docker exec <mongodb container> sh -c 'mongoexport --db p20-backend --collection tickets --type=csv --fields date,name,email,code,checkedIn,checkedInDate,type,order' > tickets.csv`
`docker exec -i <mongodb container> sh -c 'mongorestore --archive' < db.dump`
