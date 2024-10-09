import { Provider } from '@nestjs/common';

export const storageProvider: Provider = {
  provide: 'STORAGE',
  useValue: new Map(),
};
