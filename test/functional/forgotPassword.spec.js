const { test, trait } = use('Test/Suite')('Forgot Password');

const Mail = use('Mail')

/** @type {typeof import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('it should send a email with forgot password instructions', async ({assert, client}) => {
  Mail.fake();

  const forgotPayload = {
    email: 'contato@mytrips.com',
  }

  const user = await Factory
    .model('App/Models/User')
    .create(forgotPayload)

  const response = await client
    .post('/forgot')
    .send(forgotPayload)
    .end()

  const token = await user.tokens().first();
  const recentEmail = Mail.pullRecent();

  response.assertStatus(204);

  assert.equal(recentEmail.message.to[0].address, forgotPayload.email);
  assert.include(token.toJSON(), {
    user_id: user.id,
    type: 'forgot'
  })

  Mail.restore()
});

// chama uma rota /reset (token, nova senha, confirmacao?)

