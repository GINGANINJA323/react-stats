export const formatDate = (unix_date: number): string => {
  const properDate = new Date(unix_date);

  return `${properDate.getDate()}/${properDate.getMonth() + 1}/${properDate.getFullYear()} ${properDate.getHours()}:${properDate.getMinutes() < 10 ? `0${properDate.getMinutes()}` : properDate.getMinutes()}`;
}