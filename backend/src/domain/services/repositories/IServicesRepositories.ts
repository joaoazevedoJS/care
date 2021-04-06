import ICreateServiceDTO from '../dtos/ICreateServiceDTO';
import IService from '../entities/IServices';

interface IServicesRepositories {
  create(data: ICreateServiceDTO): Promise<IService>;
}

export default IServicesRepositories;
