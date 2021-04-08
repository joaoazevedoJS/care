import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ContainerProps {
  isErrored?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #00000016;
  border-radius: 4px;
  display: grid;
  grid-template-columns: 1fr 24px;
  column-gap: 16px;

  ${props =>
    props.isErrored &&
    css`
      border: 1px solid #c53030;

      svg {
        color: #c53030 !important;
      }
    `}

  input {
    width: 100%;
    height: 100%;
    border: none;
  }

  margin-bottom: 24px;

  svg {
    font-size: 24px;
    cursor: pointer;
    color: var(--color-blue-primary);
    transition: color 0.4s;
  }

  svg:hover {
    color: ${shade(0.2, '#00AAD4')};
  }

  .icon-group {
    display: flex;
    align-items: center;
  }
`;
