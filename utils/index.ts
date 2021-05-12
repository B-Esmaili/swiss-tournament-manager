const getSubStr = (str : string,start:number,end :number)=>(str.slice(start-1,end-1).trim())

const getNumberOrDefault = (str : string | null)=>(str ? parseInt(str) : 0)

export const importPlayerFromTRF = async (file: File) => {
  let content = await file.text();
  return content.split("\n").filter(l=>l.startsWith("001")).map(line=>{
      return {
        name : getSubStr(line,15,47),
        title : getSubStr(line,11,13),
        sex : getSubStr(line,10,10),
        fideRating : getNumberOrDefault(getSubStr(line,49,52)),
        fideFederation : getSubStr(line,54,56),
        fideNumber : getNumberOrDefault(getSubStr(line,58,68)),
        birthDate : getSubStr(line,70,79)
      }
  });
};
