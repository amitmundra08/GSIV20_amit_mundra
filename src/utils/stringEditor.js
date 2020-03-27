export const stringCutter = (string, numberOfCharacters) => {
  if (string.length <= numberOfCharacters) {
    return string;
  } else {
    return string.substring(0, numberOfCharacters) + '...';
  }
};
