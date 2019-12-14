const { test, trait } = use('Test/Suite')('API Enabled');

trait('Test/ApiClient');

test('it should return a message that api is enabled', async ({
  client,
  assert,
}) => {
  const response = await client
    .get('/')
    .send()
    .end();

  response.assertStatus(200);
  assert.exists(response.body.greeting);
});
