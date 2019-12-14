/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');

Factory.blueprint('App/Models/User', (faker, i, data = {}) => {
  return {
    name: faker.name(),
    email: faker.email(),
    password: faker.string(),
    birthdate: faker.date({ year: 1983 }),
    mobile_number: faker.phone({ formatted: false }),
    ...data,
  };
});

Factory.blueprint('App/Models/Token', async (faker, i, data = {}) => {
  return {
    type: data.type || 'refresh_token',
    token: faker.string({ length: 20 }),
    ...data,
  };
});
