/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Event extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeCreate', 'UuidHook.uuid');
  }

  trip() {
    return this.belongsTo('App/Models/Trip');
  }

  static get primaryKey() {
    return 'id';
  }

  static get incrementing() {
    return false;
  }
}

module.exports = Event;
