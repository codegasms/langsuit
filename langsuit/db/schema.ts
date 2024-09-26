import { relations, sql } from "drizzle-orm";
import { boolean, pgTable, serial, integer, text, varchar, timestamp, date, primaryKey } from "drizzle-orm/pg-core"

// Reusable chunks 
const timestamps = {
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}

const id = {
    id: serial("id").primaryKey()
}

// Users Table
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("username").notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    password: text("password").notNull(),
    role: text("role").notNull(),
    registeredAt: timestamp('registered_at').defaultNow().notNull(),
    hasPurchased: boolean('has_purchased').default(false).notNull()
})

// Instructor Table
export const instructor = pgTable("instructor", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    // Add any instructor-specific fields here
})

export const instructorRelation = relations(instructor, ({ one, many }) => ({
    user: one(users, {
        fields: [instructor.userId],
        references: [users.id],
    }),
    courses: many(courses),
}))

// Courses Table
export const courses = pgTable("courses", {
    ...id,
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
    instructorId: integer("instructor_id").notNull().references(() => instructor.id),
    category: text("category").notNull(),
    price: integer("price").default(0),
    visits: integer("visits").default(0)
});

export const coursesRelation = relations(courses, ({ one }) => ({
    instructor: one(instructor, {
        fields: [courses.instructorId],
        references: [instructor.id]
    }),
}))

// Admin Table
export const admin = pgTable("admin", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    // Add any admin-specific fields here
})

// Naive Table (purpose unclear, consider removing if not needed)
export const naive = pgTable("naive", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id),
    // Add any naive-specific fields here
})

// Follow List Table
export const followList = pgTable('follow_list', {
    userId: integer("user_id").notNull().references(() => users.id),
    instructorId: integer("instructor_id").notNull().references(() => instructor.id)
}, (table) => ({
    pk: primaryKey({ columns: [table.userId, table.instructorId] })
}));

export const followListRelations = relations(followList, ({ one }) => ({
    users: one(users, {
        fields: [followList.userId],
        references: [users.id]
    }),
    instructor: one(instructor, {
        fields: [followList.instructorId],
        references: [instructor.id]
    })
}))

// Live Stream Table
export const liveStream = pgTable("live_stream", {
    ...id,
    ...timestamps,
    instructorId: integer("instructor_id").notNull().references(() => instructor.id),
    title: text("title").notNull(),
    date: date("date").notNull(),
    category: text("category").notNull(),
    price: integer("price"),
    ingressId: text('ingress_id').notNull(),
    serverUrl: text('server_url'),
    streamKey: text('stream_key'),
    isLive: boolean('is_live'),
    isChatEnabled: boolean('is_chat_enabled'),
    isChatDelayed: boolean('is_chat_delayed'),
    isChatFollowersOnly: boolean('is_chat_followers_only')
});

export const liveStreamRelation = relations(liveStream, ({ one }) => ({
    instructor: one(instructor, {
        fields: [liveStream.instructorId],
        references: [instructor.id]
    })
}))

// Ticket Table
export const ticket = pgTable("ticket", {
    ...id,
    ...timestamps,
    streamId: integer("stream_id").notNull().references(() => liveStream.id),
    userId: integer("user_id").notNull().references(() => users.id)
})

export const ticketRelation = relations(ticket, ({ one }) => ({
    liveStream: one(liveStream, {
        fields: [ticket.streamId],
        references: [liveStream.id]
    }),
    users: one(users, {
        fields: [ticket.userId],
        references: [users.id]
    })    
}))

// User Progress Table
export const userProgress = pgTable("user_progress", {
    userId: integer("user_id").primaryKey().references(() => users.id),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/mascot.svg"),
    activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
});

// Sales Table
export const sales = pgTable("sales", {
    ...id,
    ...timestamps,
    userId: integer("user_id").notNull().references(() => users.id),
    courseId: integer("course_id").references(() => courses.id),
    streamId: integer("stream_id").references(() => liveStream.id),
    amount: integer("amount").notNull(),
})

export const salesRelations = relations(sales, ({ one }) => ({
    users: one(users, {
        fields: [sales.userId],
        references: [users.id]
    }),
    course: one(courses, {
        fields: [sales.courseId],
        references: [courses.id]
    }),
    stream: one(liveStream, {
        fields: [sales.streamId],
        references: [liveStream.id]
    })
}))