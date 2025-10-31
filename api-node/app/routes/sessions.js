const express = require('express');
const session = require('../models/session');
const sessionModel = require('../models/session');
const { request, response } = require('express');

let router = express.Router();

router.post('/', async (request, response) => {
    const {startDate, endDate, lessonId} = request.body;

    if (typeof startDate === 'undefined' || typeof endDate === 'undefined') {
        return response.status(500).json({
            "msg": "Vous devez entrer une date"
        })
    }

    try {
        let session = await sessionModel.create({
            startDate : Date.parse(startDate),
            endDate : Date.parse(endDate),
            lessons : lessonId
        })

        console.error(lessonId)
        return response.status(200).json(session);
    } catch (error) {
        return response.status(500).json({
            "msg": "il y a eu une erreur: " + error
        });
    }

});


router.delete('/:id', async (request,response) => {
    const {id} = request.params;

    try {
        let session = await sessionModel.findByIdAndRemove(id)
        return response.status(200).json({
            msg: "session bien supprimée !"
        })

    }catch (error) {
        return response.status(500).json(error)
    }
})

router.put('/:id', async (request,response) =>{
    const {id} = request.params;
    const {startDate, endDate, lessonId} = request.body;

    try {
        let session = await sessionModel.findByIdAndUpdate(id,
            {
                startDate, endDate, lessonId
            },{
                new: true
            })
        return response.status(200).json({
            msg: "session bien modifiée !"
        })
    }catch (error) {
        return response.status(500).json(error)
    }

})

router.get('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        let session = await sessionModel.findById(id)
        return response.status(200).json(session)
    }catch (error) {
        return response.status(500).json(error)
    }


})

router.get('/', async (request, response) => {
    try {
        let sessions = await sessionModel.find()
        return response.status(200).json(sessions)
    } catch (error) {
        return response.status(500).json(error)
    }
})


module.exports = router;