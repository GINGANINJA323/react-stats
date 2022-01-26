const os = require('os-utils');

const getStats = () => {
  const stats = {};

  stats.cpu_platform = os.platform();
  stats.core_count = os.cpuCount();
  stats.totalmem = os.totalmem();
  stats.freemem = os.freemem();
  stats.uptime = os.sysUptime();

  os.cpuUsage((usage) => stats.usage = usage);

  return stats;
}

module.exports = {
  getStats
}