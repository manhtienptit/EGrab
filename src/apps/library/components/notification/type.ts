export const TYPE_MESSAGE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARN: 'warn',
  LINK: 'link',
} as const;

export type TypeMessage = typeof TYPE_MESSAGE[keyof typeof TYPE_MESSAGE];

export type Item = {
  id: string;
  msg: string;
  type: TypeMessage;
  interval: number;
  orderCode: string;
    customer_worker_site_id: string;
};
export interface SnackBarItemProps {
  item: Item;
  onPop: (item: Item) => void;
  onPress: () => void;
}
export type DataShowMessage = {
  msg: string;
  type: TypeMessage;
  interval?: number;
};
