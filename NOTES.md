 Docker

## Mongo

`docker exec <mongodb container> sh -c 'mongodump -d p20-backend --archive' > db.dump`
`docker exec -i <mongodb container> sh -c 'mongorestore --archive' < db.dump`
`docker exec -i p20-db mongo --quiet p20-backend < dump_tickets.js >> tickets.json`

### Dump Survey
```
docker exec p20-db sh -c 'mongoexport --db p20-backend --collection survey --type=csv --fields date,type,university,course,yearOfStudy,industry' > survey.csv
```
