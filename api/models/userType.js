const Model = require('./Model');

class UserType extends Model {
  constructor() {
    this.tableName = 'user_types';
    /** VALIDATION */
    this.validationSchema = {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      },
    };
  }
}

module.exports = new UserType();
