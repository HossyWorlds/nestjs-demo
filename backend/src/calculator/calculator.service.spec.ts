import { Test, TestingModule } from '@nestjs/testing';
import { CalculatorService } from './calculator.service';
import { calculatorTestData } from './calculator.mocks';
import { describe, it, expect, beforeEach, test } from 'vitest';

describe('CalculatorService', () => {
  let calculatorService: CalculatorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatorService],
    }).compile();

    calculatorService = module.get<CalculatorService>('CalculatorService');
  });

  describe('add', () => {
    test.each(calculatorTestData.addition)(
      'should correctly add $a + $b = $expected',
      ({ a, b, expected }) => {
        const result = calculatorService.add(a, b);
        if (a === 0.1 && b === 0.2) {
          expect(result).toBeCloseTo(expected);
        } else {
          expect(result).toBe(expected);
        }
      },
    );

    // 異常系テストの例1: 無効な入力値
    it('should throw error when adding NaN values', () => {
      expect(() => calculatorService.add(NaN, 5)).toThrow('Invalid input');
    });

    // 異常系テストの例2: 型チェック
    it('should throw error when input is not a number', () => {
      expect(() => calculatorService.add('5' as unknown as number, 10)).toThrow(
        'Input must be a number',
      );
    });

    // 異常系テストの例3: 範囲チェック
    it('should throw error when result exceeds maximum safe integer', () => {
      expect(() => calculatorService.add(Number.MAX_SAFE_INTEGER, 1)).toThrow(
        'Result exceeds safe range',
      );
    });
  });

  describe('subtract', () => {
    test.each(calculatorTestData.subtraction)(
      'should correctly subtract $a - $b = $expected',
      ({ a, b, expected }) => {
        expect(calculatorService.subtract(a, b)).toBe(expected);
      },
    );
  });

  describe('multiply', () => {
    test.each(calculatorTestData.multiplication)(
      'should correctly multiply $a × $b = $expected',
      ({ a, b, expected }) => {
        expect(calculatorService.multiply(a, b)).toBe(expected);
      },
    );

    it('should return zero when multiplying by zero', () => {
      expect(calculatorService.multiply(0, 50)).toBe(0);
    });
  });

  describe('divide', () => {
    test.each(calculatorTestData.division)(
      'should correctly divide $a ÷ $b = $expected',
      ({ a, b, expected }) => {
        const result = calculatorService.divide(a, b);
        if (a === 0.1 && b === 0.01) {
          expect(result).toBeCloseTo(expected);
        } else {
          expect(result).toBe(expected);
        }
      },
    );

    test.each(calculatorTestData.divisionErrors)(
      'should throw error when dividing $a by $b',
      ({ a, b, expectedError }) => {
        expect(() => calculatorService.divide(a, b)).toThrow(expectedError);
      },
    );

    // 異常系テストパターン4: toThrowErrorで詳細チェック
    it('should throw specific error type', () => {
      expect(() => calculatorService.divide(10, 0)).toThrowError(Error);
      expect(() => calculatorService.divide(10, 0)).toThrowError(
        /Division by zero/,
      );
    });

    // 異常系テストパターン5: 複数条件の異常系
    test.each([
      { a: Infinity, b: 2, error: 'Cannot divide infinity' },
      { a: 10, b: Infinity, error: 'Cannot divide by infinity' },
      { a: -Infinity, b: -Infinity, error: 'Invalid operation' },
    ])('should throw "$error" when dividing $a by $b', ({ a, b, error }) => {
      expect(() => calculatorService.divide(a, b)).toThrow(error);
    });
  });

  // 異常系テストパターン6: 非同期処理の異常系
  describe('異常系テストのパターン', () => {
    // rejectsマッチャーの使用例（非同期関数の場合）
    it('should reject with error for async operation', async () => {
      // 仮に非同期メソッドがある場合
      // await expect(calculatorService.divideAsync(10, 0)).rejects.toThrow('Division by zero');
    });

    // toThrowのバリエーション
    it('demonstrates various throw matchers', () => {
      const throwingFn = () => {
        throw new TypeError('Type mismatch');
      };

      expect(throwingFn).toThrow();
      expect(throwingFn).toThrow(TypeError);
      expect(throwingFn).toThrow('Type mismatch');
      expect(throwingFn).toThrow(/mismatch/);
    });

    // カスタムエラーのテスト
    it('should handle custom errors', () => {
      class CalculatorError extends Error {
        constructor(
          message: string,
          public code: string,
        ) {
          super(message);
          this.name = 'CalculatorError';
        }
      }

      const throwCustomError = () => {
        throw new CalculatorError('Calculation failed', 'CALC_ERR_001');
      };

      expect(throwCustomError).toThrow(CalculatorError);

      // エラーの詳細をチェック
      try {
        throwCustomError();
      } catch (error) {
        expect(error).toBeInstanceOf(CalculatorError);
        expect((error as CalculatorError).code).toBe('CALC_ERR_001');
      }
    });
  });
});
