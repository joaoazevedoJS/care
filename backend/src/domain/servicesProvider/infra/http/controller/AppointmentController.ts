import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { parseISO } from 'date-fns';

import CreateAppointmentService from '@domain/servicesProvider/services/CreateAppointmentService';
import GetAppointmentsService from '@domain/servicesProvider/services/GetAppointmentsService';
import GetResumeAppointmentService from '@domain/servicesProvider/services/GetResumeAppointmentService';

class AppointmentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { service_id } = request.params;

    const getAppointments = container.resolve(GetAppointmentsService);

    const appointments = await getAppointments.execute({
      service_id,
    });

    return response.status(200).json({ appointments });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { appointment_id } = request.params;

    const getResume = container.resolve(GetResumeAppointmentService);

    const resume = await getResume.execute(appointment_id);

    return response.status(200).json(resume);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { service_id } = request.params;
    const { time_minutes, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({
      service_id,
      doctor_id: id,
      date: parsedDate,
      time_minutes,
    });

    return response.status(201).json({ appointment });
  }
}

export default AppointmentController;
