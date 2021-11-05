import api from '@globalApi';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Icon from './Icon';

interface CommitItemProps {
  commit: any;
}

const CommitItem: React.FC<CommitItemProps> = ({ commit }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={commit.user.avatarUrl} />
        </ListItemAvatar>
        <ListItemText
          sx={{
            '& > .MuiTypography-root': {
              fontSize: '14px',
            },
          }}
          primary={
            <>
              {commit.user.nickname}：{commit.content}
              {commit?.beReplied?.map((item: any, index: number) => {
                return (
                  <Typography
                    // component="span"
                    key={index}
                    sx={{
                      background: '#e9e9e9',
                      padding: '5px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: '#838383',
                    }}
                  >
                    <span
                      style={{
                        color: 'rgb(0, 118, 187)',
                      }}
                    >
                      @{item.user.nickname}:
                    </span>
                    {item.content}
                  </Typography>
                );
              })}
            </>
          }
          secondary={
            <>
              <Stack
                component="span"
                direction="row"
                flexWrap="nowrap"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  component="span"
                  sx={{
                    fontSize: '12px',
                  }}
                >
                  {dayjs(commit?.time).format('YYYY年MM月DD日 hh:mm')}
                </Typography>
                <Stack
                  component="span"
                  divider={
                    <Divider
                      component="span"
                      orientation="vertical"
                      sx={{
                        margin: '0px 10px',
                      }}
                      flexItem
                    />
                  }
                  direction="row"
                  flexWrap="nowrap"
                  alignItems="center"
                  justifyContent="flex-end"
                  sx={{
                    width: 200,
                  }}
                >
                  {/* <span>举报</span> */}
                  <span>
                    <Icon
                      style={{
                        color: commit?.liked ? 'red' : '#878787',
                      }}
                      type="icon-thumb-up-outline"
                    ></Icon>
                    {commit?.likedCount ? (
                      <span>{commit?.likedCount}</span>
                    ) : null}
                  </span>
                  <Icon
                    style={{
                      color: '#878787',
                    }}
                    type="icon-share"
                  ></Icon>
                  <Icon
                    style={{
                      color: '#878787',
                    }}
                    type="icon-message-text-outline"
                  ></Icon>
                </Stack>
              </Stack>
            </>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default CommitItem;
