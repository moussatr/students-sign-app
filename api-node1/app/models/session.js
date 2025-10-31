const mongoose = require('mongoose');


const sessionSchema = new mongoose.Schema({


    startDate: {
        type: Date,
        require: [true, 'Entrez une date de début'],
        trim: true
    },
    endDate: {
        type: Date,
        require: [true, 'Entrez une date de fin'],
        trim: true
    },
    lessons: {type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'}

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: "updated_at"
    }
});



module.exports = mongoose.model('Session', sessionSchema);