const express = require('express')
//const { v4: uuidv4 } = require('uuid')
const classeModel = require('../models/classe')

let router = express.Router()

router.post('/', async (request, response) =>{
    const {name} = request.body

    if(typeof name === "undefined" || name == "") {
        return response.status(500).json({
            msg: "Veuillez saisir un nom valide"
        })
    }

    try{
        let classe = await classeModel.create({
            name
        })
        return response.status(200).json(classe)
    }catch(error){
        return response.status(500).json({
            msg: error
        })
    }
});

router.post('/add-student', async (request, response) => {
    const {studentId, classeId} = request.body;


    try {
       const classe = await classeModel.findOneAndUpdate({
            _id: classeId
        }, {
            $addToSet: {
                students: [studentId]
            }
        }, {
            new: true
        
        }).populate('students')
    
        return response.status(200).json(classe);
    } catch (error) {
        return response.status(500).json(error)
    }
});

router.get('/', async (request, response) => {
    try {
        let classes = await classeModel.find()
        return response.status(200).json(classes)
    } catch (error) {
        return response.status(500).json(error)
    }
});

router.get('/', async (request, response) => {
    try {
        let classes = await classeModel.find()

        .populate({path: 'students', select: '-password'})
        return response.status(200).json(classes)
    } catch (error) {
        return response.status(500).json(error)
    }
});



router.get('/:id', async (request, response) => {
    const {id} = request.params

    try {
        let classe = await classeModel.findById(id)
        return response.status(200).json(classe)
    }catch (error) {
        return response.status(500).json(error)
    }

    
});

router.delete('/:id', async (request,response) => {
    const {id} = request.params

    try {
        let classe = await classeModel.findByIdAndRemove(id)
        return response.status(200).json({
            msg: "Classe bien supprimée !"
        })
    }catch (error) {
        return response.status(500).json(error)
    }
});

router.put('/:id', async (request,response) =>{
    const {id} = request.params
    const {name} = request.body

    try {
        let classe = await classeModel.findByIdAndUpdate(id,
            {
                name
            },{
                new: true
            })
        return response.status(200).json({
            msg: "Classe bien modifiée !"
        })
    }catch (error) {
        return response.status(500).json(error)
    }

});

module.exports = router