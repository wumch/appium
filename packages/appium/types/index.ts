import {ExtensionType, DriverType, DriverClass, PluginType, PluginClass} from '@appium/types';
import {JSONSchemaType} from 'ajv';

export * from './appium-manifest';
export * from './extension-manifest';
export * from './cli';

/**
 * Known environment variables concerning Appium
 */
export interface AppiumEnv extends NodeJS.ProcessEnv {
  APPIUM_HOME?: string;
}

/**
 * Generic to get at the class of an extension.
 */
export type ExtClass<ExtType extends ExtensionType> = ExtType extends DriverType
  ? DriverClass
  : ExtType extends PluginType
  ? PluginClass
  : never;

export type JSONSchema<T = unknown> = JSONSchemaType<T> & {[key: number]: never};
