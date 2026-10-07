import {httpClient} from '@/infrastructure/http';
import {socketService} from '@/infrastructure/socket/socket.service';
import {ReduxProvider} from '@/infrastructure/redux/reduxProvider';
import {QueryProvider} from '@/infrastructure/tanstackQuery/queryProvider';
import {getQueryClient} from '@/infrastructure/tanstackQuery/queryClient';
import {persistStorage} from '@/infrastructure/redux/mmkvStorage';
import {ThemeWrapper} from '@/infrastructure/wrapper';

export {httpClient, ReduxProvider, QueryProvider, getQueryClient, socketService, persistStorage, ThemeWrapper};
export * from '@/infrastructure/http';
export * from '@/infrastructure/redux/hooks';
