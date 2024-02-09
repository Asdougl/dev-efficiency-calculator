export const effectiveDevelopers = (count: number, log?: number[]): number => {
  if (count <= 1) {
    if (log) {
      log.push(1);
    }
    return 1;
  } else {
    const otherDevs = effectiveDevelopers(count - 1, log);
    const newDev = 1 - 0.1 * otherDevs;
    if (log) {
      log.push(newDev + otherDevs);
    }
    return otherDevs + newDev;
  }
};
