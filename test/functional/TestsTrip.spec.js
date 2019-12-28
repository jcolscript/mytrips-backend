const { test, trait } = use('Test/Suite')('Trips');

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');
trait('Auth/Client');

test('it should be able to create trips', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/trips')
    .loginVia(user, 'jwt')
    .send({
      destination_name: 'Disney',
      destination_city: 'Orlando',
      destination_state: 'FL',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      photo_reference:
        'CmRaAAAAGCtFdSsdAKcfQ4pZIGM-0o_vsmNx3RSDG4XlOSiE3ZG_Tf5RuCTM3BSV',
      lat: -33.8599358,
      lng: 151.2090295,
      user_id: user.id,
    })
    .end();

  response.assertStatus(201);
  assert.equal(response.body.status, 'success');
  assert.exists(response.body.data.id);
});

test('it should be able to list all trips', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const trip = await Factory.model('App/Models/Trip').make();

  await user.trips().save(trip);

  const response = await client
    .get('/trips')
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.status, 'success');
  assert.deepEqual(
    response.body.data[0].destination_name,
    trip.destination_name
  );
  assert.deepEqual(response.body.data[0].user_id, user.id);
});

test('it should be able to show single trip', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();
  const trip = await Factory.model('App/Models/Trip').create();

  await user.trips().save(trip);

  const response = await client
    .get(`/trips/${trip.id}`)
    .loginVia(user, 'jwt')
    .end();

  response.assertStatus(200);
  assert.equal(response.body.status, 'success');
  assert.deepEqual(response.body.data.destination_name, trip.destination_name);
  assert.deepEqual(response.body.data.user_id, user.id);
});
