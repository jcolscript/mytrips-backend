/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Event = use('App/Models/Event');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with events
 */
class EventController {
  async index({ params, response }) {
    try {
      const tripId = params.id;
      const events = await Event.query()
        .where('trip_id', tripId)
        .fetch();

      return response.status(200).json({
        status: 'success',
        data: events,
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message:
          'There was a problem responding the events, please try again later.',
      });
    }
  }

  async store({ params, request, response }) {
    const tripId = params.id;
    const eventData = request.only([
      'name',
      'description',
      'photo_reference',
      'start_date',
      'end_date',
      'location',
      'reservation_code',
      'notes',
      'lat',
      'lng',
      'type',
    ]);

    const event = await Event.create({ ...eventData, trip_id: tripId });

    return response.status(201).json({
      status: 'success',
      data: { ...event.toJSON() },
    });
  }
  // async show({ params, request, response, view }) {}
  // async update({ params, request, response }) {}
  // async destroy({ params, request, response }) {}
}

module.exports = EventController;
