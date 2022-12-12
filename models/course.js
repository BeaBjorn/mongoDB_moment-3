const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseId: {
        type: String, 
        required: true
    },
    courseName: {
        type: String, 
        required: true
    },
    progression: {
        type: String, 
        required: true
    },
    semester: {
        type: String, 
        required: true
    },
    syllabus: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('course', courseSchema);