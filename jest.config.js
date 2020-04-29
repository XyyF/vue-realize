/**
 * jest.config.js 配置文件
 * 文档：https://jestjs.io/docs/zh-Hans/configuration
 */

module.exports = {
    setupFiles: ['<rootDir>/test/jest.init.js'],
    moduleFileExtensions: ['js', 'json'],
    'transform': {
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
        // '^.+\\.js$': '<rootDir>/test/jest.transform.js',
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
    },
    // jest应该搜索的文件列表 [String]
    roots: [
        '<rootDir>/test/',
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    testRegex: '.+?\\.test\\.js$',
    'verbose': true,
    'modulePaths': [
        '<rootDir>/node_modules',
    ],
    'globals': {
        'NODE_ENV': 'test',
    },
}