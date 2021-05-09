import {db} from '../../../db'

export const getTournaments = ()=>{
    return db.table("players").toArray()
}