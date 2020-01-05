/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Trip = use('App/Models/Trip');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with trips
 */
class TripController {
  async index({ response, auth }) {
    try {
      const trips = await Trip.query()
        .where('user_id', auth.current.user.id)
        .fetch();

      return response.status(200).json({
        status: 'success',
        data: trips,
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message:
          'There was a problem responding the trip, please try again later.',
      });
    }
  }

  async show({ response, params }) {
    try {
      const trip = await Trip.find(params.id);

      return response.status(200).json({
        status: 'success',
        data: trip,
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message:
          'There was a problem responding the trip, please try again later.',
      });
    }
  }

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

  async delete({ params, response }) {
    try {
      const trip = await Trip.find(params.id);
      await trip.delete();

      return response.status(200).json({
        status: 'success',
        data: trip,
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message:
          'There was a problem responding the trip, please try again later.',
      });
    }
  }
}

module.exports = TripController;
