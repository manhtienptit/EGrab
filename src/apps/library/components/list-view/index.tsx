import React from 'react';
import { FlatList, RefreshControl } from 'react-native';

import {execFunc, sizeScale} from '@common';

import { ListViewProps } from './type';
import {Divider, Spacer} from "@components";

export const ListView = (props: ListViewProps) => {
  // state
  const {
    onRefresh,
    onLoadMore,
    itemEmptyComponent,
    canRefresh = true,
    canLoadMore = false,
    refreshing = false,
  } = props;

  // function
  const loadMore = () => {
    if (canLoadMore) {
      execFunc(onLoadMore);
    }
  };

  // render
  return (
    <FlatList
      refreshControl={
        canRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
      onEndReached={loadMore}
      ListEmptyComponent={itemEmptyComponent}
      ItemSeparatorComponent={<Spacer height={sizeScale(20)}/>}
      onEndReachedThreshold={0.001}
      {...props}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
};
