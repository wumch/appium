/* eslint-disable require-await */
import _ from 'lodash';

// override in sub-classes, with appropriate logs
// in the form of
//   {
//     type: {
//       description: 'some useful text',
//       getter: () => {}, // some function that will be called to get the logs
//     }
//   }

export class LogCommands {
  /** @type {Record<string,LogType>} */
  supportedLogTypes = {};

  async getLogTypes () {
    this.log.debug('Retrieving supported log types');
    return _.keys(this.supportedLogTypes);
  }

  async getLog (logType) {
    this.log.debug(`Retrieving '${logType}' logs`);

    if (!(await this.getLogTypes()).includes(logType)) {
      const logsTypesWithDescriptions = _.reduce(
        this.supportedLogTypes,
        (acc, value, key) => {
          acc[key] = value.description;
          return acc;
        },
        {},
      );
      throw new Error(
        `Unsupported log type '${logType}'. ` +
          `Supported types: ${JSON.stringify(logsTypesWithDescriptions)}`,
      );
    }

    return await this.supportedLogTypes[logType].getter(this);
  }
}
