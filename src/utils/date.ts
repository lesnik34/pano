export const getLocalISOString = (date: Date) => {
  const offset = date.getTimezoneOffset();
  const offsetAbs = Math.abs(offset);
  const isoString = new Date(date.getTime() - offset * 60 * 1000).toISOString();
  return `${isoString.slice(0, -1)}${offset > 0 ? '-' : '+'}${String(Math.floor(offsetAbs / 60)).padStart(2, '0')}:${String(offsetAbs % 60).padStart(2, '0')}`;
};

export const getISOLocalString = (date: Date) => {
  const tzo = -date.getTimezoneOffset();

  if (tzo === 0) {
    return date.toISOString();
  }

  const dif = tzo >= 0 ? '+' : '-';
  const pad = (num: number, digits: number = 2) => String(num).padStart(digits, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(
    date.getMinutes(),
  )}:${pad(date.getSeconds())}${dif}${pad(tzo / 60)}:${pad(tzo % 60)}.${pad(date.getMilliseconds(), 3)}`;
};
