const { randomBytes } = require('crypto');
const { promisify } = require('util');

const Mail = use('Mail');
const Env = use('Env');
const Logger = use('Logger');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class ForgotPasswordController {
  async store({ request, response }) {
    const { email } = request.input('email');

    try {
      const user = await User.first('email', email);
      const random = await promisify(randomBytes)(20);
      const token = random.toString('hex');
      const resetPassUrl = `${Env.get('FRONT_URL')}/reset?token=${token}`;

      user.tokens().create({
        token,
        type: 'forgot_password',
      });

      await Mail.send(
        'emails.forgotpassword',
        { name: user.name, resetPassUrl },
        message => {
          message
            .to(user.email)
            .from('contato@mytrips.com')
            .subject('MyTrips - Recuperação de senha');
        }
      );

      return response.status(200).json({
        status: 'success',
        data: {
          email: user.email,
        },
      });
    } catch (error) {
      Logger.error('Error %s', error);
      return response.status(400).json({
        status: 'error',
        message: 'Password cannot be recovered',
      });
    }
  }
}

module.exports = ForgotPasswordController;
