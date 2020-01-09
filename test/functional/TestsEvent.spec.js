const { test, trait } = use('Test/Suite')('Events');

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to create events', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const trip = await Factory.model('App/Models/Trip').create();
  await user.trips().save(trip);
  const eventPayload = {
    type: 'activity',
    trip_id: trip.id,
  };
  const event = await Factory.model('App/Models/Event').make(eventPayload);

  const response = await client
    .post(`/trips/${trip.id}/events`)
    .loginVia(user, 'jwt')
    .send(event.toJSON())
    .end();

  response.assertStatus(201);
  assert.equal(response.body.status, 'success');
  assert.exists(response.body.data.id);
});

test('it should be able to list all events', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const trip = await Factory.model('App/Models/Trip').create();
  await user.trips().save(trip);
  const event = await Factory.model('App/Models/Event').make();
  await trip.events().save(event);

  const response = await client
    .get(`/trips/${trip.id}/events`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.status, 'success');
  assert.deepEqual(response.body.data[0].name, event.name);
  assert.deepEqual(response.body.data[0].trip_id, trip.id);
});
