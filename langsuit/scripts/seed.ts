import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL);

// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

    await db.delete(schema.admin);
    await db.delete(schema.sales);
    await db.delete(schema.courses);
    await db.delete(schema.followList);
    await db.delete(schema.instructor);
    await db.delete(schema.liveStream);
    await db.delete(schema.naive);
    await db.delete(schema.ticket);
    await db.delete(schema.userProgress);
    await db.delete(schema.users);

    // await db.insert(schema.admin).values(admin);
    await db.insert(schema.courses).values(courses);
    // await db.insert(schema.followList).values(follow_list);
    await db.insert(schema.instructor).values(instructor);
    // await db.insert(schema.liveStream).values(live_stream);
    await db.insert(schema.naive).values(naive);
    await db.insert(schema.sales).values(sales);
    // await db.insert(schema.ticket).values(ticket);
    await db.insert(schema.userProgress).values(user_progress);
    await db.insert(schema.users).values(users);

    console.log("Database seeded successfully");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();

const admin = [{}];

const courses = [
  {
    id: 1,
    title: "English",
    imageSrc: "/US - United States.svg",
    instructorId: 1,
    category: "language",
    price: 50000,
    visits: 34,
  },
  {
    id: 2,
    title: "Hindi",
    imageSrc: "/IN - India.svg",
    instructorId: 2,
    category: "language",
    price: 50000,
    visits: 433,
  },
  {
    id: 3,
    title: "Japanese",
    imageSrc: "/JP - Japan.svg",
    instructorId: 3,
    category: "vowels",
    price: 40000,
    visits: 324,
  },
  {
    id: 4,
    title: "Espanol",
    imageSrc: "/ES - Spain.svg",
    instructorId: 4,
    category: "vowels",
    price: 30000,
    visits: 32,
  },
];

const follow_list = [{}];

const instructor = [
  { id: 1, user_id: 1 },
  { id: 2, user_id: 2 },
  { id: 3, user_id: 3 },
  { id: 4, user_id: 4 },
];

const live_stream = [{}];

const naive = [
  { id: 1, user_id: 5 },
  { id: 2, user_id: 6 },
];

const sales = [
  {
    id: 1,
    created_at: "2024-09-27 02:49:35.235979",
    updated_at: "2024-09-27 02:49:35.235979",
    user_id: 5,
    course_id: 2,
    stream_id: null,
    amount: 50000,
  },
  {
    id: 2,
    created_at: "2024-09-27 02:50:11.873677",
    updated_at: "2024-09-27 02:50:11.873677",
    user_id: 6,
    course_id: 1,
    stream_id: null,
    amount: 50000,
  },
  {
    id: 3,
    created_at: "2024-09-27 02:51:06.079769",
    updated_at: "2024-09-27 02:51:06.079769",
    user_id: 5,
    course_id: 3,
    stream_id: null,
    amount: 40000,
  },
  {
    id: 4,
    created_at: "2024-09-27 02:51:44.456545",
    updated_at: "2024-09-27 02:51:44.456545",
    user_id: 6,
    course_id: 3,
    stream_id: null,
    amount: 4000,
  },
  {
    id: 5,
    created_at: "2024-09-27 02:52:23.896723",
    updated_at: "2024-09-27 02:52:23.896723",
    user_id: 6,
    course_id: 3,
    stream_id: null,
    amount: 40000,
  },
  {
    id: 6,
    created_at: "2024-09-27 02:53:12.103311",
    updated_at: "2024-09-27 02:53:12.103311",
    user_id: 5,
    course_id: 4,
    stream_id: null,
    amount: 40000,
  },
];

const ticket = [{}];

const user_progress = [
  {
    user_id: 1,
    user_name: "User1",
    user_image_src: "/mascot.svg",
    active_course_id: 4,
    hearts: 10,
    points: 3231,
  },
];

const users = [
  {
    id: 1,
    username: "Inst1",
    email: "inst1@gmail.com",
    password: "inst1",
    role: "instructor",
    registered_at: "2024-09-26 19:50:32.041166",
    has_purchased: true,
  },
  {
    id: 2,
    username: "Inst2",
    email: "inst2@gmail.com",
    password: "inst2",
    role: "instructor",
    registered_at: "2024-09-26 19:51:29.194709",
    has_purchased: true,
  },
  {
    id: 3,
    username: "Inst3",
    email: "inst3@gmail.com",
    password: "inst3",
    role: "instructor",
    registered_at: "2024-09-26 19:57:30.848974",
    has_purchased: false,
  },
  {
    id: 4,
    username: "Inst4",
    email: "inst4@gmail.com",
    password: "inst4",
    role: "instructor",
    registered_at: "2024-09-26 19:58:12.939093",
    has_purchased: true,
  },
  {
    id: 5,
    username: "naive1",
    email: "naive1@gmail.com",
    password: "naive1",
    role: "naive",
    registered_at: "2024-09-27 02:35:58.894099",
    has_purchased: false,
  },
  {
    id: 6,
    username: "naive2",
    email: "naive2@gmail.com",
    password: "naive2",
    role: "naive",
    registered_at: "2024-09-27 02:40:55.359437",
    has_purchased: false,
  },
  {
    id: 7,
    username: "Inst7",
    email: "inst5@gmail.com",
    password: "inst4",
    role: "instructor",
    registered_at: "2024-09-27 04:57:51.388582",
    has_purchased: true,
  },
];
