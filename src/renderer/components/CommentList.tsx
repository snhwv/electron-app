import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import CommentItem from './CommentItem';

interface CommentListProps {
  commentList: any[];
}

const CommentList: React.FC<CommentListProps> = ({ commentList }) => {
  return (
    <div>
      <List sx={{ width: '100%' }}>
        {commentList?.map((comment, index) => {
          return <CommentItem key={index} comment={comment}></CommentItem>;
        })}
      </List>
    </div>
  );
};

export default CommentList;
