import { relations } from "drizzle-orm";
import { boolean,pgTable,serial, text, varchar,timestamp, integer, date, primaryKey } from "drizzle-orm/pg-core"



// reusable chunks 
const timestamps = {
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}

const id = {
    id: serial("id").primaryKey()
}
const refId = {
    id: integer("user_id").notNull().references(() => user.id).primaryKey()
}

export const courses = pgTable("courses",{
    ...id,
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
    instructorId: integer("instructor_id").notNull().references(()=>instructor.id)
});

export const coursesRelation = relations(courses,({one,many}) => ({
    instructor: one(instructor,{
        fields: [courses.instructorId],
        references: [instructor.id]
    }),
}))

const userColumns = {
    ...id,
    username: varchar("username").notNull(),
    email: varchar("email", {length: 256}).notNull(),
    password: text("password").notNull(),
}
const userTypesColumns = {
    ...refId,
    username: varchar("username").notNull(),
    email: varchar("email", {length: 256}).notNull(),
    password: text("password").notNull(),
}
export const user = pgTable("user",{
    ...userColumns,
    role: text("role").notNull()
})


export const admin = pgTable("admin",{
    ...userTypesColumns,
    // not thought yet
}) 

export const instructor = pgTable("instructor",{
    ...userTypesColumns,
    // not thought yet
})

export const instructorRelation = relations(instructor,({one,many}) => ({
    courses: many(courses), // ins have a many realation with courses
}))

export const naive = pgTable("naive",{
    ...userTypesColumns
    // not thought yet
})

export const followList = pgTable('follow_list', {
    userId: integer("user_id").notNull().references(() => user.id),
    instructorId: integer("instructor_id").notNull().references(() => user.id)
}, (table) => ({
    pk: primaryKey({columns:[table.userId, table.instructorId]})
}));


export const followListRelations = relations(followList,({one,many}) => ({
    user: one(user,{
        fields: [followList.userId],
        references: [user.id]
    }),
    instructor: one(instructor,{
        fields: [followList.instructorId],
        references: [instructor.id]
    })
}))

export const liveStream = pgTable("live_stream",{
    ...id,
    ...timestamp,
    // Referencing instructor
    instructorId: integer("instructor_id").notNull().references(()=>instructor.id),
    title: text("title").notNull(),
    date: date("date").notNull(),
    price: integer("price"),

    ingressId: text('ingress_id').notNull(),
    serverUrl: text('server_url'),
    streamKey: text('stream_key'),
    
    isLive: boolean('is_live'),
    isChatEnabled: boolean('is_chat_enabled'),
    isChatDelayed: boolean('is_chat_delayed'),
    isChatFollowersOnly: boolean('is_chat_followers_only')

    // --->
     
});

export const liveStreamRelation = relations(liveStream,({one}) => ({
    instructor: one(instructor,{
        fields:[liveStream.instructorId],
        references: [instructor.id]
    })
}))

export const ticket = pgTable("ticket",{
    ...id,
    ...timestamp,
    streamId: integer("stream_id").notNull().references(()=>liveStream.id),
    userId: integer("user_id").notNull().references(()=>user.id)
    // Referencing liveStream and User
})

export const ticketRelation = relations(ticket,({one}) => ({
    liveStream: one(liveStream,{
        fields: [ticket.streamId],
        references: [liveStream.id]
    }),
    user: one(user,{
        fields: [ticket.userId],
        references: [user.id]
    })    
}))


export const userProgress = pgTable("user_progress", {
    userId : text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image-src").notNull().default("/mascot.svg"),
    activeCourseID : integer("active_course_id").references(()=> courses.id ,
    {onDelete: "cascade"}),
    hearts : integer("hearts").notNull().default(5) ,
    points : integer("points").notNull().default(0),
}) ;
