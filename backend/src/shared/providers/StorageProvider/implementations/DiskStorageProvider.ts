import fs from 'fs';
import path from 'path';
import csvParse from 'csv-parse';

import uploadConfig from '@configs/upload';

import IStorageProvider from '../models/IStorageProvider';
import ICVS from '../models/ICVS';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }

  public async readCSV(file: string): Promise<ICVS> {
    const csvStream = fs.createReadStream(file);

    const parseStream = csvParse({ ltrim: true, rtrim: true });

    const parseCSV = csvStream.pipe(parseStream);

    const titles: string[] = [];
    const columns: Array<string[]> = [];

    parseCSV.on('data', (line: string[]) => {
      if (titles.length === 0) {
        titles.push(...line);
      } else {
        columns.push(line);
      }
    });

    await new Promise(resolve => parseCSV.on('end', resolve));

    return { titles, columns };
  }
}

export default DiskStorageProvider;
