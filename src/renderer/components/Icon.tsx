import classnames from 'classnames';
const Icon: React.FC<{ type: IconType }> = ({ type }) => {
  return <span className={classnames('iconfont', type)}></span>;
};
export default Icon;
