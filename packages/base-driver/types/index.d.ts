import { EventCommands } from '../lib/basedriver/commands/event';
import { FindCommands } from '../lib/basedriver/commands/find';
import { LogCommands } from '../lib/basedriver/commands/log';
import { SessionCommands } from '../lib/basedriver/commands/session';
import { SettingsCommands } from '../lib/basedriver/commands/settings';
import { TimeoutCommands } from '../lib/basedriver/commands/timeout';

declare module '../lib/basedriver/driver' {
  interface BaseDriver extends Commands {}
}
