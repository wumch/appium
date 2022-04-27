function stubEnv() {
  let envBackup;
  beforeEach(function beforeEach() {
    envBackup = process.env;
    process.env = {...process.env};
  });
  afterEach(function afterEach() {
    process.env = envBackup;
  });
}

export {stubEnv};
