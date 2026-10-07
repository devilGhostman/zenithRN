import type { HttpClient, ApiEnvelope } from '@/infrastructure/http';
import { httpClient } from '@/infrastructure/http';

export type KeycloakAuthUrl = {
  url?: string;
  [key: string]: unknown;
};

export function createWacService(http: HttpClient) {
  return {
    async fetchWacConfig(appId: string) {
      const response = await http.get<ApiEnvelope<unknown>>(`wac-config/${appId}`);
      return response.data;
    },

    async fetchAllMultiIframes(appId: string) {
      const response = await http.get<ApiEnvelope<unknown>>(`wac-config/${appId}/multi-iframes`);
      return response.data;
    },

    async fetchKeycloakAuthUrl() {
      const response = await http.get<ApiEnvelope<KeycloakAuthUrl>>(`wac-config/sso/keycloak/auth-url`);
      return response.data;
    },

    async setOnlyAppHash(appId: string, appHash: string) {
      const response = await http.put<ApiEnvelope<unknown>>(`wac-config/${appId}/set-app-hash`, { appHash });
      return response.data;
    },
  };
}

const wacService = createWacService(httpClient);

export default wacService;
