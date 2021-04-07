import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateImageService from '@domain/servicesProvider/services/UpdateImageService';

class UpdateImageController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { filename } = request.file;
    const { service_id } = request.params;

    const updateImage = container.resolve(UpdateImageService);

    await updateImage.execute({
      admin_id: id,
      filename,
      service_id,
    });

    return response.status(204).send();
  }
}

export default UpdateImageController;
