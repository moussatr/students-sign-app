const express = require('express');
const student = require('../models/student');
const bcrypt = require('bcrypt')
const studentModel = require('../models/student');
const { request, response } = require('express');

let router = express.Router();


router.get("/me", async (request, response) => {

    return response.status(200).json(request.session.student);
})

router.post('/', async (request, response) => {
    const {firstname, lastname} = request.body;

    if (typeof firstname === 'undefined' || typeof lastname === 'undefined') {
        return response.status(500).json({
            "msg": "vous devez entrer un nom et un prénom !"
        })

    }

    try {
        let student = await studentModel.create({
            firstname,
            lastname
        });

        return response.status(200).json(student);
    } catch (error) {
        return response.status(500).json({
            "msg": "il y a eu une erreur: " + error
        });
    }

});

router.delete('/:id', async (request,response) => {
    const {id} = request.params;

    try {
        let student = await studentModel.findByIdAndRemove(id)
        return response.status(200).json({
            msg: "Elève bien supprimée !"
        })
    }catch (error) {
        return response.status(500).json(error)
    }
})

router.put('/:id', async (request,response) =>{
    const {id} = request.params;
    const {firstname, lastname} = request.body;

    try {
        let student = await studentModel.findByIdAndUpdate(id,
            {
                firstname, lastname
            },{
                new: true
            })
        return response.status(200).json({
            msg: "Elève bien modifiée !"
        })
    }catch (error) {
        return response.status(500).json(error)
    }

})

router.get('/:id', async (request, response) => {
    const {id} = request.params;

    try {
        let student = await studentModel.findById(id)
        return response.status(200).json(student)
    }catch (error) {
        return response.status(500).json(error)
    }


})

router.get('/', async (request, response) => {
    try {
        let students = await studentModel.find()
        return response.status(200).json(students)
    } catch (error) {
        return response.status(500).json(error)
    }
})

router.post('/register', async (request, response) =>{

    const {email, email_cfg, password, password_cfg, firstname, lastname} = request.body;

    if( (typeof email === "undefined" || email.trim() === "") || 
        (typeof password === "undefined" || password.trim() === "")
        ){

        return response.status(500).json({
            msg: "Il faut remplir tous les champs"
        });
    }

    if ( email !== email_cfg || password !== password_cfg){
        return response.status(500).json({
            msg: "les confirmations ne sont pas exactes"
        });
    }

    if (typeof firstname === 'undefined' || typeof lastname === 'undefined') {
        return response.status(500).json({
            "msg": "vous devez entrer un nom et un prénom !"
        });
    }

    try {

        let exist = await studentModel.findOne({email});

        if (exist){
            return response.status(500).json({
                msg: "Le compte existe déjà"
            });
        }

        let student =  await studentModel.create({
            email: email.trim(),
            password: await bcrypt.hash(password.trim(), 10),
            firstname: typeof firstname !== 'undefined' ? firstname.trim() : "",
            lastname: typeof lastname !== 'undefined' ? lastname.trim() : "",
        })


    return response.status(200).json(student);
    } catch(error) {
        console.log(error);
        return response.status(500).json({
            msg: "Échec lors de la création du compte"
        })
    }


})


router.post('/login', async (request, response) =>{

    const {email, password} = request.body;

    if( (typeof email === "undefined" || email.trim() === "") || 
        (typeof password === "undefined" || password.trim() === "")
        ){

        return response.status(500).json({
            msg: "Il faut remplir tous les champs"
        });
    }

    try {

        let student = await studentModel.findOne({email});

        if (!student){
            return response.status(500).json({
                msg: "Erreur d'authentification"
            });
        }

        let compare = bcrypt.compare(password, student.password);

        if (!compare){
            return response.status(500).json({
                msg: "Erreur d'authentification"
            });
        }


    request.session.student = student;
    return response.status(200).json(student);
    } catch(error) {
        console.log(error);
        return response.status(500).json({
            msg: "Échec lors de la connexion"
        })
    }

})




module.exports = router;