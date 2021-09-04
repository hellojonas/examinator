export function pad(sec: string | number) {
  return sec.toString().length === 1 ? `0${sec}` : sec;
}
