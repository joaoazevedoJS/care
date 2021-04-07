import ICVS from '../models/ICVS';
import IStorageProvider from '../models/IStorageProvider';

class FakeStorageProvider implements IStorageProvider {
  private storage: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    this.storage.splice(findIndex, 1);
  }

  public async readCSV(file: string): Promise<ICVS> {
    await this.saveFile(file);

    const titles = ['nome', 'descricao', 'preco', 'porcentagem'];

    const columns = [
      ['Consulta', 'Consulta básica', '50', '10'],
      ['Consulta', 'Consulta básica', '50', '10'],
      ['Consulta', 'Consulta básica', '50', '10'],
    ];

    return { titles, columns };
  }
}

export default FakeStorageProvider;
