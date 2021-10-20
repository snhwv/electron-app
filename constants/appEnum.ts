export const SIDE_BAR_MINI_WIDTH = 48;
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 80;

export const ColorMap: any = {
  未审核: "color-red-6",
  已审核: "color-blue-6",
  已记账: "color-green-6",
  已结束: "color-yellow-6",
};
// menu theme enum
export enum ThemeEnum {
  DARK = "dark",
  LIGHT = "light",
}

export enum SettingButtonPositionEnum {
  AUTO = "auto",
  HEADER = "header",
  FIXED = "fixed",
}

export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  // role
  ROLE = "ROLE",
  // black
  BACK = "BACK",
  // route mapping
  ROUTE_MAPPING = "ROUTE_MAPPING",
}

//  Route switching animation
export enum RouterTransitionEnum {
  ZOOM_FADE = "zoom-fade",
  ZOOM_OUT = "zoom-out",
  FADE_SIDE = "fade-slide",
  FADE = "fade",
  FADE_BOTTOM = "fade-bottom",
  FADE_SCALE = "fade-scale",
}
export const frontEndEnums = {
  currencyEnum: [
    {
      value: 0,
      name: "人民币",
    },
    {
      value: 1,
      name: "美元",
    },
    {
      value: 2,
      name: "港元",
    },
    {
      value: 3,
      name: "日元",
    },
    {
      value: 4,
      name: "欧元",
    },
    {
      value: 5,
      name: "英镑",
    },
  ],
  classifyNameEnum: [
    {
      value: 1,
      name: "纺织产品",
    },
    {
      value: 2,
      name: "塑料制品",
    },
  ],
  frontInTypeEnum: [
    {
      value: 0,
      name: "生产入库",
    },
    {
      value: 2,
      name: "返工入库",
    },
  ],
  invoiceEnum: [
    {
      value: 0,
      name: "未开票",
    },
    {
      value: 1,
      name: "已开票",
    },
  ],
  receivedEnum: [
    {
      value: 0,
      name: "未收款",
    },
    {
      value: 1,
      name: "已收款",
    },
  ],
  subcontractProcessEnum: [
    {
      value: 0,
      name: "未完成",
    },
    {
      value: 1,
      name: "已完成",
    },
  ],
  allocatedEnum: [
    {
      value: 0,
      name: "未发卡",
    },
    {
      value: 1,
      name: "已发卡",
    },
  ],
  categoryBizEnum: [
    {
      value: 8,
      name: "品名",
    },
    {
      value: 9,
      name: "纹路",
    },
    {
      value: 10,
      name: "功能",
    },
  ],
};
