'use strict'

const Mail = use('Mail');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class ForgotPasswordController {
  async store({ request }) {
    try {
      const { email } = request.input('email');
      const user = await User.first('email', email);

      await Mail.send('emails.forgotpass', { name: user.name }, (message) => {
        message
          .to(user.email)
          .from('contato@mytrips.com')
          .subject('MyTrips - Recuperação de senha')
      })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = ForgotPasswordController
