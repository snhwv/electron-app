import CommentList from '@components/CommentList';
import {
  Button,
  Pagination,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface CommitProps {
  sourceId: number | string;
  fetchApi: (params: any) => Promise<any>;
  params?: any;
}

const Comment: React.FC<CommitProps> = ({ sourceId, fetchApi }) => {
  const [comments, setComments] = useState<any>({});

  const [page, setPage] = useState<number>(1);

  const fetchComment = () => {
    sourceId &&
      fetchApi &&
      fetchApi({ id: sourceId, limit: 20, offset: (page - 1) * 20 }).then(
        (re) => {
          setComments(re);
        }
      );
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
      {comments?.hotComments?.length ? (
        <>
          <Typography sx={{}}>精彩评论</Typography>
          <CommentList commentList={comments?.hotComments} />
        </>
      ) : null}
      <Typography sx={{ marginTop: '50px' }}>
        最新评论({comments?.total})
      </Typography>
      <CommentList commentList={comments?.comments} />
      <Pagination
        count={parseInt((comments?.total || 0) / 20 + '')}
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

export default Comment;
