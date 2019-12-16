/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class UserController {
  async store({ request, response }) {
    const userData = request.only([
      'name',
      'email',
      'password',
      'birthdate',
      'mobile_number',
    ]);

    try {
      // save user to database
      const user = await User.create(userData);

      return response.status(201).json({
        status: 'success',
        data: {
          name: user.name,
          email: user.email,
          mobile_number: user.mobile_number,
          created_at: user.created_at,
        },
      });
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        message:
          'There was a problem creating the user, please try again later.',
      });
    }
  }
}

module.exports = UserController;
