export function generateUniqueString(baseString) {
  if (!baseString) {
    throw new Error('baseString must not be null or undefined');
  }

  const timestamp = new Date().getTime();
  if (isNaN(timestamp)) {
    throw new Error('Failed to get current timestamp');
  }

  return `${baseString}_${timestamp}`;
}