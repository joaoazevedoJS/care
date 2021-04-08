import React, { FC } from 'react';

import { Container } from './styles';

interface TooltipProps {
  title: string;
  className?: string;
}

const Tooltip: FC<TooltipProps> = ({ title, className, children }) => (
  <Container className={className}>
    <span>{title}</span>

    {children}
  </Container>
);

export default Tooltip;
