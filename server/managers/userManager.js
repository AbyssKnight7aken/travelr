const User = require('../models/User');
const TokensBlacklist = require('../models/TokensBlacklist');


const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');


exports.register = async (username, email, password, img) => {
    const existing = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
    if (existing) {
        throw new Error('Email is taken!');
    }

    const user = await User.create({ username, email, password, img });
    const result = createToken(user);
    return result;
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email }).select('+password').collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Invalid username or password!');
    }

    console.log(password, user.password);
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid username or password!');
    }

    const result = createToken(user);
    return result;
};

exports.getUserInfo = async (email) => {
    const user = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });

    if (!user) {
        throw new Error('Unexisting User!');
    }

    console.log(user);
    return user;
};

exports.logout = async (token) => {
    TokensBlacklist.create({ token });
}

async function createToken(user) {

    const payload = {
        _id: user._id,
        username: user.username,
        email: user.email,
    }

    const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

    const result = {
        _id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token
    }
    return result;
}

exports.parseToken = async (token) => {
    const tokens = await TokensBlacklist.find({ token });

    if (tokens.length > 0) {
        throw new Error('Token is blacklisted!');
    }
    const result = await jwt.verify(token, SECRET);
    return result;
}