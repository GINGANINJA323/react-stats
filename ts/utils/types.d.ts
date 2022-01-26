export interface Stats {
  core_count?: number;
  cpu_platform?: string;
  freemem?: {
    totalMemMb: number;
    freeMemMb: number;
  };
  uptime?: number;
  usage?: number;
  uptime?: number;
}