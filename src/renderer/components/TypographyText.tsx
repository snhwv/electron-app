import { Typography, TypographyProps } from '@mui/material';
import React from 'react';
const Emoji: any = {
  大笑: '86',
  可爱: '85',
  憨笑: '359',
  色: '95',
  亲亲: '363',
  惊恐: '96',
  流泪: '356',
  亲: '362',
  呆: '352',
  哀伤: '342',
  呲牙: '343',
  吐舌: '348',
  撇嘴: '353',
  怒: '361',
  奸笑: '341',
  汗: '97',
  痛苦: '346',
  惶恐: '354',
  生病: '350',
  口罩: '351',
  大哭: '357',
  晕: '355',
  发怒: '115',
  开心: '360',
  鬼脸: '94',
  皱眉: '87',
  流感: '358',
  爱心: '33',
  心碎: '34',
  钟情: '303',
  星星: '309',
  生气: '314',
  便便: '89',
  强: '13',
  弱: '372',
  拜: '14',
  牵手: '379',
  跳舞: '380',
  禁止: '374',
  这边: '262',
  爱意: '106',
  示爱: '376',
  嘴唇: '367',
  狗: '81',
  猫: '78',
  猪: '100',
  兔子: '459',
  小鸡: '450',
  公鸡: '461',
  幽灵: '116',
  圣诞: '411',
  外星: '101',
  钻石: '52',
  礼物: '107',
  男孩: '0',
  女孩: '1',
  蛋糕: '337',
  18: '186',
  圈: '312',
  叉: '313',
};
const TypographyText: React.FC<any> = ({ children, ...rest }) => {
  return (
    <Typography {...rest}>
      {React.Children.map(children, (child, index) => {
        if (typeof child === 'string') {
          let hasEmoji = false;
          const newText = child.replace(/\[([\s\S]*?)\]/g, (_, str) => {
            hasEmoji = hasEmoji || Emoji[str];
            return Emoji[str]
              ? `<img
                style="vertical-align:middle;height:18px;width:18px;"
                src="https://s1.music.126.net/style/web2/emt/emoji_${Emoji[str]}.png"
              ></img>`
              : _;
          });
          return hasEmoji ? (
            <span dangerouslySetInnerHTML={{ __html: newText }}></span>
          ) : (
            child
          );
        }
        return child;
      })}
    </Typography>
  );
};
export default TypographyText;
