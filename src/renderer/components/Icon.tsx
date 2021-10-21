import classnames from 'classnames';
const Icon: React.FC<{ type: IconType; className?: string }> = ({
  type,
  className,
}) => {
  return <span className={classnames('iconfont', type, className)}></span>;
};
export default Icon;
