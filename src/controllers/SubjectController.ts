import {Request, Response} from 'express';
import {getMongoManager, getMongoRepository} from 'typeorm';
import Subject from '../database/schemas/Subject';
import { uuid } from 'uuidv4'
import Student from "../database/schemas/Student";

export default class SubjectController {
  async update(request: Request, response: Response) {
    const {id} = request.params;
    const {title, description, avatar } = request.body;

    const subjectRepository = getMongoRepository(Subject);
    const subjectUpdated = await subjectRepository.updateOne({id}, {
      $set:{
      id,
      title,
      description,
      avatar
      }
    },{upsert: true})
    response.status(200).json(subjectUpdated)
  }

  async delete(request: Request, response: Response) {
    const {id} = request.params;
    const subjectRepository = getMongoRepository(Subject)
    await subjectRepository.deleteOne({id})
    response.status(204).json()
  }

  async findById(request: Request, response: Response) {
    try {
      const {id} = request.params;
      const subjectRepository = getMongoRepository(Subject);
      const subject = await subjectRepository.findOne({where: {id}})
      response.json(subject);
    } catch (error) {
      console.log(error)
    }
    

  }
  async index(request: Request, response: Response) {
    const filters = request.query

    if(!filters.title && !filters.description) {
      const subjectRepository = getMongoRepository(Subject);
      const subject = await subjectRepository.find()
      return response.json(subject);
    }
    if(filters.title && !filters.description) {
      const subjectRepository = getMongoRepository(Subject);
      const subject = await subjectRepository.find({where: {title: {$regex : `.*${filters.title}.*`}}})

      return response.json(subject);
    }

    if(!filters.title && filters.description) {
      const subjectRepository = getMongoRepository(Subject);
      const subject = await subjectRepository.find({where: {description: {$regex : `.*${filters.description}.*`}}})

      return response.json(subject);
    }
    const subjectRepository = getMongoRepository(Subject);
    const subject = await subjectRepository.find({where:
          {
            title: {$regex : `.*${filters.title}.*`},
            description: {$regex : `.*${filters.description}.*`}
          }, })

    return response.json(subject);
  }

  async create (request: Request, response: Response) {
    const subject = new Subject()
    
    const {
      title,
      description,
      avatar
    } = request.body
  
    try {
      subject.title =  title;
      subject.description = description
      subject.avatar = avatar;
      subject.id = uuid();
      const manager = getMongoManager()
      const subjects = await manager.save(subject);
      return response.status(200).json(subjects)
    } catch (error) {
      return response.status(400).json({error: 'Ocorreu um erro ao cadastrar a materia'})
    }

  }
  
}