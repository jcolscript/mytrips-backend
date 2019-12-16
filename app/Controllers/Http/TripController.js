/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Trip = use('App/Models/Trip');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with trips
 */
class TripController {
  /**
   * Create/save a new trip.
   * POST trips
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const tripData = request.only([
      'user_id',
      'destination_name',
      'destination_city',
      'destination_state',
      'description',
      'photo_reference',
      'lat',
      'lng',
    ]);

    const trip = await Trip.create(tripData);

    return response.status(201).json({
      status: 'success',
      data: { ...trip.toJSON() },
    });
  }
}

module.exports = TripController;
