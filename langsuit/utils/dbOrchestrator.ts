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



abstract class User {
    public abstract insert(role:string,username:string,email:string,password:string) : Promise<void>;
}
export class UserOrchestrator {
    private m_RegisteredUser:Map<String,any> = new Map();
    static #instance: UserOrchestrator;
    
    public registerUser(userID:String, user:User){
        this.m_RegisteredUser.set(userID, user);
    }
    
    public static get instance(): UserOrchestrator {
        if(!UserOrchestrator.#instance){
            UserOrchestrator.#instance = new UserOrchestrator();
        }
        return UserOrchestrator.#instance;
    }

    public static get(userRole:String) : User {
        return (UserOrchestrator.instance || (this)).m_RegisteredUser.get(userRole);
    }
}
class adminUser extends User {
    static #instance: adminUser;
    
    private constructor() {
        super();
    }
    
    public static get instance(): adminUser {
        if(!adminUser.#instance) {
            adminUser.#instance = new adminUser;
        }
        return adminUser.#instance;
    }

    static {
        UserOrchestrator.instance.registerUser("admin",adminUser.instance);
    }

    public async insert(role:string,username:string,email:string,password:string) {
        await db.insert(user).values({username,email,password,role});
        await db.insert(admin).values({username,email,password});
    }
}

class instructorUser extends User {
    static #instance: instructorUser;
    
    private constructor() {
        super();
    }

    public static get instance(): instructorUser {
        if(!instructorUser.#instance) {
            instructorUser.#instance = new instructorUser;
        }
        return instructorUser.#instance;
    }

    static {
        UserOrchestrator.instance.registerUser("instructor",instructorUser.instance);
    }

    public async insert(role:string,username:string,email:string,password:string) {
        await db.insert(user).values({username,email,password,role});
        await db.insert(instructor).values({username,email,password});
    }
}
class naiveUser extends User {
    static #instance: naiveUser;
    
    private constructor() {
        super();
    }

    public static get instance(): naiveUser {
        if(!naiveUser.#instance) {
            naiveUser.#instance = new naiveUser;
        }
        return naiveUser.#instance;
    }

    static {
        UserOrchestrator.instance.registerUser("naive",naiveUser.instance);
    }

    public async insert(role:string,username:string,email:string,password:string) {
        await db.insert(user).values({username,email,password,role});
        await db.insert(naive).values({username,email,password});
    }
}