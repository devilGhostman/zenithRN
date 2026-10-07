import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import appConfig from '../../../app.json';
import { Gradient } from '@/components';
import { wacQueries } from '@/hooks/wac/wac.hook';
import { useAppDispatch } from '@/infrastructure';
import { socketService } from '@/infrastructure';
import {setAppConfig} from '@/reducers';
import {AppConfigUtility} from '@/utils';

type ThemeWrapperProps = {
  children: React.ReactNode;
};

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  const dispatch = useAppDispatch();
  const { appId } = appConfig;
  const { data: wacData } = useQuery(wacQueries.getWac(appId));

  useEffect(() => {
    const record = AppConfigUtility.getWacRecord(wacData);
    if (!record) {
      return;
    }

    dispatch(setAppConfig(AppConfigUtility.configerAppConfig({})));

  }, [dispatch, wacData]);

  useEffect(() => {
    socketService.initializeSocket();
    return () => {
      socketService.disconnect();
    };
  }, []);

  return <Gradient>{children}</Gradient>;
}

export default ThemeWrapper;
