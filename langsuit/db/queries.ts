




export const getTopTenUsers = cache(async() => {

    const {userId} = await auth() ;
    if(!userId) {
        return [] ;
    }

    const data = await db.query.userProgress.findMany({
        orderBy : (userProgress , {desc}) => [desc(userProgress.points)],
        limit : 1 ,
        columns : {
            userId : true ,
            userName :true ,
            userImageSrc :true ,
            points : true ,
            
        }
    }) ;
    return data ;
});