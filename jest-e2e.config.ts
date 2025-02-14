import jestConfig from './jest.config';

export default {
  ...jestConfig,
  testEnvironment: './prisma/prisma-test-environment.ts', //usando um banco específico para teste
  testRegex: '.e2e-spec.ts$', //informa quais arqivos deve-se procurar
};