const bcryptjs = require('bcryptjs');

export const getHashed = (password) => {
    return bcryptjs.hash(password, 8);
}

export const checkPassword = (password, hash) => {
    return bcryptjs.compareSync(password, hash);
}