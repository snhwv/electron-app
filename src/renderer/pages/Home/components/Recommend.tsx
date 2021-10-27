import BlurImg from '@components/BlurImg';

// import style from './recommend.scss';
const boxSize = 130;
const boxMargin = 30;
const Recommend: React.FC<{ recommendList: any[] }> = ({ recommendList }) => {
  return (
    <div
      style={{
        width: (boxSize + boxMargin) * 3,
      }}
    >
      {recommendList?.map((item) => {
        return (
          <BlurImg
            url={item.picUrl}
            containerStyle={{
              width: boxSize,
              height: boxSize,
              marginRight: `${boxMargin}px`,
              marginBottom: `${boxMargin}px`,
            }}
          ></BlurImg>
        );
      })}
    </div>
  );
};
export default Recommend;
