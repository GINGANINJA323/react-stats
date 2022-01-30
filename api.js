const osu = require('node-os-utils');
const cpu = osu.cpu;
const ram = osu.mem;
const os = osu.os;
const disk = osu.drive;

const getStats = async() => {
  const stats = {};

  stats.cpu_platform = cpu.model();
  stats.core_count = cpu.count();
  stats.uptime = os.uptime();

  // const promises = [disk.info(), cpu.usage(), ram.free()];

  await cpu.usage()
    .then((usage) => stats.usage = usage)
    .catch(() => stats.usage = 'Error fetching CPU data.');

  await ram.free()
    .then((data) => stats.freemem = {
      ...data,
      status: true
    })
    .catch(() => stats.freemem = {
      status: false,
      totalMemMb: 0,
      freeMemMb: 0
    });

  await disk.info()
    .then((info) => stats.freedisk = {
      ...info,
      status: true
    })
    .catch(() => stats.freedisk = {
      status: false,
      totalGb: 0,
      freeGb: 0,
      usedGb: 0,
      usedPercentage: 0,
      freePercentage: 0
    });

  return stats;
}

module.exports = {
  getStats
}