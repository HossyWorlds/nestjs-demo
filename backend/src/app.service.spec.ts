import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe('Hello World!');
    });

    it('should return a string', () => {
      const result = appService.getHello();
      expect(typeof result).toBe('string');
    });

    it('should not be empty', () => {
      const result = appService.getHello();
      expect(result.length).toBeGreaterThan(0);
    });
  });
}); 
