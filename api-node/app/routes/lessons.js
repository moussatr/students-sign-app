const express = require('express');
const lesson = require('../models/lesson');
const lessonModel = require('../models/lesson');
const { request, response } = require('express');

let router = express.Router();

router.post('/', async (request, response) => {
    const {label, classeId} = request.body;

    if (typeof label === 'undefined') {
        return response.status(500).json({
            "msg": "Vous devez entrer un label"
        })
    }

    try {
        let lesson = await lessonModel.create({
            label,
            classes : classeId
        })

        console.error(classeId)
        return response.status(200).json(lesson);
    } catch (error) {
        return response.status(500).json({
            "msg": "il y a eu une erreur: " + error
        });
    }

});


router.delete('/:id', async (request,response) => {
    const {id} = request.params;

    try {
        let lesson = await lessonModel.findByIdAndRemove(id)
        return response.status(200).json({
            msg: "Cours bien supprimée !"
        })

    }catch (error) {
        return response.status(500).json(error)
    }
})

router.put('/:id', async (request,response) =>{
    const {id} = request.params;
    const {label, classeId} = request.body;

    try {
        let lesson = await lessonModel.findByIdAndUpdate(id,
            {
                label, classeId
            },{
                new: true
            })
        return response.status(200).json({
            msg: "Cours bien modifiée !"
        })
    }catch (error) {
        return response.status(500).json(error)
    }

})

router.get('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        let lesson = await lessonModel.findById(id)
        return response.status(200).json(lesson)
    }catch (error) {
        return response.status(500).json(error)
    }


})

router.get('/', async (request, response) => {
    try {
        let lessons = await lessonModel.find()
        return response.status(200).json(lessons)
    } catch (error) {
        return response.status(500).json(error)
    }
})


module.exports = router;