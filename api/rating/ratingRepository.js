const Repository = require('./../models/Repository');
const Rating = require('./../models/ratings');
const createHttpError = require('http-errors');

class RatingRepository extends Repository {
  constructor() {
    super();
    this.model = Rating;
  }

  async beforeCreate(payload, params) {
    try {
      // User (client/groomer) cannot rating herself
      if (payload.user_id === params.context.profile.id)
        throw createHttpError(400, 'You cannot rating yourself.');
      // maximum rating point 5
      if (payload.rating > 5) payload.rating = 5;

      return payload;
    } catch (error) {
      throw createHttpError(
        error.statusCode || 500,
        error.message ||
          'An Unknown error occurred while trying to update comment.'
      );
    }
  }

  afterCreate(result) {
    return result[0];
  }

  async getAverage(userId) {
    const result = await this.model
      .query()
      .avg('rating')
      .count('user_id')
      .where({ user_id: userId })
      .first();

    return {
      avg: parseFloat((result.avg || 0).toFixed(1)),
      count: parseInt(result.count),
    };
  }
}

module.exports = new RatingRepository();
