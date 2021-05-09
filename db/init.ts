import Dexie from 'dexie';

export const db = new Dexie('TournamentMan');

export const initDb = ()=>{

	// Declare tables, IDs and indexes
	db.version(1).stores({
		players : "id++,startRank,sex,title,name,fideRating,fideFederation,fideNumber,birthDate,points,rank",
        tournaments: "id++,name,numPlayers,numRatedPlayers",
        rounds : "id++,opponentId,color,result" 
	});
};