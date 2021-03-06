/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.get('/', () => {
  return { greeting: 'API enabled' };
});

// Auth
Route.post('/sessions', 'SessionController.store').validator('Session');
Route.post('/forgot', 'ForgotPasswordController.store').validator('Forgot');
Route.post('/reset', 'ResetPasswordController.store').validator('Reset');
Route.post('/registration', 'UserController.store').validator('User');

// Trips
Route.group(() => {
  Route.get('/trips', 'TripController.index');
  Route.get('/trips/:id', 'TripController.show');
  Route.post('/trips', 'TripController.store').validator('Trip');
  Route.delete('/trips/:id', 'TripController.delete');
  Route.get('/trips/:id/events', 'EventController.index'); // .validator('Event');
  Route.post('/trips/:id/events', 'EventController.store'); // .validator('Event');
}).middleware('auth');

// Events
Route.group(() => {
  Route.get('/events/:id', 'EventController.show');
  Route.delete('/events/:id', 'EventController.delete');
}).middleware('auth');
