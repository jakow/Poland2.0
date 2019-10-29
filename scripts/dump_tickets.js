/* eslint-disable */
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
    $unwind: {
      path: '$ordertype',
      preserveNullAndEmptyArrays: true
    },
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
      order: '$ordertype.code',
      linkedin: '$participant.linkedin',
      type: '$tickettype.name',
      kind: '$participant.type',
      university: '$participant.university',
      yearOfStudy: '$participant.yearOfStudy',
      industry: '$participant.industry',
      programmingLanguages: '$participant.programmingLanguages'
    },
  },
]).toArray();
