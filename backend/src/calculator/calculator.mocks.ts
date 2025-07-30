export const calculatorTestData = {
  addition: [
    { a: 2, b: 3, expected: 5 },
    { a: -5, b: -3, expected: -8 },
    { a: 10, b: -7, expected: 3 },
    { a: 0, b: 0, expected: 0 },
    { a: 0.1, b: 0.2, expected: 0.3 },
  ],
  subtraction: [
    { a: 10, b: 4, expected: 6 },
    { a: -5, b: -3, expected: -2 },
    { a: 3, b: 5, expected: -2 },
    { a: 7, b: 7, expected: 0 },
    { a: 1.5, b: 0.5, expected: 1 },
  ],
  multiplication: [
    { a: 3, b: 4, expected: 12 },
    { a: -3, b: -4, expected: 12 },
    { a: 5, b: -2, expected: -10 },
    { a: 100, b: 0, expected: 0 },
    { a: 0.5, b: 0.5, expected: 0.25 },
  ],
  division: [
    { a: 10, b: 2, expected: 5 },
    { a: -10, b: -2, expected: 5 },
    { a: 10, b: -2, expected: -5 },
    { a: 0, b: 5, expected: 0 },
    { a: 1, b: 4, expected: 0.25 },
    { a: 0.1, b: 0.01, expected: 10 },
  ],
  divisionErrors: [
    { a: 10, b: 0, expectedError: 'Division by zero is not allowed' },
    { a: -5, b: 0, expectedError: 'Division by zero is not allowed' },
  ],
};

import { vi } from 'vitest';

export const mockCalculatorService = {
  add: vi.fn((a: number, b: number) => a + b),
  subtract: vi.fn((a: number, b: number) => a - b),
  multiply: vi.fn((a: number, b: number) => a * b),
  divide: vi.fn((a: number, b: number) => {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  }),
};

export const createMockCalculatorResult = (
  operation: string,
  result: number,
) => ({
  operation,
  result,
  timestamp: new Date().toISOString(),
});

export const mockCalculationHistory = [
  createMockCalculatorResult('add', 5),
  createMockCalculatorResult('subtract', 3),
  createMockCalculatorResult('multiply', 12),
  createMockCalculatorResult('divide', 2.5),
];
