import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';

describe('Middleware RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    reflector = {
      getAllAndOverride: jest.fn(),
    } as any;
    guard = new RolesGuard(reflector);
  });

  const mockContext = (role?: string) =>
    ({
      switchToHttp: () => ({
        getRequest: () => ({
          user: role ? { role } : undefined,
        }),
      }),
      getHandler: jest.fn(),
      getClass: jest.fn(),
    }) as unknown as ExecutionContext;

  it('должен вернуть true, если роль не требуется (разрешить выполнение)', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(undefined);
    const result = guard.canActivate(mockContext());
    expect(result).toBe(true);
  });

  it('должен дать доступ если требуемая роль совпадает с переданной', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(['admin']);
    const result = guard.canActivate(mockContext('admin'));
    expect(result).toBe(true);
  });

  it('должен выбросить ForbiddenException если представленная роль не совпала с требуемой', () => {
    (reflector.getAllAndOverride as jest.Mock).mockReturnValue(['admin']);
    expect(() => guard.canActivate(mockContext('user'))).toThrow(
      ForbiddenException,
    );
  });
});
