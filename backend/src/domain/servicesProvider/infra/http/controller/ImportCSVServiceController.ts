import ImportCSVServiceService from '@domain/servicesProvider/services/ImportCSVServiceService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ImportCSVServiceController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    const importCSV = container.resolve(ImportCSVServiceService);

    const services = await importCSV.execute(file);

    return response.status(201).json({ services });
  }
}

export default ImportCSVServiceController;
