import styled, { css } from 'styled-components';

interface Props {
  selected?: boolean;
}

export const Container = styled.div<Props>`
  ${props =>
    props.selected &&
    css`
      border-bottom: 2px solid var(--color-blue-primary);
      border-radius: 2px;
    `}

  @media (min-width: 750px) {
    font-size: 16px;
  }
`;
