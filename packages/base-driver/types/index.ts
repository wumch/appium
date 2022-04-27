import {BaseDriverBase} from '../lib/basedriver/driver';
import {ExternalDriver} from '@appium/types';

export type DriverClass = BaseDriverBase<ExternalDriver, ExternalDriverStatic>;

/**
 * Additional static props for external driver classes
 */
export interface ExternalDriverStatic {
  driverName: string;
}
