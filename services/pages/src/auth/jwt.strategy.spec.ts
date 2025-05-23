import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  const mockConfigService = {
    get: jest.fn().mockReturnValue('test-secret'),
  };

  beforeEach(() => {
    strategy = new JwtStrategy(mockConfigService as any);
  });

  it('Должен выполнять стратегию и возвращать данные в требуемом виде', () => {
    const payload = {
      sub: 'user-id',
      login: 'testuser',
      role: 'admin',
    };

    const result = strategy.validate(payload);
    expect(result).toEqual({
      userId: 'user-id',
      login: 'testuser',
      role: 'admin',
    });
  });
});
