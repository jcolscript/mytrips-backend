class Reset {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      token: 'required',
      password: 'required',
    };
  }
}

module.exports = Reset;
