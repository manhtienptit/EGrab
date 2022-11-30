import React, {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';

import { randomUniqueId } from '@common';

import { DURATION_HIDE } from './constants';
import { SnackItem } from './snack-bar-item';
import { styles } from './styles';
import { Item, TypeMessage } from './type';

const NotificationComponent = forwardRef((_, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      show: ({
        interval = DURATION_HIDE,
        msg,
        type = 'success',
                 orderCode,
                 customer_worker_site_id
      }: {
        msg: string;
        interval: number;
        type: TypeMessage;
        orderCode: string;
        customer_worker_site_id: string;
      }) => {
        setQueueData(d =>
          d.concat([
            {
              id: randomUniqueId(),
              msg,
              type,
              orderCode,
              customer_worker_site_id,
              interval,
            },
          ]),
        );
      },
    }),
    [],
  );

  // state
  const [queueData, setQueueData] = useState<Array<Item>>([]);
  const [data, setData] = useState<Item[]>([]);

  // function
  const onPop = useCallback(
    (item: Item) => {
      const newData = queueData.length <= 0 ? [] : [queueData[0]];
      setQueueData(d => d.filter(x => x.id !== item.id));
      setData(newData);
    },
    [queueData],
  );

  const _renderItem = (item: Item) => (
    <SnackItem key={item.id} {...{ item, onPop }} />
  );

  // effect
  useEffect(() => {
    if (queueData.length > 0) {
      setData([queueData[0]]);
    }
  }, [queueData]);

  // render
  return (
    <View
      pointerEvents={'box-none'}
      style={[StyleSheet.absoluteFillObject, styles.container]}>
      {data.map(_renderItem)}
    </View>
  );
});
type SnackBarNoti = {
  show: (
      data: {
        msg: string;
        interval?: number;
        type?: TypeMessage
          orderCode?: string
          customer_worker_site_id?: string
      }) => void;
};
export const snackBarNotifyRef = createRef<SnackBarNoti>();
export const Notification = () => <NotificationComponent ref={snackBarNotifyRef} />;

export const showNotification = ({
  msg,
  interval,
  type,
  orderCode,
  customer_worker_site_id,
}: {
  msg: string;
  interval?: number;
  type?: TypeMessage;
    orderCode?: string;
    customer_worker_site_id?: string;
}) => {
    snackBarNotifyRef.current?.h
  snackBarNotifyRef.current?.show({ msg, interval, type , orderCode, customer_worker_site_id });
};
