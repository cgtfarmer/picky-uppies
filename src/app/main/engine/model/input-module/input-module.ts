export interface InputModule {
  registerKey(key: string): void;

  unregisterKey(key: string): void;

  getXAxis(): number;

  getYAxis(): number;

  keyIsDown(key: string): boolean;

  getActiveKeys(): string[];
};
