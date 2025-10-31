const mongoose = require('mongoose');

const classeSchema = new mongoose.Schema({

    name: {
        type: String,
        require: [true, 'Entrez un nom de classe'],
        trim: true
    },
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}]

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: "updated_at"
    }
});

module.exports = mongoose.model('Classe', classeSchema);
