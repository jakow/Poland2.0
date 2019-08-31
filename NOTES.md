# Docker

## Mongo

`docker exec <mongodb container> sh -c mongodump -d p20-backend --archive > db.dump`
`docker exec -i <mongodb container> sh -c 'mongorestore --archive' < db.dump`

### Dump Tickets
```
docker exec -i p20-db mongo p20-backend --quiet --eval 'DBQuery.shellBatchSize=300;db.ticket.aggregate([{$lookup:{from:"tickettype",localField:"type",foreignField:"_id",as:"tickettype"}},{$unwind:"$tickettype"},{$lookup:{from:"order",localField:"order",foreignField:"_id",as:"ordertype"}},{$unwind:"$ordertype"},{$project:{_id:0,date:{$dateToString:{date:"$date",format:"%Y-%m-%d %H:%M:%S"}},code:1,name:1,email:1,type:"$tickettype.name",order:"$ordertype.code"}}])' > tickets.json
```

db.ticket.aggregate([
	{ 
		$lookup: {
			from: "tickettype",
			localField: "type", 
			foreignField: "_id",
      as: "tickettype"
    } 
  },
  {
    $unwind: "$tickettype"
  },
  { 
		$lookup: {
			from: "order",
			localField: "order", 
			foreignField: "_id",
      as: "ordertype"
    } 
  },
  {
    $unwind: "$ordertype"
  },
  {
    $project: {
      date: { $dateToString: { date: "$date", format:"%Y-%m-%d %H:%M:%S" } },
      code: 1,
      name: 1,
      email: 1,
      type: "$tickettype.name",
      order: "$ordertype.code"
    }
  }
])
