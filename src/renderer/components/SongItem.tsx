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
import TypographyText from './TypographyText';
interface SongItemProps {
  listItemProps?: any;
  containerStyle?: any;
  index: any;
  item: any;
  suffix?: any;
  primary?: any;
  secondary?: any;
  onClick?: any;
  showImg?: any;
  showTag?: any;
  prefix?: any;
  style?: any;
  suffixIcons?: any[];
}

const itemIconStyle = {
  fontSize: 14,
  marginRight: '4px',
  color: '#b9b9b9',
};
const SongItem: React.FC<SongItemProps> = ({
  listItemProps,
  children,
  containerStyle,
  index,
  showImg = true,
  showTag = true,
  prefix: prefixRender,
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

  const tags = (
    <>
      {item?.privilege.st !== -200 ? (
        <>
          {item?.privilege.fee === 1 && (
            <Chip
              style={{ marginLeft: 4, height: '14px', marginTop: 5 }}
              label="vip"
              size="small"
            />
          )}
          {item?.privilege.dl === 999000 && (
            <Chip
              style={{ marginLeft: 4, height: '14px', marginTop: 5 }}
              label="sq"
              size="small"
            />
          )}
          {item?.mv ? (
            <Chip
              style={{ marginLeft: 4, height: '14px', marginTop: 5 }}
              label="mv"
              size="small"
            />
          ) : null}
        </>
      ) : null}
      {item?.privilege.st === -200 && (
        <Chip
          style={{ marginLeft: 4, height: '14px', marginTop: 5 }}
          label="无音源"
          size="small"
        />
      )}
    </>
  );

  const defaultPrefix =
    typeof index === 'number' ? (
      <>
        {index < 9 && 0}
        {index + 1}
      </>
    ) : null;

  const prefix = prefixRender
    ? prefixRender({ rowData: item, defaultPrefix })
    : defaultPrefix;

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
        ...containerStyle,
      }}
      {...listItemProps}
      onClick={onClick}
      style={style}
    >
      <ListItemButton>
        <TypographyText
          flexShrink={0}
          flexGrow={0}
          width={24}
          mr={0.5}
          color={'text.secondary'}
          fontSize={'small'}
        >
          {prefix}
        </TypographyText>
        {showImg ? (
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
        ) : null}

        <ListItemText
          primary={
            <Box
              pr={1}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
              }}
            >
              <TypographyText
                noWrap
                fontSize="small"
                color={item?.privilege.st === -200 ? 'text.secondary' : 'unset'}
              >
                {primary || item.name}
              </TypographyText>
              {showTag && tags}
            </Box>
          }
          secondary={
            <TypographyText noWrap fontSize="smaller" color={'text.secondary'}>
              {secondary || item.ar.map((item: any) => item.name).join()}
            </TypographyText>
          }
        />
        <ListItemText />
        {suffix}
      </ListItemButton>
    </ListItem>
  );
};

export default SongItem;
