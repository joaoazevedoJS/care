import React, { ButtonHTMLAttributes, FC } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  uppercase?: boolean;
  transparent?: boolean;
  blue?: boolean;
}

const Button: FC<ButtonProps> = ({
  blue,
  uppercase,
  transparent,
  children,
  ...rest
}) => (
  <Container
    blue={blue}
    uppercase={uppercase}
    transparent={transparent}
    {...rest}
  >
    {children}
  </Container>
);

export default Button;
