import CommitItem from '@components/CommitItem';
import CommitList from '@components/CommitList';
import {
  Button,
  Pagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../api';

interface CommitProps {
  sourceId: number | string;
}

const Commit: React.FC<CommitProps> = ({ sourceId }) => {
  const [commits, setCommits] = useState<any>({});

  const [page, setPage] = useState<number>(1);

  const fetchComment = () => {
    sourceId && api
      .comment({ id: sourceId, limit: 20, offset: (page - 1) * 20 })
      .then((re) => {
        setCommits(re);
      });
  };

  useEffect(() => {
    fetchComment();
  }, [page, sourceId]);

  const onChange = (_: any, page: number) => {
    setPage(page);
  };
  return (
    <div
      style={{
        padding: '20px',
      }}
    >
      <TextField
        id="filled-multiline-flexible"
        label="请输入..."
        multiline
        rows={4}
        maxRows={4}
        fullWidth
        // value={value}
        // onChange={handleChange}
        variant="filled"
      />
      <Stack
        direction="row"
        flexWrap="nowrap"
        paddingTop="10px"
        alignItems="center"
      >
        <Button
          variant="outlined"
          size="small"
          sx={{
            marginLeft: 'auto',
            borderRadius: '40px',
          }}
        >
          评论
        </Button>
      </Stack>
      {commits?.hotComments?.length ? (
        <>
          <Typography sx={{}}>精彩评论</Typography>
          <CommitList commitList={commits?.hotComments} />
        </>
      ) : null}
      <Typography sx={{ marginTop: '50px' }}>
        最新评论({commits?.total})
      </Typography>
      <CommitList commitList={commits?.comments} />
      <Pagination
        count={parseInt((commits?.total || 0) / 20 + '')}
        variant="outlined"
        page={page}
        onChange={onChange}
        color="primary"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      />
    </div>
  );
};

export default Commit;
