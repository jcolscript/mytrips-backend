/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.uuid('id').primary();
      table.string('name').notNullable();
      table
        .string('email')
        .notNullable()
        .unique();
      table.string('password').notNullable();
      table.string('avatar');
      table.string('birthdate').notNullable();
      table.bigInteger('mobile_number').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
