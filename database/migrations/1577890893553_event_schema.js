/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class EventSchema extends Schema {
  up() {
    this.create('events', table => {
      table.uuid('id').primary();
      table
        .uuid('trip_id')
        .unsigned()
        .references('id')
        .inTable('trip')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.string('name').notNullable();
      table.text('description').notNullable();
      table.text('photo_reference');
      table.string('start_date').notNullable();
      table.string('end_date').notNullable();
      table.string('location').notNullable();
      table.string('reservation_code');
      table.text('notes');
      table
        .enu('type', ['flight', 'lodging', 'car_rental', 'meeting'])
        .defaultsTo('map');
      table.decimal('lat', 9, 6);
      table.decimal('lng', 9, 6);
      table.timestamps();
    });
  }

  down() {
    this.drop('events');
  }
}

module.exports = EventSchema;
