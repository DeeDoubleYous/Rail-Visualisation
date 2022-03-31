const defaults = require('jest-config');
module.exports = {
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    verbose: true,
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
};
