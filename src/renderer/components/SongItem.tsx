import CustomImg from '@components/CustomImg';
import Icon from '@components/Icon';
import {
  Avatar,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  ListItemTypeMap,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
interface SongItemProps {
  listItemProps?: any;
  containerStyle?: any;
  index: any;
  item: any;
  suffix?: any;
  primary?: any;
  secondary?: any;
  onClick?: any;
  style?: any;
  suffixIcons?: any[];
}

const itemIconStyle = {
  fontSize: 16,
  marginRight: '4px',
  color: '#b9b9b9',
};
const SongItem: React.FC<SongItemProps> = ({
  listItemProps,
  children,
  containerStyle,
  index,
  item,
  suffixIcons,
  suffix: suffixRender,
  primary,
  onClick,
  style,
  secondary,
}) => {
  const suffix = (
    <Box>
      {suffixRender?.(item) ||
        suffixIcons?.map(({ icon, ...rest }) => {
          return (
            <Icon
              type={icon}
              style={itemIconStyle}
              {...rest}
              onClick={() => rest?.onClick(item)}
            ></Icon>
          );
        })}
    </Box>
  );

  return (
    <ListItem
      disablePadding
      sx={{
        height: 54,
        '& > .MuiListItemButton-root': {
          paddingTop: 0,
          paddingBottom: 0,
          maxWidth: '100%',
        },
        '& .MuiTypography-root': {
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          wordBreak: 'break-all',
        },
        ...containerStyle,
      }}
      {...listItemProps}
      onClick={onClick}
      style={style}
    >
      <ListItemButton>
        {typeof index === 'number' ? (
          <Typography
            sx={{
              width: 24,
              marginRight: '4px',
              color: '#8f8f8f',
              flexShrink: 0,
              flexGrow: 0,
              fontSize: '0.9rem',
            }}
          >
            {index < 9 && 0}
            {index + 1}
          </Typography>
        ) : null}

        <CustomImg
          url={item.al.picUrl}
          imgWidth={30}
          containerStyle={{
            width: 30,
            height: 30,
            marginRight: '15px',
            borderRadius: '0px 10px',
            flexShrink: 0,
            flexGrow: 0,
          }}
          blurStyle={{
            display: 'none',
          }}
        ></CustomImg>

        <ListItemText
          primary={
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                paddingRight: '10px',
              }}
            >
              <span
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color: item?.privilege.st === -200 ? '#ccc' : 'unset',
                }}
              >
                {primary || item.name}
              </span>
              {item?.privilege.st !== -200 ? (
                <>
                  {item?.privilege.fee === 1 && (
                    <Chip label="vip" size="small" />
                  )}
                  {item?.privilege.dl === 999000 && (
                    <Chip label="sq" size="small" />
                  )}
                  {item?.mv ? <Chip label="mv" size="small" /> : null}
                </>
              ) : null}
              {item?.privilege.st === -200 && (
                <Chip label="无音源" size="small" />
              )}
            </div>
          }
          secondary={
            <span style={{ fontSize: '0.8rem' }}>
              {secondary || item.ar.map((item: any) => item.name).join()}
            </span>
          }
        />
        <ListItemText />
        {suffix}
      </ListItemButton>
    </ListItem>
  );
};

export default SongItem;
