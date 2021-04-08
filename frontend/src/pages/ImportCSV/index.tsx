import { FC, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import filesize from 'filesize';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { useAuth, User } from '../../hooks/auth';

import Upload from '../../components/Upload';

import FileList from '../../components/FileList';

import { Container, ImportFileContainer, Title, Footer } from './styles';

import Alert from '../../assets/icons/alert.svg';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const ImportCSV: FC = () => {
  const history = useHistory();

  const { addToast } = useToast();
  const { getUser } = useAuth();

  const [user, setUser] = useState<User>();
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);

  useEffect(() => {
    async function load() {
      const response = await getUser();

      setUser(response);
    }

    load();
  }, [getUser]);

  const handleUpload = useCallback(async () => {
    const data = new FormData();

    data.append('services', uploadedFiles[0].file);

    try {
      await api.post('/services/csv', data);

      history.push('/');
    } catch (err) {
      addToast({
        title: 'Aconteceu um erro ao gravar o CSV!',
        type: 'error',
      });
    }
  }, [addToast, history, uploadedFiles]);

  const submitFile = useCallback(
    (files: File[]) => {
      const file: FileProps = {
        file: files[0],
        name: files[0].name,
        readableSize: filesize(files[0].size),
      };

      setUploadedFiles([...uploadedFiles, file]);
    },
    [uploadedFiles],
  );

  if (!user) {
    return <h1>loading...</h1>;
  }

  if (user.user_type.type !== 'admin') {
    addToast({
      title: 'Você não tem permissão para acessar essa página!',
      type: 'warn',
    });

    history.push('/');
  }

  return (
    <Container>
      <div>
        <Title>Importar Serviços</Title>

        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={Alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>

            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </div>
    </Container>
  );
};

export default ImportCSV;
