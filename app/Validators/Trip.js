const Antl = use('Antl');

class Trip {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      user_id: 'required|exists:users,id',
      destination_name: 'required',
      destination_city: 'required',
      destination_state: 'required',
      description: 'required',
      photo_reference: 'required',
      lat: 'required',
      lng: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Trip;
