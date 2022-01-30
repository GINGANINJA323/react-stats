export interface Stats {
  core_count: number;
  cpu_platform: string;
  freemem: {
    status: boolean;
    totalMemMb: number;
    freeMemMb: number;
  };
  uptime: number;
  usage: number | string;
  uptime: number;
  freedisk: {
    status: boolean;
    totalGb: number;
    freeGb: number;
    usedGb: number;
    usedPercentage: number;
    freePercentage: number;
  };
  temps: {
    status: boolean;
    tempAvg: number;
    tempCores: Array<number>;
  };
};

export interface HistoricStats {
  timestamp: number;
  usage: number;
  ramUsage: number;
  diskUsage?: number;
};