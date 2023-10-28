export interface InputModule {
  registerKey(key: string): void;

  unregisterKey(key: string): void;

  getXAxis(): number;

  getYAxis(): number;

  getKeyDown(key: string): boolean;
};
