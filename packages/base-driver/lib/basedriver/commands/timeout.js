/* eslint-disable no-unused-vars */
/* eslint-disable require-await */
import {waitForCondition} from 'asyncbox';
import _ from 'lodash';
import {util} from '@appium/support';
import {errors} from '../../protocol';

const MIN_TIMEOUT = 0;
export class TimeoutCommands {
  async timeouts (type, ms, script, pageLoad, implicit) {
    if (util.hasValue(type) && util.hasValue(ms)) {
      this.log.debug(
        `MJSONWP timeout arguments: ${JSON.stringify({type, ms})}}`,
      );

      switch (type) {
        case 'command':
          await this.newCommandTimeout(ms);
          return;
        case 'implicit':
          await this.implicitWaitMJSONWP(ms);
          return;
        case 'page load':
          await this.pageLoadTimeoutMJSONWP(ms);
          return;
        case 'script':
          await this.scriptTimeoutMJSONWP(ms);
          return;
        default:
          throw new Error(
            `'${type}' type is not supported for MJSONWP timeout`,
          );
      }
    }

    // Otherwise assume it is W3C protocol
    this.log.debug(
      `W3C timeout argument: ${JSON.stringify({script, pageLoad, implicit})}}`,
    );
    if (util.hasValue(script)) {
      await this.scriptTimeoutW3C(script);
    }
    if (util.hasValue(pageLoad)) {
      await this.pageLoadTimeoutW3C(pageLoad);
    }
    if (util.hasValue(implicit)) {
      await this.implicitWaitW3C(implicit);
    }
  }

  /** @type {number} */
  newCommandTimeoutMs;

  async getTimeouts () {
    // eslint-disable-line require-await
    return {
      command: this.newCommandTimeoutMs,
      implicit: this.implicitWaitMs,
    };
  }

  async implicitWaitW3C (ms) {
    await this.implicitWait(ms);
  }

  async implicitWaitMJSONWP (ms) {
    await this.implicitWait(ms);
  }

  async implicitWait (ms) {
    await this.setImplicitWait(this.parseTimeoutArgument(ms));
  }

  setImplicitWait (ms) {
    // eslint-disable-line require-await
    this.implicitWaitMs = ms;
    this.log.debug(`Set implicit wait to ${ms}ms`);
    if (this.managedDrivers && this.managedDrivers.length) {
      this.log.debug('Setting implicit wait on managed drivers');
      for (let driver of this.managedDrivers) {
        if (_.isFunction(driver.setImplicitWait)) {
          driver.setImplicitWait(ms);
        }
      }
    }
  }

  // pageLoad
  // eslint-disable-next-line no-unused-vars
  async pageLoadTimeoutW3C (ms) {
    // eslint-disable-line require-await
    throw new errors.NotImplementedError('Not implemented yet for pageLoad.');
  }

  // eslint-disable-next-line no-unused-vars
  async pageLoadTimeoutMJSONWP (ms) {
    // eslint-disable-line require-await
    throw new errors.NotImplementedError('Not implemented yet for pageLoad.');
  }

  // script
  async scriptTimeoutW3C (ms) {
    throw new errors.NotImplementedError('Not implemented yet for script.');
  }

  async scriptTimeoutMJSONWP (ms) {
    throw new errors.NotImplementedError('Not implemented yet for script.');
  }

  // command
  async newCommandTimeout (ms) {
    this.setNewCommandTimeout(this.parseTimeoutArgument(ms));
  }

  setNewCommandTimeout (ms) {
    this.newCommandTimeoutMs = ms;
    this.log.debug(`Set new command timeout to ${ms}ms`);
    if (this.managedDrivers && this.managedDrivers.length) {
      this.log.debug('Setting new command timeout on managed drivers');
      for (let driver of this.managedDrivers) {
        if (_.isFunction(driver.setNewCommandTimeout)) {
          driver.setNewCommandTimeout(ms);
        }
      }
    }
  }

  clearNewCommandTimeout () {
    if (this.noCommandTimer) {
      clearTimeout(this.noCommandTimer);
      this.noCommandTimer = null;
    }
  }

  startNewCommandTimeout () {
    // make sure there are no rogue timeouts
    this.clearNewCommandTimeout();

    // if command timeout is 0, it is disabled
    if (!this.newCommandTimeoutMs) return; // eslint-disable-line curly

    this.noCommandTimer = setTimeout(async () => {
      this.log.warn(
        `Shutting down because we waited ` +
          `${this.newCommandTimeoutMs / 1000.0} seconds for a command`,
      );
      const errorMessage =
        `New Command Timeout of ` +
        `${this.newCommandTimeoutMs / 1000.0} seconds ` +
        `expired. Try customizing the timeout using the ` +
        `'newCommandTimeout' desired capability`;
      await this.startUnexpectedShutdown(new Error(errorMessage));
    }, this.newCommandTimeoutMs);
  }

  async implicitWaitForCondition (condFn) {
    this.log.debug(`Waiting up to ${this.implicitWaitMs} ms for condition`);
    let wrappedCondFn = async (...args) => {
      // reset command timeout
      this.clearNewCommandTimeout();

      return await condFn(...args);
    };
    return await waitForCondition(wrappedCondFn, {
      waitMs: this.implicitWaitMs,
      intervalMs: 500,
      logger: this.log,
    });
  }

  parseTimeoutArgument (ms) {
    let duration = parseInt(ms, 10);
    if (_.isNaN(duration) || duration < MIN_TIMEOUT) {
      throw new errors.UnknownError(`Invalid timeout value '${ms}'`);
    }
    return duration;
  }
}
