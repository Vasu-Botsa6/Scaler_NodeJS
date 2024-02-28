const express = require('express')
const { Category, validateData} = require('../models/categoriesModel')

const router = express.Router()



const categories = [
    {id:1, name:"Web"},
    {id:2, name:"Mobile"},
    {id:3, name:"Photography"},
]

router.get('/api/categories',async (req, res)=>{
    let categories = await Category.find()
    res.send(categories)
} )

// router.post('/api/categories', (req,res)=>{

//     //Joi validation
//     const {error} = validateData(req.body);
//     if(error) res.status(400).send(error.details[0].message)

//     const category = {
//         id: categories.length +1,
//         name : req.body.name
//     }
//     categories.push(category)
//     res.send(category)
// })

router.post('/api/categories',async (req,res)=>{

    //Joi validation
    const {error} = validateData(req.body);
    if(error) res.status(400).send(error.details[0].message)

    const category = new Category({
        name : req.body.name
    })
    await Category.save()
    res.send(category)
})


// router.put('/api/categories/:id',(req,res)=>{
//     const category = categories.find(c => c.id ===parseInt(req.params.id))

//     if(!category) return res.status(404).send("category with given id NOT FOUND")

//     if(error) return res.status(400).send(error.details[0].message)

//     category.name = req.body.name
//     res.send(category)
// })

router.put('/api/categories/:id',async(req,res)=>{
    const {error} = validateData(req.body)
    if(error) res.status(400).send(error.details[0].message)

    const category =await Category.findByIdAndUpdate(req.params.id, {name : req.body.name}, {new : True})

    if(!category) return res.status(404).send("category with given id NOT FOUND")

    category.name = req.body.name
    res.send(category)
})

// router.delete('/api/categories/:id',(req,res)=>{
//     const category = categories.find(c=>c.id === parseInt(req.params.id))
//     if(!category) return res.status(404).send("The genre with given ID NOT FOUND")

//     const index = categories.indexOf(category)
//     categories.splice(index, 1)
//     res.send(category)
// })

router.delete('/api/categories/:id',async(req,res)=>{
    const category = await Category.findByIdAndRemove(req.params.id)
    if(!category) return res.status(404).send("The category with given ID NOT FOUND")

    res.send(category)
})

// router.get('/api/categories/:id',(req, res)=>{
//     const category = categories.find(c=> c.id===parseInt(req.params.id))
//     if(!category) return res.status(404).send("The genre with given ID NOT FOUND")
//     res.send(category)
// })

router.get('/api/categories/:id',async(req, res)=>{
    const category = await Category.findById(req.params.id)
    if(!category) return res.status(404).send("The Category with given ID NOT FOUND")
    res.send(category)
})


module.exports = router;