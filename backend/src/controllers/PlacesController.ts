import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Place from '../models/Place';
import PlaceView from '../views/places_view';

export default {
  async index(request: Request, response: Response) {
    const placesRepository = getRepository(Place);

    const places = await placesRepository.find({
      relations: ['images']
    });

    return response.json(PlaceView.renderMany (places));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const placesRepository = getRepository(Place);

    const place = await placesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(PlaceView.render(place));
  },

  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      veg_type,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const placesRepository = getRepository(Place);

    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const place = placesRepository.create({
      name,
      latitude,
      longitude,
      about,
      veg_type,
      opening_hours,
      open_on_weekends,
      images,
    });

    await placesRepository.save(place);

    return response.status(201).json(place);
  }
};