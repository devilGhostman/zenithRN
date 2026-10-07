import {io, type Socket} from 'socket.io-client';
import {AppConfigUtility} from '@/utils/appConfig.utility';

let socketInstance: Socket | null = null;

type SocketEventCallback = (...args: unknown[]) => void;

function initialize(): Socket | undefined {
  try {
    const socket = io(AppConfigUtility.getBaseUrl(), {
      path: '/msockets/',
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });

    socket.on('connect', () => {
      socketInstance = socket;
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      socketInstance = null;
    });

    socket.on('error', (error) => {
      console.log('Socket error:', error);
      socketInstance = null;
    });

    return socket;
  } catch {
    console.log('Socket not initialized');
    return undefined;
  }
}

export const socketService = {
  initializeSocket(): Socket | undefined {
    try {
      if (socketInstance?.connected) {
        console.log('Socket already initialized', socketInstance);
        return socketInstance;
      }

      return initialize();
    } catch {
      console.log('Socket not initialized');
      return undefined;
    }
  },

  emit(event: string, data?: unknown) {
    if (socketInstance) {
      socketInstance.emit(event, data);
      return;
    }

    console.log('Socket not initialized on emit');
    initialize()?.emit(event, data);
  },

  on(event: string, callback: SocketEventCallback) {
    if (socketInstance) {
      socketInstance.on(event, callback);
      return;
    }

    console.log('Socket not initialized on on');
    initialize()?.on(event, callback);
  },

  disconnect() {
    socketInstance?.disconnect();
  },

  isConnected() {
    return socketInstance?.connected ?? false;
  },
};
