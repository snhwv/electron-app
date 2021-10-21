import { Box } from '@mui/material';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@mui/material/styles';
const useStyles = makeStyles({
  icon: {
    color: ({ theme }: any) => theme.palette.text.primary,
  },
});
const Icon: React.FC<{ type: IconType; className?: string }> = ({
  type,
  className,
}) => {
  const theme = useTheme();
  const style = useStyles({ theme });
  return (
    <span
      className={classnames('iconfont', type, style.icon, className)}
    ></span>
  );
};
export default Icon;
