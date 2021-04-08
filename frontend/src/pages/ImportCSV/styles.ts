import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 736px;
  margin: 0 auto;

  display: flex;
  align-items: center;

  > div {
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  color: #363f5f;
  text-align: center;
`;

export const ImportFileContainer = styled.section`
  background: #fff;
  margin-top: 40px;
  border-radius: 5px;
  padding: 64px;
`;

export const Footer = styled.section`
  margin-top: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 18px;
    color: #969cb3;

    img {
      margin-right: 8px;
      width: 24px;
    }
  }

  button {
    background: #00aad4;
    color: #fff;
    border-radius: 5px;
    padding: 15px 80px;
    border: 0;
    transition: background-color 0.2s;
    font-size: 1rem;

    &:hover {
      background: ${shade(0.2, '#00AAD4')};
    }
  }
`;
