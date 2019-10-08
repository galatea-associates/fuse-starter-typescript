module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  verbose: true,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup/setupEnzyme.ts'],
  testPathIgnorePatterns: ['<rootDir>/src/__tests__/', '/node_modules/'],
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/src/__tests__/setup/css.ts'
  }
}