const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({

    email: {
        type: String,
        require: [true, 'Entrez un mail'],
        trim: true,
        unique: true
    },

    password: {
        type: String,
        require: [true, 'Entrez un password'],
        trim: true
    },
    firstname: {
        type: String,
        require: [true, 'Entrez un prénom'],
        trim: true
    },
    lastname: {
        type: String,
        require: [true, 'Entrez un nom'],
        trim: true
    }

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: "updated_at"
    }
});



module.exports = mongoose.model('Student', studentSchema);