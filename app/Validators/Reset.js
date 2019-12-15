class Reset {
  get rules() {
    return {
      token: 'required',
      password: 'required',
    };
  }
}

module.exports = Reset;
