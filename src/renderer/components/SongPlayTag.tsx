import { IconButton } from '@mui/material';
import { getPlaying } from '@store/features/playSongSlice';
import { useSelector } from 'react-redux';
import Icon from './Icon';

const SongPlayTag = () => {
  const playing = useSelector(getPlaying);
  return playing ? (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        width: 16,
      }}
    >
      {[...new Array(4).keys()].map((item, index) => {
        return (
          <div
            style={{
              animation: `line-scale 0.8s -.${index}s infinite cubic-bezier(.2,.68,.18,1.08)`,
              width: 2,
              height: 15,
              display: 'inline-block',
              background: 'red',
            }}
          ></div>
        );
      })}
    </div>
  ) : (
    <Icon type="icon-play" />
  );
};
export default SongPlayTag;
