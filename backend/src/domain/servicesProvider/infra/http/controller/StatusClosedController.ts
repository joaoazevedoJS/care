import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateStatusService from '@domain/servicesProvider/services/UpdateStatusService';
import GetAppointmentsService from '@domain/servicesProvider/services/GetAppointmentsService';

class StatusClosedController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { service_id } = request.params;

    const getAppointments = container.resolve(GetAppointmentsService);

    const appointments = await getAppointments.execute({
      service_id,
      status: 'closed',
    });

    return response.status(200).json({ appointments });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { appointment_id } = request.params;
    const { service_time } = request.body;

    const updateStatus = container.resolve(UpdateStatusService);

    const appointment = await updateStatus.execute({
      appointment_id,
      status: 'closed',
      service_time,
    });

    return response.status(201).json({ appointment });
  }
}

export default StatusClosedController;
