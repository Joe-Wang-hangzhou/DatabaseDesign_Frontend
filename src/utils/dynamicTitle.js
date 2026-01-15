import defaultSettings from '@/settings'

/**
 * 动态修改标题
 */
export function useDynamicTitle() {
  // 直接使用固定标题，不动态更新
  document.title = defaultSettings.title;
}