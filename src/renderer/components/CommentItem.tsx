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
import { reSizeImg } from '@utils/funcs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Icon from './Icon';

interface CommentItemProps {
  comment: any;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={reSizeImg(comment.user.avatarUrl, 50)} />
        </ListItemAvatar>
        <ListItemText
          sx={{
            '& > .MuiTypography-root': {
              fontSize: '0.9rem',
            },
          }}
          primary={
            <>
              {comment.user.nickname}：{comment.content}
              {comment?.beReplied?.map((item: any, index: number) => {
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
                  {dayjs(comment?.time).format('YYYY年MM月DD日 hh:mm')}
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
                        color: comment?.liked ? 'red' : '#878787',
                      }}
                      type="icon-thumb-up-outline"
                    ></Icon>
                    {comment?.likedCount ? (
                      <span>{comment?.likedCount}</span>
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

export default CommentItem;
