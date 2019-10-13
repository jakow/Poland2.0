/* eslint-disable */
DBQuery.shellBatchSize = 300;
db.ticket.aggregate([
  {
    $lookup: {
      from: 'tickettype',
      localField: 'type',
      foreignField: '_id',
      as: 'tickettype',
    },
  },
  {
    $unwind: '$tickettype',
  },
  {
    $lookup: {
      from: 'order',
      localField: 'order',
      foreignField: '_id',
      as: 'ordertype',
    },
  },
  {
    $unwind: '$ordertype',
  },
  {
    $addFields: {
      participant: {
        $arrayElemAt: [
          {
            $filter: {
              input: '$ordertype.participants',
              as: 'participant',
              cond: {
                $eq: ['$$participant.name', '$name']
              }
            }
          }, 0
        ],
      },
    }
  },
  {
    $project: {
      _id: 0,
      date: { $dateToString: { date: '$date', format: '%Y-%m-%d %H:%M:%S' } },
      code: 1,
      name: 1,
      email: 1,
      type: '$tickettype.name',
      order: '$ordertype.code',
      university: '$participant.university',
    },
  },
]);
