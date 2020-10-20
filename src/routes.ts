import express from 'express';
import StudentController from './controllers/StudentController'
import SubjectController from './controllers/SubjectController'
import RegistrationController from './controllers/RegistrationController'
const studentController = new StudentController()
const subjectController = new SubjectController()
const registrationController = new RegistrationController()
const routes = express.Router();


routes.post('/subject', subjectController.create )
routes.get('/subject', subjectController.index )
routes.get('/subject/:id', subjectController.findById )
routes.delete('/subject/:id', subjectController.delete )
routes.put('/subject/:id', subjectController.update )

routes.post('/student', studentController.create )
routes.get('/student', studentController.index )
routes.get('/student/:id', studentController.findById )
routes.delete('/student/:id', studentController.delete )
routes.put('/student/:id', studentController.update )

routes.post('/registration', registrationController.create )
routes.get('/registration', registrationController.index )
routes.get('/registration/:id', registrationController.findById )
routes.delete('/registration/:id', registrationController.delete )
routes.put('/registration/:id', registrationController.update )

export default routes;