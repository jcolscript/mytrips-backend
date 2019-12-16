const { test, trait } = use('Test/Suite')('Trips');

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should able to create trips', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create();

  const response = await client
    .post('/trips')
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
