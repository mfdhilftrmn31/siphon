export interface FuzzerResult {
  id: string;
  payload: string;
  status: number;
  length: number;
  timeMs: number;
  isAnomaly: boolean;
  error?: string;
}
