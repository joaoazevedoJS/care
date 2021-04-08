import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.ul`
  li {
    cursor: pointer;
    list-style: none;
    max-width: 450px;
    margin: 0 auto;

    border-radius: 16px;

    &:hover {
      background: ${shade(0.1, '#fefefe')};
    }

    & + li {
      margin-top: 32px;
    }

    button {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      border-radius: 16px;
      background: transparent;
      border: none;

      img {
        border-radius: 16px;
        width: 100px;
        height: 100px;
        object-fit: cover;
      }

      > div {
        margin-left: 24px;

        display: flex;
        flex-direction: column;
        align-items: flex-start;

        p {
          font-size: 24px;
        }

        strong {
          font-weight: 700;
          font-size: 1rem;
          color: var(--color-blue-primary);
        }
      }
    }
  }
`;
