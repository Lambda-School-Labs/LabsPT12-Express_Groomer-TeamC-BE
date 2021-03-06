const Model = require('./Model');

class Appointment extends Model {
  constructor() {
    super();
    this.tableName = 'appointments';

    this.validationSchema = {
      type: 'object',
      required: [
        'client_id',
        'groomer_id',
        'animal_id',
        'appointment_date',
        'location',
      ],
      properties: {
        client_id: { type: 'string', oneOf: { key: 'id', target: 'profiles' } },
        groomer_id: {
          type: 'string',
          oneOf: { key: 'profile_id', target: 'groomers' },
        },
        animal_id: { type: 'string', oneOf: { key: 'id', target: 'animals' } },
        appointment_date: { type: 'string', format: 'date-time' }, // 2018-11-13T20:20:39+00:00 | rgx "%Y-%m-%dT%H:%M:%S%Z"
        location: { type: 'string' },
      },
    };
  }
}

module.exports = new Appointment();
