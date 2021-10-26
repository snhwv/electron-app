// import style from './recommend.scss';

const Recommend: React.FC<{ recommendList: any[] }> = ({ recommendList }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '200px',
        background: 'linear-gradient(0deg, #fff, transparent)',
        marginTop: '-200px',
        zIndex: 1,
        position: 'relative',
        display: 'flex',
      }}
    >
      {recommendList?.map((item) => {
        return (
          <div
            style={{
              width: '10em',
              aspectRatio: '1',
            }}
          >
            <img
              style={{
                width: '100%',
                height: '100%',
              }}
              src={item?.picUrl}
            />
          </div>
        );
      })}
    </div>
  );
};
export default Recommend;
