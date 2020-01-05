const { test, trait } = use('Test/Suite')('Trips');

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to create events', async () => {
  const user = await Factory.model('App/Models/User').create();
  const trip = await Factory.model('App/Models/Trip').create();
  await user.trips().save(trip);
});
