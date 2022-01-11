const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
    meets: { type: Array, required: true },
    user: { type: String, required: true },
}, {
    timestamps: true,
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;