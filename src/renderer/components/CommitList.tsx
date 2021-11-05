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
import CommitItem from './CommitItem';

interface CommitListProps {
  commitList: any[];
}

const CommitList: React.FC<CommitListProps> = ({ commitList }) => {
  return (
    <div>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {commitList?.map((commit, index) => {
          return <CommitItem key={index} commit={commit}></CommitItem>;
        })}
      </List>
    </div>
  );
};

export default CommitList;
