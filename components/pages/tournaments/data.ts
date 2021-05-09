import {db} from '../../../db'

export const getTournaments = ()=>{
    return db.table("tournaments").toArray()
}