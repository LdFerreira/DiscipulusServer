import {Request, Response} from 'express';
import {getMongoManager, getMongoRepository} from 'typeorm'
import Student from '../database/schemas/Student';
import { uuid } from 'uuidv4'

export default class StudentController {

  async update(request: Request, response: Response) {
    const {id} = request.params;
    const {avatar, name, email, birth } = request.body;

    const studentRepository = getMongoRepository(Student);
    const studentUpdated = await studentRepository.updateOne({id}, {
      $set:{
      id,
      avatar,
      name,
      email,
      birth
      }
    },{upsert: true})
    response.status(200).json(studentUpdated)
  }


  async index(request: Request, response: Response) {
    const filters = request.query

    if(!filters.name && !filters.email) {
      const studentRepository = getMongoRepository(Student);
      const student = await studentRepository.find()
      return response.json(student);
    }
    if(filters.name && !filters.email) { 
      const studentRepository = getMongoRepository(Student);
      const students = await studentRepository.find({where: {name: {$regex : `.*${filters.name}.*`}}})
  
      return response.json(students);
    }
    
    if(!filters.name && filters.email) { 
      const studentRepository = getMongoRepository(Student);
      const students = await studentRepository.find({where: {email: {$regex : `.*${filters.email}.*`}}})
  
      return response.json(students);
    }
    const studentRepository = getMongoRepository(Student);
    const students = await studentRepository.find({where: 
      {
        name: {$regex : `.*${filters.name}.*`}, 
        email: {$regex : `.*${filters.email}.*`}
      }, })

    return response.json(students);
  }

  async delete(request: Request, response: Response) {
    const {id} = request.params;
    const studentRepository = getMongoRepository(Student)
    await studentRepository.deleteOne({id})
    response.status(204).json()
  }

  async findById(request: Request, response: Response) {
    const {id} = request.params;
    const studentRepository = getMongoRepository(Student);
    const student = await studentRepository.findOne({where: id })
    response.status(200).json(student)

  }
  async create (request:Request, response: Response) {
    
      const student = new Student()
    
      const {
        avatar,
        name,
        email,
        birth
      } = request.body
  
      try {
      student.avatar = avatar;
      student.name = name;
      student.email = email
      student.birth = birth;
      student.id = uuid();
      const manager = getMongoManager()
  
      const students = await manager.save(student);
  
      return response.status(200).json(students)
    } catch (error) {
      return response.status(400).json({error: 'Ocorreu um erro ao cadastrar o usuario'})
    }
  }
}