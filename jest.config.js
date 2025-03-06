module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"], // Procura por arquivos .test.ts na pasta __tests__
  moduleFileExtensions: ["ts", "js", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  collectCoverage: true, // Gera relatório de cobertura de testes
  coverageDirectory: "coverage", // Pasta onde o relatório será salvo
};