/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Trip extends Model {
  static boot() {
    super.boot();
    this.addHook('beforeCreate', 'UuidHook.uuid');
  }

  static get primaryKey() {
    return 'id';
  }

  static get incrementing() {
    return false;
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  events() {
    return this.hasMany('App/Models/Event');
  }
}

module.exports = Trip;
