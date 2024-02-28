const Joi = require('joi')
const { default: mongoose } = require('mongoose')

const categorySchema = new mongoose.schema({
    name : {type: String, required : true, minlength:3, maxlength:30}
})

const Category = new mongoose.model('Category', categorySchema)

function validateData(category){
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(category, schema)
}

exports.Category = Category
exports.categorySchema = categorySchema
exports.validateData = validateData 