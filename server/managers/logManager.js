const Log = require('../models/Log');


exports.getAll = async() => {
    return await Log.find({}).populate('_ownerId');
}

exports.getRescent = () => {
    return Log.find({}).sort({ _id: -1 }).limit(3).populate('_ownerId');
}


exports.getByUserId = async(userId) => {
    return Log.find({ _ownerId: userId });
}

exports.getById = async(id) => {
    const log = Log.findById(id).populate('_ownerId');
    return log;
}

exports.create = async(item) => {
    return Log.create(item);
}

exports.update = async(id, item) => {
    const existing = await Log.findById(id);

    existing.name = item.name;
    existing.date = item.date;
    existing.description = item.description;
    existing.img = item.img;
    existing.location = item.location;

    return existing.save();
}

exports.deleteById = async(id) => {
    return Log.findByIdAndDelete(id);
}