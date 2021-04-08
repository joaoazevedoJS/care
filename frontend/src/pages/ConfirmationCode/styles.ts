import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  max-width: 1216px;
  width: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;

  form {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    grid-area: form;
    padding: 32px 24px;
    box-shadow: 1px 0px 8px #00000016;
    border-radius: 8px;
    background: #fff;

    h1 {
      text-align: center;
      font-weight: 700;
      padding-bottom: 16px;
      margin-bottom: 32px;
      border-bottom: 1px solid #00000016;
    }

    button[type='submit'] {
      width: 100%;
      margin: 24px 0;
    }
  }
`;
