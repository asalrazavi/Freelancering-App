export default function daysCounter(date) {
  // Get current date
  const currentDate = new Date();

  // Define target date
  const targetDate = new Date(date);

  // Calculate days remaining
  const daysRemaining = daysBetween(currentDate, targetDate);

  if (daysRemaining <= 0) {
    return ` ${daysRemaining * -1} روز`;
  } else {
    return ` ${daysRemaining} روز `;
  }
}

function daysBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000; // milliseconds per day
  return Math.round((date2 - date1) / oneDay);
}
