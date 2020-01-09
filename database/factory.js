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

Factory.blueprint('App/Models/Trip', (faker, i, data = {}) => {
  return {
    destination_name: faker.city(),
    destination_city: faker.city(),
    destination_state: faker.province({ full: true }),
    description: faker.sentence(),
    photo_reference: faker.wp7_anid(),
    lat: faker.latitude({ fixed: 7 }),
    lng: faker.longitude({ fixed: 7 }),
    ...data,
  };
});

Factory.blueprint('App/Models/Event', (faker, i, data = {}) => {
  return {
    name: faker.city(),
    description: faker.city(),
    photo_reference: faker.wp7_anid(),
    start_date: faker.date(),
    end_date: faker.date(),
    location: faker.address(),
    reservation_code: faker.string(),
    notes: faker.paragraph(),
    type: 'flight',
    lat: faker.latitude({ fixed: 7 }),
    lng: faker.longitude({ fixed: 7 }),
    ...data,
  };
});
