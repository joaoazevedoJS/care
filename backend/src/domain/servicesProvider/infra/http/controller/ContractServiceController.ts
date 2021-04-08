import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ContractServiceService from '@domain/servicesProvider/services/ContractServiceService';

class ContractServiceController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { appointment_id } = request.params;

    const ContractService = container.resolve(ContractServiceService);

    const appointment = await ContractService.execute({
      user_id: id,
      appointment_id,
    });

    return response.status(201).json(appointment);
  }
}

export default ContractServiceController;
