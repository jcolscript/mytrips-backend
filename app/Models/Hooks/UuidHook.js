const uuidv4 = require('uuid/v4');

// eslint-disable-next-line no-multi-assign
const UuidHook = (exports = module.exports = {});

UuidHook.uuid = async uuid => {
  uuid.id = uuidv4();
};
