import { Box } from '@mui/system';
import { CSSProperties } from 'react';

const BlurImg: React.FC<
  {
    url: string;
    containerStyle?: CSSProperties;
    blurStyle?: CSSProperties;
  } & any
> = ({ url, containerStyle, blurStyle, children, ...rest }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        background: `url(${url})`,
        backgroundSize: '100% 100%',
        borderRadius: 4,
        ...containerStyle,
        '&::before': {
          content: '""',
          background: 'inherit',
          width: '100%',
          height: '100%',
          position: 'absolute',
          filter: 'blur(10px)',
          zIndex: -1,
          top: '12px',
          boxShadow: '0px 10px 40px 0px rgb(76 70 124 / 50%)',
          transform: 'scale(0.9)',
          opacity: 0.9,
          borderRadius: '15px',
          ...blurStyle,
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};
export default BlurImg;
