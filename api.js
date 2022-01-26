const osu = require('node-os-utils');
const cpu = osu.cpu;
const ram = osu.mem;
const os = osu.os;

const getStats = async() => {
  const stats = {};

  stats.cpu_platform = cpu.model();
  stats.core_count = cpu.count();
  stats.freemem = await ram.free();
  stats.uptime = os.uptime();
  stats.usage = await cpu.usage();

  return stats;
}

module.exports = {
  getStats
}