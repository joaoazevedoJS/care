import ICreateServiceDTO from '../dtos/ICreateServiceDTO';
import IService from '../entities/IServices';

interface IServicesRepository {
  create(data: ICreateServiceDTO): Promise<IService>;
  findById(service_id: string): Promise<IService | undefined>;
  update(service: IService): Promise<void>;
  findAll(): Promise<IService[]>;
}

export default IServicesRepository;
