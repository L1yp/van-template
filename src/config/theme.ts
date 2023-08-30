export interface ThemeConfig {
  asideWidth: number; // 左侧菜单栏的宽度
  headerHeight: number; // header 高度
  footerHeight: number; // 底部高度
  mainPadding: number; // main的padding像素
  footerPadding: number;
  tagBarHeight: number;
}


const config: ThemeConfig = {
  asideWidth: 200,
  headerHeight: 60,
  footerHeight: 0,
  mainPadding: 20,
  footerPadding: 0,
  tagBarHeight: 30,
};

export default config;
