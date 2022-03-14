import { EventCommands } from './event';
import { FindCommands } from './find';
import { LogCommands } from './log';
import { SessionCommands } from './session';
import { SettingsCommands } from './settings';
import { TimeoutCommands } from './timeout';

/**
 * @template T,M
 * @param {import('type-fest').Class<T>} Base
 * @param {import('type-fest').Class<M>} Mixin
 */
function applyMixin (Base, Mixin) {
  for (const name of Object.getOwnPropertyNames(Mixin.prototype)) {
    Object.defineProperty(
      Base.prototype,
      name,
      Object.getOwnPropertyDescriptor(Mixin.prototype, name) ??
        Object.create(null),
    );
  }
}

/**
 * @template T
 * @param {import('type-fest').Class<T>} Base
 */
export function applyCommandMixins (Base) {
  for (const Mixin of [
    EventCommands,
    FindCommands,
    LogCommands,
    SessionCommands,
    SettingsCommands,
    TimeoutCommands,
  ]) {
    applyMixin(Base, Mixin);
  }
}
