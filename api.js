const os = require('os-utils');

const getStats = () => {
  const stats = {};

  stats.cpu_platform = os.platform();
  stats.core_count = os.cpuCount();

  return stats;
}

module.exports = {
  getStats
}