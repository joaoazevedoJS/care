import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  display: flex;
  place-content: center;

  span {
    width: 160px;
    color: var(--color-white-primary);
    background: #c53030;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s;

    display: flex;
    place-content: center;

    position: absolute;
    bottom: calc(100% + 12px);

    @media (max-width: 1280px) {
      right: 0;

      &::before {
        content: '';

        right: 7px;
      }
    }

    &::before {
      content: '';
      border-style: solid;
      border-color: #c53030 transparent;
      border-width: 6px 6px 0 6px;

      position: absolute;
      top: 100%;
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
