import cypress from 'cypress';

const enum Parameters {
  command = 'command',
  headed = 'headed',
  browser = 'browser',
  grepTags = 'grepTags',
  htmlReport = 'report',
}

enum Commands {
  run = 'run',
  open = 'open',
}

const argv = require('yargs/yargs')(process.argv.slice(2))
  .option(Parameters.command, {
    type: 'string',
    choices: Object.values(Commands),
    default: Commands.open,
  })
  .option(Parameters.grepTags, {
    type: 'string',
    default: false,
  })
  .option(Parameters.headed, {
    alias: ['h'],
    type: 'boolean',
    default: false,
  })
  .option(Parameters.htmlReport, {
    type: 'boolean',
    default: false,
  })
  .option(Parameters.browser, {
    alias: ['b'],
    type: 'string',
    default: 'chrome',
  })
  .help().argv;

const HEADED = argv[Parameters.headed];
const BROWSER = argv[Parameters.browser];
const COMMAND = argv[Parameters.command] ?? Commands.open;
const GREP = argv[Parameters.grepTags];
const CONFIG_PATH = 'cypress/config/configFiles/mobile.json';

export interface CypressConfiguration {
  browser?: string;
  headless?: boolean;
  spec?: string;
  config: {
    baseUrl?: string;
    video?: boolean;
    userAgent?: string;
    viewportHeight?: number;
    viewportWidth?: number;
    integrationFolder?: string;
    projectId?: string;
  };
  env: {
    grepTags: string | undefined;
  };
  record: boolean;
  parallel: boolean;
  tag?: string;
  key?: string;
  configFile: string | false;
  group?: string;
}


export const cypressConfig: CypressConfiguration = {
  browser: BROWSER,
  headless: !HEADED,
  config: {
    video: false,
  },
  env: {
    grepTags: GREP
  },
  record: false,
  parallel: false,
  configFile: CONFIG_PATH,
}

const runCypress = () => {
  if (COMMAND === Commands.run) {
    return cypress.run(cypressConfig);
  }
  return cypress.open(cypressConfig);
};

runCypress()
  .then(results => {
    if (results.totalFailed > 0 || results.failures > 0) {
      // Make sure to exit with an error code if tests failed
      process.exit(1);
    }
  })
  .catch(err => {
    console.error(err.stack || err);
    process.exit(1);
  });
