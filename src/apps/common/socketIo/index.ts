/**
 * remove this line when use
 */
import {ApiConstants} from "@networking";

export {};
/* eslint-disable @typescript-eslint/no-explicit-any */
import {createContext, useCallback, useContext, useState} from 'react';
import {io, Socket} from 'socket.io-client';
import { ENVConfig } from '@config/env';


export const useSocket = () => {
  // state
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  // function
  const socketDisconnect = useCallback(() => {
    if (socket) {
      socket.offAny();
      socket.disconnect();
      setSocket(undefined);

      console.log('DISCONECT SOCKET!!!!')
    }
  }, [socket]);

  const socketInit = useCallback(() => {

    console.log('IzNIT SOCKET!!!!')
    console.log(ApiConstants.WEBSOCKET)
    console.log(ApiConstants.TOKEN_SOCKET)

    const client = io(ApiConstants.WEBSOCKET, {
      transports: ['polling'],
      // path: '/',
      reconnection: true,
      reconnectionDelay: 500,
      reconnectionAttempts: 9999999,
      forceNew: true,
      query: "token=eyJhbGciOiJIUzI1NiJ9.ew0KICAic3ViIjogInNvY2tldF9hZG1pbl8xMjM0NSIsDQogICJuYW1lIjogIlRva2VuIEF1dGgiLA0KICAiaWF0IjogMDEyMzQ1Njc4OQ0KfQ.4eG9un0qsyTrillAnz4G9BeCS3GQtI6KuzKL_jG7z3c",// +  ENVConfig.TOKEN_SOCKET ,
    });

        client.on('connect', () => {
          console.log('Connected', client.id);
        });

      client.on("error", (error) => {
          console.log('error', error);
      });

      client.on("ping", () => {
          console.log('ping');
      });


    setSocket(client);

  }, []);

  const socketOff = useCallback(
    (event?: string, listener?: any) => {
      if (socket) {
        socket.off(event, listener);
      }
    },
    [socket],
  );

  const socketListen = useCallback(
    (event: string, listener: (...args: any[]) => void) => {

        if (socket) {

            console.log('LISTER SOCKET. Event : ', event);

            socket.on(event, listener);
      }
    },
    [socket],
  );

    const socketEmit = useCallback(
        (event: string, listener: (...args: any[]) => void) => {
            if (socket) {
                socket.emit(event, listener);
            }
        },
        [socket],
    );

  // result
  return {socket, socketInit, socketOff, socketListen,socketEmit, socketDisconnect};

};

type SocketContext = {
  socket: Socket | undefined;
  socketOff: (event?: string, listener?: any) => void;
  socketEmit: (event?: string, listener?: any) => void;
  socketListen: (event: string, listener: (...args: any[]) => void) => void;
  socketInit: () => void;
  socketDisconnect: () => void;
};

export const SocketIoContext = createContext<SocketContext>(
  {} as SocketContext,
);
export const SocketProvider = SocketIoContext.Provider;
export const useSocketContext = () => useContext(SocketIoContext);
