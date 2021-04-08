import React, { FC } from 'react';

import { Link, LinkProps } from 'react-router-dom';
import { Container } from './styled';

interface Props extends LinkProps {
  to: string;
  selected?: boolean;
}

const LinkTO: FC<Props> = ({ selected, children, ...rest }) => (
  <Container className="linkto" selected={selected}>
    <Link {...rest}>{children}</Link>
  </Container>
);

export default LinkTO;
