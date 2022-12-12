const express =  require('express');
const router = express.Router();
const Course = require('../models/course');

//Get all
router.get('/', async (req, res) => {
    try{
        const course =  await Course.find();
        res.json(course);
    }catch (err){
        res.status(500).json({message: err.message})
    }
});

//Get one
router.get('/:id', getCourseById, (req, res) => {
    res.json(res.course);
});

//Create one
router.post('/', async (req, res) => {
    const course = new Course({
        courseId: req.body.courseId,
        courseName: req.body.courseName,
        progression: req.body.progression,
        semester: req.body.semester,
        syllabus: req.body.syllabus
    })
    try{
        const newCourse = await course.save();
        res.status(201).json(newCourse);
    }catch (err){
        res.status(400).json({message: err.message})
    }
});

//Update one
router.patch('/:id', getCourseById, async (req, res) => {
    if(req.body.courseId != null || req.body.courseName != null || req.body.progression != null || req.body.semester != null || req.body.syllabus != null){
        res.course.courseId = req.body.courseId;
        res.course.courseName = req.body.courseName;
        res.course.progression = req.body.progression;
        res.course.semester = req.body.semester;
        res.course.syllabus = req.body.syllabus;
    }
    try{
        const updtCourse = await res.course.save();
        res.json(updtCourse);
    }catch (err){
        res.status(400).json({message: err.message})
    }
});

//Delete one
router.delete('/:id', getCourseById, async (req, res) => {
    try{
        await res.course.remove()
        res.json({message: "Course has been deleted!"})
    }catch (err){
        res.status(500).json({message: err.message})
    }
});


async function getCourseById(req, res, next){
    let course
    try{
        course = await Course.findById(req.params.id)
        if(course == null){
            return res.status(404).json({message: "There is not course with this id!"})
        }
    }catch (err) {
        res.status(500).json({message: err.message});
    }

    res.course = course;
    next()
} 



module.exports = router;