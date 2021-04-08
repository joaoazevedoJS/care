import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateServicesService from '@domain/servicesProvider/services/CreateServicesService';
import UpdateImageService from '@domain/servicesProvider/services/UpdateImageService';
import GetServicesService from '@domain/servicesProvider/services/GetServicesService';

class ServiceController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getServices = container.resolve(GetServicesService);

    const services = await getServices.execute();

    return response.status(200).json(services);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { filename } = request.file;
    const { name, description, price, percentage_commission } = request.body;

    const createService = container.resolve(CreateServicesService);
    const updateImage = container.resolve(UpdateImageService);

    const service = await createService.execute({
      admin_id: id,
      name,
      description,
      price,
      percentage_commission,
    });

    await updateImage.execute({
      admin_id: id,
      filename,
      service_id: service.id,
    });

    return response.status(201).json(service);
  }
}

export default ServiceController;
