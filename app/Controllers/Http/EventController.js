/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Event = use('App/Models/Event');

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with events
 */
class EventController {
  // async index({ request, response, view }) {}
  async store({ request, response }) {
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
      'trip_id',
    ]);

    const event = await Event.create(eventData);

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
