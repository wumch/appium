export class SettingsCommands {
  async updateSettings (newSettings) {
    if (!this.settings) {
      this.log.errorAndThrow('Cannot update settings; settings object not found');
    }
    return await this.settings.update(newSettings);
  }

  async getSettings () {
    if (!this.settings) {
      this.log.errorAndThrow('Cannot get settings; settings object not found');
    }
    return await this.settings.getSettings();
  }
}
