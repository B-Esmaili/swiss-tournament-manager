export interface Player{
    id: number,
    sex : "m" | "w",
    title :"GM" | "IM" | "WGM" | "FM" | "WIM" |  "CM" |  "WFM" | "WCM",
    name :string,
    fideRating : number,
    fideFederation : string,
    fideNumber : number,
    birthDate : string
}