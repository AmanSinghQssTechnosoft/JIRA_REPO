export const useCaptilize=(word:string,allWords?:boolean)=>{
  if(!word) return"";

  if (allWords) {
    return word
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}