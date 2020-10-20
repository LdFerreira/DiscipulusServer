import {Request, Response} from 'express';
import {getMongoManager, getMongoRepository} from 'typeorm'
import Registration from '../database/schemas/Registration';
import { uuid } from 'uuidv4'

export default class RegistrationControllerController {

  async update(request: Request, response: Response) {
    const {id} = request.params;
    const {
      name,
      subjects
    } = request.body;

    const registrationRepository = getMongoRepository(Registration);
    const registrationUpdated = await registrationRepository.updateOne({id}, {
      $set:{
        name,
        subjects
      }
    },{upsert: true})
    response.status(200).json(registrationUpdated)
  }


  async index(request: Request, response: Response) {
    const filters = request.query
    if(filters.name) {
      const registrationRepository = getMongoRepository(Registration);
      const registrations = await registrationRepository.find({where: {name: {$regex : `.*${filters.name}.*`}}})

      return response.json(registrations);
    }
    const registrationRepository = getMongoRepository(Registration);
    const registrations = await registrationRepository.find()
    return response.json(registrations);



  }

  async delete(request: Request, response: Response) {
    const {id} = request.params;
    const registrationRepository = getMongoRepository(Registration)
    await registrationRepository.deleteOne({id})
    response.status(204).json()
  }

  async findById(request: Request, response: Response) {
    const {id} = request.params;

    const registrationRepository = getMongoRepository(Registration);
    const registration = await registrationRepository.findOne({id})
    console.log(registration)
    response.status(200).json(registration)

  }
  async create (request:Request, response: Response) {

    const registration = new Registration()

    const {
      name,
      subjects
    } = request.body

    try {
      registration.name = name;
      registration.subjects = subjects
      registration.id = uuid();
      const manager = getMongoManager()

      const registrations = await manager.save(registration);

      return response.status(200).json(registrations)
    } catch (error) {
      return response.status(400).json({error: 'Ocorreu um erro ao cadastrar o usuario'})
    }
  }
}