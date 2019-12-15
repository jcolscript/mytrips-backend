const { test, trait } = use('Test/Suite')('User Account');

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('it should creat user account and send a notification in email', async ({
  assert,
  client,
}) => {
  const userDataPayload = {
    email: 'contato@mytrips.com',
    password: '123456',
  };

  const user = await Factory.model('App/Models/User').make(userDataPayload);

  const response = await client
    .post('/registration')
    .send(user.toJSON())
    .end();

  response.assertStatus(201);
  assert.equal(response.body.status, 'success');
  assert.exists(response.body.data.email);
});

test('it should does not creat user account when a fild wrong', async ({
  client,
}) => {
  const userDataPayload = {
    email: 'contatomytrips.com',
    password: '123456',
  };

  const user = await Factory.model('App/Models/User').make(userDataPayload);

  const response = await client
    .post('/registration')
    .send(user.toJSON())
    .end();

  response.assertStatus(400);
});
