import Dexie from 'dexie';

export const db = new Dexie('TournamentMan');

export const initDb = ()=>{

	db.version(3).stores({
		players : "id++,sex,title,name,fideRating,fideFederation,fideNumber,birthDate",
		playerInTour : "id++,startRank,points,rank,playerId,tourId",
        tournaments: "id++,name,numPlayers,numRatedPlayers",
        rounds : "id++,playerId,opponentId,color,result,tourId"
	});
};