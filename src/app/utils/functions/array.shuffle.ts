export function shuffle<T>(array: T[]): T[] {
  if(!array || !array.length) {
    return array;
  }

  let retArray = [...array];
  let currentIndex = retArray.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [retArray[currentIndex], retArray[randomIndex]] = [
      retArray[randomIndex], retArray[currentIndex]];
  }

  return retArray;
};
