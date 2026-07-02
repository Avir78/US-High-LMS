import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

export const generateId = (): string => uuidv4();

export const hashPassword = async (password: string, rounds: number = 10): Promise<string> => {
  return bcrypt.hash(password, rounds);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const getCurrentTimestamp = (): Date => new Date();

export const formatCurrency = (amount: number, currency: string = 'XAF'): string => {
  const formatter = new Intl.NumberFormat('fr-CM', {
    style: 'currency',
    currency,
  });
  return formatter.format(amount);
};

export const calculateGPA = (grades: number[]): number => {
  if (grades.length === 0) return 0;
  const sum = grades.reduce((a, b) => a + b, 0);
  return +(sum / grades.length).toFixed(2);
};

export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return +(((completed / total) * 100).toFixed(2));
};

export const getLetterGrade = (percentage: number): string => {
  if (percentage >= 90) return 'A';
  if (percentage >= 80) return 'B';
  if (percentage >= 70) return 'C';
  if (percentage >= 60) return 'D';
  return 'F';
};

export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const truncateString = (str: string, length: number): string => {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};
