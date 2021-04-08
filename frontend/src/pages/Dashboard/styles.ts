import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  max-width: 1216px;
  width: 100%;
  margin: 64px auto;

  header {
    display: flex;
    align-items: center;
    margin-bottom: 64px;

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
      p {
        font-size: 1.12rem;
        color: #737380;
        margin-top: 4px;
      }
    }
  }

  main {
    li {
      &:hover {
        background: ${shade(0.1, '#fefefe')};
      }

      & + li {
        margin-top: 32px;
      }

      cursor: pointer;
      list-style: none;
      max-width: 450px;
      margin: 0 auto;
      display: flex;
      align-items: center;

      border-radius: 16px;

      img {
        border-radius: 16px;
        width: 100px;
        height: 100px;
        object-fit: cover;
      }

      > div {
        margin-left: 24px;

        p {
          font-size: 24px;
        }
      }
    }
  }
`;
