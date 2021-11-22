import api from '@globalApi';
import {
  Avatar,
  Card,
  CardContent,
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
import TypographyText from './TypographyText';

interface CommentItemProps {
  comment: any;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={reSizeImg(comment.user.avatarUrl, 50)}
          />
        </ListItemAvatar>
        <ListItemText
          sx={{
            '& > .MuiTypography-root': {
              fontSize: '0.9rem',
            },
          }}
          primary={
            <>
              {comment.user.nickname}：
              <TypographyText component="span">
                {comment.content}
              </TypographyText>
              {comment?.beReplied?.map((item: any, index: number) => {
                return (
                  <Card
                    sx={{
                      background: '#ffffff6e',
                    }}
                    key={index}
                  >
                    <CardContent
                      sx={{
                        padding: 1,
                        '&:last-child': {
                          paddingBottom: 1,
                        },
                      }}
                    >
                      <TypographyText>
                        <TypographyText component="span" color="primary.main">
                          @{item.user.nickname}:
                        </TypographyText>
                        <TypographyText
                          component="span"
                          color="text.secondary"
                          fontSize={'small'}
                        >
                          {item.content}
                        </TypographyText>
                      </TypographyText>
                    </CardContent>
                  </Card>
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
                <TypographyText component="span" fontSize={'small'}>
                  {dayjs(comment?.time).format('YYYY年MM月DD日 hh:mm')}
                </TypographyText>
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
