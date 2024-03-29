import { Box } from '@mui/material';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@mui/material/styles';
import { CSSProperties } from 'react';
const useStyles = makeStyles({
  icon: {
    color: ({ theme }: any) => theme.palette.text.primary,
  },
});
const Icon: React.FC<
  {
    type: IconType;
    className?: string;
    style?: CSSProperties;
  } & React.HTMLAttributes<HTMLSpanElement>
> = ({ type, className, ...rest }) => {
  const theme = useTheme();
  const iconStyle = useStyles({ theme });
  return (
    <span
      className={classnames('iconfont', type, iconStyle.icon, className)}
      {...rest}
    ></span>
  );
};
export default Icon;
