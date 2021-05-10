import {db} from '../../../db'

export const getPlayers = ()=>{
    return db.table("players").toArray()
}