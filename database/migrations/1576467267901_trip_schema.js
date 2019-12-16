/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TripSchema extends Schema {
  up() {
    this.create('trips', table => {
      table.uuid('id').primary();
      table
        .uuid('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.string('destination_name').notNullable();
      table.string('destination_city').notNullable();
      table.string('destination_state').notNullable();
      table.text('description');
      table.text('photo_reference');
      table.decimal('lat', 9, 6).notNullable();
      table.decimal('lng', 9, 6).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('trips');
  }
}

module.exports = TripSchema;
