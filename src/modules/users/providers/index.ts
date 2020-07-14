import { container } from 'tsyringe';

import IHashProvider from './models/iHashProvider';
import BCryptHashProvider from './implementations/BCryptHashprovider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
