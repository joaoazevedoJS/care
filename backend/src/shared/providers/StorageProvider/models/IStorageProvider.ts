import ICVS from './ICVS';

interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
  readCSV(file: string): Promise<ICVS>;
}

export default IStorageProvider;
