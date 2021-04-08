import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  max-width: 1216px;
  width: 100%;
  margin: 64px auto;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 64px;

    > div {
      display: flex;

      img {
        width: 120px;
        height: 120px;
        border-radius: 50%;
      }

      div {
        margin-left: 24px;

        strong {
          font-size: 2.25rem;
          color: #3d3d4b;
        }

        button {
          height: 36px;
        }
      }
    }
  }

  main {
  }
`;
