const mongoose = require('mongoose');


const presenceSchema = new mongoose.Schema({

    session: {type: mongoose.Schema.Types.ObjectId, ref: 'Session'},
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'}

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: "updated_at"
    }
});



module.exports = mongoose.model('Presence', presenceSchema);
