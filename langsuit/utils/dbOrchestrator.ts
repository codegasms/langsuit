import db from "@/db/drizzle";
import { user,admin,instructor,naive } from "@/db/schema";


class dbOrchestrator {
    static #instance: dbOrchestrator;

    private constructor() {}

    public static get instance(): dbOrchestrator {
        if (!dbOrchestrator.#instance) {
            dbOrchestrator.#instance = new dbOrchestrator();
        }
        return dbOrchestrator.#instance;
    }
}


export class User{
    static #instance: User;
    
    private constructor() {}

    public static get instance(): User {
        if(!User.#instance) {
            User.#instance = new User;
        }
        return User.#instance;
    }

    public async insert(role:string,username:string,email:string,password:string) {
        switch (role) {
            case "admin":
                await db.insert(user).values({username,email,password,role});
                await db.insert(admin).values({username,email,password});
                break;
            case "instructor":
                await db.insert(user).values({username,email,password,role});
                await db.insert(instructor).values({username,email,password});
                break;
            default:
                await db.insert(user).values({username,email,password,role});
                await db.insert(naive).values({username,email,password});
                break;
        }
    }
}