const express = require('express');
const router = new express.Router();
const Joi = require('joi');

const genres = [
    {id: 1, name: "comedy"},
    {id: 2, name: "horror"},
    {id: 3, name: "drama"}
]
router.get("/", (req,res)=>{
    res.send(genres)
})
router.get('/:id', (req, res)=>{
    let genre = genres.find(c => c.id == parseInt(req.params.id))
    if(!genre){
        res.status(404).send("The genre with the given Id does not exist")
    }
    res.send(genre);
})

router.post('/',(req, res)=>{
    const genre = {
        id: genres.length + 1,
        name: req.body.name
    }
    
    const result = validateGenre(genre);
    if (result.error){
        res.status(400).send(result.error.details[0].message)
    }
    else if(genres.some(element=> element.name === result.value.name)){
        res.send("This genre already exists!")
    }
    else {
        genres.push(genre);
        res.send(genre)
    }
})

router.put("/:id", (req,res) =>{
    const genre = genres.find( g => g.id == parseInt(req.params.id))
    console.log(genre)
    if(!genre){
        res.status(404).send("The given id doesn't exists!")
    }
    const newGenre = {
        id: genre.id,
        name: req.body.name
    };
    const result = validateGenre(newGenre);
    if (result.error){
        res.status(400).send(result.error.details[0].message)
    }else if(genres.some(element=> element.name === result.value.name)){
        res.send("This genre already exists!")
    }
    else{
        genre.name = result.value.name;
        res.send(result)
    }
})

router.delete('/:id', (req,res)=>{
    const genre = genres.find( g => g.id == req.params.id);
    const index = genres.indexOf(genre)
    if (!genre){
        res.status(404).send("this genre doesn't exist");
    } else{
        genres.splice(index, 1);
        res.send("Genre was successfully removed!")
    }
})

function validateGenre(genre){
    const schema = Joi.object({id: Joi.number().integer(),  name : Joi.string().min(3).required().max(30)})
    const result = schema.validate(genre)
    console.log(result)
    return result
}

module.exports =router 