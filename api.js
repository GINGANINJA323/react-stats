const fs = require('fs');
const si = require('systeminformation');
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

  await si.cpuTemperature()
    .then((data) => {
      stats.temps = {
        status: true,
        tempAvg: data.main,
        tempCores: data.cores
      }
    })
    .catch(() => {
      stats.temps = {
        status: false,
        tempAvg: 0,
        tempCores: [0]
      }
    });

  return stats;
}

const appendStats = async() => {
  try {
    const newStats = await getStats();

    const serverTime = new Date();

    const recordStats = {
      timestamp: serverTime.getTime(),
      usage: newStats.usage || 0,
      ramUsage: newStats.freemem.totalMemMb - newStats.freemem.freeMemMb || 0,
      diskUsage: newStats.freedisk.usedGb || 0
    }

    if (!fs.existsSync('./stats.json')) { // If no stats file, make one.
      const firstStats = JSON.stringify([recordStats]);
      fs.writeFileSync('./stats.json', firstStats);
      return;
    }

    const retrievedStats = fs.readFileSync('./stats.json', { encoding: 'utf-8' });
    const statsJson = JSON.parse(retrievedStats);

    const appendedStats = JSON.stringify([...statsJson, recordStats]);

    fs.writeFileSync('./stats.json', appendedStats);
  } catch (err) {
    console.log(err);
  }

  setTimeout(appendStats, 60 * 60000);
}

const getHistoricStats = async() => {
  try {
    if (!fs.existsSync('./stats.json')) {
      throw new Error('Stats file is not available');
    }

    const stats = fs.readFileSync('./stats.json');
    let statsJson = JSON.parse(stats);

    if (statsJson && statsJson.length > 168) {
      statsJson = statsJson.slice(statsJson.length - 168); // Get only 168 latest entries, one week's worth.
    }

    return statsJson;
  } catch (err) {
    console.log(err);
    return {};
  }
}

appendStats();

module.exports = {
  getStats,
  getHistoricStats
}