import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  uppercase?: boolean;
  transparent?: boolean;
  blue?: boolean;
}

export const Container = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  padding: 8px 20px;
  font-weight: bold;
  border-radius: 8px;
  border: 2px solid var(--color-green-primary);
  background: var(--color-green-primary);
  color: var(--color-white-primary);
  transition: background-color 0.4s, color 0.4s, border 0.4s;

  &:hover {
    background: ${shade(0.2, '#0ADE34')};
    border: 2px solid ${shade(0.2, '#0ADE34')};
  }

  ${props =>
    props.uppercase &&
    css`
      text-transform: uppercase;
    `}

  ${props =>
    props.transparent &&
    css`
      color: var(--color-green-primary);
      background: var(--color-white-primary);

      &:hover {
        background: var(--color-green-primary);
        color: var(--color-white-primary);
        border-color: #0ade34;
      }
    `}

    ${props =>
    props.blue &&
    css`
      color: var(--color-blue-primary);
      background: var(--color-white-primary);
      border-color: var(--color-blue-primary);

      &:hover {
        background: var(--color-blue-primary);
        color: var(--color-white-primary);
        border-color: var(--color-blue-primary);
      }
    `}
`;
