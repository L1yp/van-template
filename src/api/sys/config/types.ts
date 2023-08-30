/**
 * ConfigEnumOutputDTO，枚举信息
 */
export interface ConfigEnumOutputDTO {
  attribute: TagAttribute;
  /**
   * 枚举描述
   */
  description: string;
  /**
   * 枚举值
   */
  value: number;
}

/**
 * TagAttribute，标签属性列表
 */
export interface TagAttribute {
  /**
   * 是否禁用渐变动画
   */
  disableTransitions?: boolean;
  /**
   * 是否圆形标签
   */
  effect?: Effect;
  /**
   * 是否有边框描边
   */
  hit?: boolean;
  /**
   * 是否圆形标签
   */
  round?: boolean;
  /**
   * 标签类型
   */
  type?: Type;
}

/**
 * 是否圆形标签
 */
export type Effect = "dark" | "light" | "plain";

/**
 * 标签类型
 */
export type Type = "success" | "info" | "warning" | "danger";
