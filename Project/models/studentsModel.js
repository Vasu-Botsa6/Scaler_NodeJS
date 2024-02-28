const Joi = require('joi')
const { default: mongoose } = require('mongoose')

const studentSchema = new mongoose.schema({
    name : {type: String, required : true, minlength:3, maxlength:30},
    isEnrolled : { type:Boolean, default:false},
    Phone:{type:String, required:true, minlength:10, maxlength:25}
})

const Student = new mongoose.model('Student', studentSchema)

function validateData(student){
    const schema = {
        name : Joi.string().min(3).max(50).required(),
        Phone : Joi.string().min(10).max(50).required(),
        isEnrolled : Joi.boolean()
    }
    return Joi.validate(student, schema)
}

exports.Student = Student
exports.validateData = validateData 