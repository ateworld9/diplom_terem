import React from 'react';
import { Box } from '@mui/system';

const Logo: React.FC = () => (
  <Box sx={{
    maxWidth: '100%', minWidth: '107px', position: 'relative', mt: '6px',
  }}
  >
    <div style={{
      position: 'absolute',
      left: '27px',
      top: '10px',
      margin: 'auto',
      width: '52px',
      height: '42px',
      background: 'url(/images/logo-top.svg)',
      backgroundSize: '100% auto',
    }}
    />
    <div style={{
      position: 'absolute',
      left: 0,
      top: '39px',
      margin: 'auto',
      width: '107px',
      height: '30px',
      background: 'url(/images/logo-bottom.svg)',
      backgroundSize: '100% auto',
    }}
    />
  </Box>
);

export default Logo;
