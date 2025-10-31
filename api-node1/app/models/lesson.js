const mongoose = require('mongoose');


const lessonSchema = new mongoose.Schema({

    label: {
        type: String,
        require: [true, 'Entrez un nom de cours'],
        trim: true
    },
    
    classes: {type: mongoose.Schema.Types.ObjectId, ref: 'Classe'}

}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: "updated_at"
    }
});



module.exports = mongoose.model('Lesson', lessonSchema);