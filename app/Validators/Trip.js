class Trip {
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
}

module.exports = Trip;
