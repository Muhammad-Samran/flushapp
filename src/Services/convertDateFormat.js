export default function convertDateFormat(req) {
  const newDate = new Date(req).toDateString();
  const [day, month, date, year] = newDate.split(" ");
  return { day, month, date, year };
}
