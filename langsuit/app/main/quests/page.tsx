import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getUserProgress, getUserSubscription } from '@/db/queries'; 
import UserProgress from '@/components/UserProgress'; 

const quests = [
    {
        title : "Earn 20XP" ,
        value :20 ,
        
    },
    {
        title : "Earn 50XP" ,
        value :50 ,
        
    },
    {
        title : "Earn 100XP" ,
        value :100 ,
        
    },
    {
        title : "Earn 500XP" ,
        value :500 ,
        
    },
    {
        title : "Earn 1000XP" ,
        value :1000 ,
        
    },
]
const QuestsPage = async () => {
    // Fetching our user's data
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    

    const {
        userProgress,
        userSubscription,
        
    } = await Promise.all([
        userProgressData, userSubscriptionData, 
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect('/courses');
        return null; 
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <UserProgress
                activeCourse={userProgress.activeCourse}
                hearts={userProgress.hearts}
                points={userProgress.points}
                hasActiveSubscription={isPro}
            />
            <div className="w-full flex flex-col items-center">
                <Image
                    src="/quests.svg"
                    alt="Quests"
                    height={90}
                    width={90}
                />
                <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                    Quests
                </h1>
                <p className="text-muted-foreground text-center text-lg mb-6">
                    Complete quests by earning points .
                </p>
                <ul className = "w-full">
                    {quests.map((quest)=> {
                        const progress=(userProgress.points /quest.value)*100;
                    
                        return (
                            <div
                            className ="flex items-center w-full p-4 gap-x-4 border-t-2"
                            key={quest.title}
                            >
                                <Image 
                                src="/points.svg"
                                alt="Points"
                                width={60}
                                height={60}


                                />
                                  
                            </div>
                        )

                    
                    })}

                    
                </ul>
               </div>
        </div>
    );
};

export default QuestsPage;
