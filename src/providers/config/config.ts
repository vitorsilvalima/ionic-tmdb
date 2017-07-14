
import { InjectionToken } from '@angular/core';

export interface AppConfig {
  apiEndpoint: string;
  apiKey: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint: 'https://api.themoviedb.org/3',
  apiKey: '60ff436f2769f4f8ddf76ac0cc28a39d'
};
