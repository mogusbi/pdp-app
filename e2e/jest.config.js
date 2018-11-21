module.exports = {
  moduleFileExtensions: [
    'ts',
    'js',
    'json',
    'node'
  ],
  testMatch: [
    '**/+(*.)+(e2e-spec|e2e-test).+(ts|js)?(x)'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }
};
