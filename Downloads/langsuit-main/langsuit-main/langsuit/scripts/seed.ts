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

    // await db.delete(schema.admin);
    // await db.delete(schema.sales);
    // await db.delete(schema.courses);
    // await db.delete(schema.followList);
    // await db.delete(schema.instructor);
    // await db.delete(schema.liveStream);
    // await db.delete(schema.naive);
    // await db.delete(schema.ticket);
    // await db.delete(schema.userProgress);
    // await db.delete(schema.users);

    // await db.insert(schema.admin).values(admin);
    // await db.insert(schema.courses).values(courses);
    // await db.insert(schema.followList).values(follow_list);
    // await db.insert(schema.instructor).values(instructor);
    // await db.insert(schema.liveStream).values(live_stream);
    // await db.insert(schema.naive).values(naive);
    // await db.insert(schema.sales).values(sales);
    // await db.insert(schema.ticket).values(ticket);
    // await db.insert(schema.userProgress).values(user_progress);
    // await db.insert(schema.users).values(users);

    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 4, // For Spanish
        title: "Unit 1",
        description: "Learn the Basics of Spanish",
        order: 1,
      },
      {
        id: 2,
        courseId: 4, // For Spanish
        title: "Unit 2",
        description: "A Little Bit Advanced",
        order: 2,
      },
      {
        id: 3,
        courseId: 4, // For Spanish
        title: "Unit 3",
        description: "Advanced Spanish",
        order: 3,
      },
      {
        id: 4,
        courseId: 2, // For Hindi
        title: "Unit 1",
        description: "Learn the Basics of Hindi",
        order: 1,
      },
      {
        id: 5,
        courseId: 2, // For Hindi
        title: "Unit 2",
        description: "A Little Bit Advanced",
        order: 2,
      },
      {
        id: 6,
        courseId: 2, // For Hindi
        title: "Unit 3",
        description: "Advanced Hindi",
        order: 3,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // For Spanish Unit 1 = Learn the Basics of Spanish
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1, // For Spanish Unit 1 = Learn the Basics of Spanish
        order: 2,
        title: "Pronouns",
      },
      {
        id: 3,
        unitId: 1, // For Spanish Unit 1 = Learn the Basics of Spanish
        order: 3,
        title: "Verbs",
      },
      {
        id: 4,
        unitId: 1, // For Spanish Unit 1 = Learn the Basics of Spanish
        order: 4,
        title: "Adjectives",
      },
      {
        id: 5,
        unitId: 1, // For Spanish Unit 1 = Learn the Basics of Spanish
        order: 5,
        title: "Grammar",
      },

      {
        id: 6,
        unitId: 1, // For Spanish Unit 1 = Learn the Basics of Spanish
        order: 6,
        title: "Verbs",
      },
      {
        id: 9,
        unitId: 2, // For Spanish Unit 2 = A Little Bit Advanced
        order: 1,
        title: "Advanced Nouns",
      },
      {
        id: 10,
        unitId: 2, // For Spanish Unit 2 = A Little Bit Advanced
        order: 2,
        title: "Advanced Pronouns",
      },
      {
        id: 11,
        unitId: 2, // For Spanish Unit 2 = A Little Bit Advanced
        order: 3,
        title: "Advanced Verbs",
      },
      {
        id: 14,
        unitId: 3, // For Spanish Unit 3 = Advanced Spanish
        order: 1,
        title: "Expert Nouns",
      },
      {
        id: 15,
        unitId: 3, // For Spanish Unit 3 = Advanced Spanish
        order: 2,
        title: "Expert Pronouns",
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 16,
        unitId: 4, // For Spanish Unit 1 = Learn the Basics of Spanish
        order: 1,
        title: "Nouns",
      },
      {
        id: 17,
        unitId: 4, // For Spanish Unit 1 = Learn the Basics of Spanish
        order: 2,
        title: "Pronouns",
      },
      {
        id: 18,
        unitId: 4, // For Spanish Unit 1 = Learn the Basics of Spanish
        order: 3,
        title: "Verbs",
      },
      {
        id: 19,
        unitId: 4, // For Spanish Unit 1 = Learn the Basics of Spanish
        order: 4,
        title: "Adjectives",
      },
      {
        id: 20,
        unitId: 4, // For Spanish Unit 1 = Learn the Basics of Spanish
        order: 5,
        title: "Grammar",
      },

      {
        id: 21,
        unitId: 4, // For Spanish Unit 1 = Learn the Basics of Spanish
        order: 6,
        title: "Verbs",
      },
      {
        id: 22,
        unitId: 5, // For Spanish Unit 2 = A Little Bit Advanced
        order: 1,
        title: "Advanced Nouns",
      },
      {
        id: 23,
        unitId: 5, // For Spanish Unit 2 = A Little Bit Advanced
        order: 2,
        title: "Advanced Pronouns",
      },
      {
        id: 24,
        unitId: 5, // For Spanish Unit 2 = A Little Bit Advanced
        order: 3,
        title: "Advanced Verbs",
      },
      {
        id: 25,
        unitId: 6, // For Spanish Unit 3 = Advanced Spanish
        order: 1,
        title: "Expert Nouns",
      },
      {
        id: 26,
        unitId: 6, // For Spanish Unit 3 = Advanced Spanish
        order: 2,
        title: "Expert Pronouns",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // For Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "the man"?',
      },
      {
        id: 2,
        lessonId: 1, // For Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        type: "SELECT",
        order: 2,
        question: 'Which one of these is "the woman"?',
      },
      {
        id: 3,
        lessonId: 2, // For Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "he"?',
      },
      {
        id: 4,
        lessonId: 2, // For Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        type: "ASSIST",
        order: 2,
        question: '"they"',
      },
      {
        id: 5,
        lessonId: 1, // For Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        type: "ASSIST",
        order: 3,
        question: '"boy"',
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 6,
        lessonId: 16, // For Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "the man"?',
      },
      {
        id: 7,
        lessonId: 16, // For Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        type: "SELECT",
        order: 2,
        question: 'Which one of these is "the woman"?',
      },
      {
        id: 8,
        lessonId: 17, // For Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        type: "SELECT",
        order: 1,
        question: 'Which one of these is "he"?',
      },
      {
        id: 9,
        lessonId: 17, // For Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        type: "ASSIST",
        order: 2,
        question: '"they"',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1, // For 'Which one of these is "the man"?' : Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "el hombre",
        correct: true,
        imageSrc: "/man.svg",
        audioSrc: "/es_man.mp3",
      },
      {
        id: 2,
        challengeId: 1, // For 'Which one of these is "the man"?' : Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "la mujer",
        correct: false,
        imageSrc: "/woman.svg",
        audioSrc: "/es_woman.mp3",
      },
      {
        id: 3,
        challengeId: 1, // For 'Which one of these is "the man"?' : Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "el robot",
        correct: false,
        imageSrc: "/robot.svg",
        audioSrc: "/es_robot.mp3",
      },
      {
        id: 4,
        challengeId: 2, // For 'Which one of these is "the woman"?' : Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "la mujer",
        correct: true,
        imageSrc: "/woman.svg",
        audioSrc: "/es_woman.mp3",
      },
      {
        id: 5,
        challengeId: 2, // For 'Which one of these is "the woman"?' : Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "el robot",
        correct: false,
        imageSrc: "/robot.svg",
        audioSrc: "/es_robot.mp3",
      },
      {
        id: 6,
        challengeId: 2, // For 'Which one of these is "the woman"?' : Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "el hombre",
        correct: false,
        imageSrc: "/man.svg",
        audioSrc: "/es_man.mp3",
      },
      {
        id: 7,
        challengeId: 3, // For 'Which one of these is "he"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "él",
        correct: true,
        imageSrc: "/he.png",
        audioSrc: "/es_he.mp3",
      },
      {
        id: 8,
        challengeId: 3, // For 'Which one of these is "he"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "ella",
        correct: false,
        imageSrc: "/she.png",
        audioSrc: "/es_she.mp3",
      },
      {
        id: 9,
        challengeId: 3, // For 'Which one of these is "he"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "ellos",
        correct: false,
        imageSrc: "/they.png",
        audioSrc: "/es_they.mp3",
      },
      {
        id: 10,
        challengeId: 4, // For 'Which one of these is "they"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "él",
        correct: false,
        imageSrc: "/he.png",
        audioSrc: "/es_he.mp3",
      },
      {
        id: 11,
        challengeId: 4, // For 'Which one of these is "they"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "ella",
        correct: false,
        imageSrc: "/she.png",
        audioSrc: "/es_she.mp3",
      },
      {
        id: 12,
        challengeId: 4, // For 'Which one of these is "they"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "ellos",
        correct: true,
        imageSrc: "/they.png",
        audioSrc: "/es_they.mp3",
      },
      {
        id: 13,
        challengeId: 5, // For 'Which one of these is "they"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "él chico",
        correct: true,
        imageSrc: "/he.png",
        audioSrc: "/es_he.mp3",
      },
      {
        id: 14,
        challengeId: 5, // For 'Which one of these is "they"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "el hombre",
        correct: false,
        imageSrc: "/man.png",
        audioSrc: "/es_man.mp3",
      },
      {
        id: 15,
        challengeId: 5, // For 'Which one of these is "they"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "el zombie",
        correct: false,
        imageSrc: "/zombie.png",
        audioSrc: "/es_zombie.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 16,
        challengeId: 6, // For 'Which one of these is "the man"?' : Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "आदमी",
        correct: true,
        imageSrc: "/man.svg",
        audioSrc: "/hi_man.mp3",
      },
      {
        id: 17,
        challengeId: 6, // For 'Which one of these is "the man"?' : Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "महिला",
        correct: false,
        imageSrc: "/woman.svg",
        audioSrc: "/hi_woman.mp3",
      },
      {
        id: 18,
        challengeId: 6, // For 'Which one of these is "the man"?' : Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "रोबोट",
        correct: false,
        imageSrc: "/robot.svg",
        audioSrc: "/hi_robot.mp3",
      },
      {
        id: 19,
        challengeId: 7, // For 'Which one of these is "the woman"?' : Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "महिला",
        correct: true,
        imageSrc: "/woman.svg",
        audioSrc: "/hi_woman.mp3",
      },
      {
        id: 20,
        challengeId: 7, // For 'Which one of these is "the woman"?' : Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "रोबोट",
        correct: false,
        imageSrc: "/robot.svg",
        audioSrc: "/hi_robot.mp3",
      },
      {
        id: 21,
        challengeId: 7, // For 'Which one of these is "the woman"?' : Nouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "आदमी",
        correct: false,
        imageSrc: "/man.svg",
        audioSrc: "/hi_man.mp3",
      },
      {
        id: 22,
        challengeId: 8, // For 'Which one of these is "he"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "वह आदमी",
        correct: true,
        imageSrc: "/he.png",
        audioSrc: "/hi_he.mp3",
      },
      {
        id: 23,
        challengeId: 8, // For 'Which one of these is "he"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "वह महिला",
        correct: false,
        imageSrc: "/she.png",
        audioSrc: "/hi_she.mp3",
      },
      {
        id: 24,
        challengeId: 8, // For 'Which one of these is "he"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "वे",
        correct: false,
        imageSrc: "/they.png",
        audioSrc: "/hi_they.mp3",
      },
      {
        id: 25,
        challengeId: 9, // For 'Which one of these is "they"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "वह आदमी",
        correct: false,
        imageSrc: "/he.png",
        audioSrc: "/hi_he.mp3",
      },
      {
        id: 26,
        challengeId: 9, // For 'Which one of these is "they"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "वह महिला",
        correct: false,
        imageSrc: "/she.png",
        audioSrc: "/hi_she.mp3",
      },
      {
        id: 27,
        challengeId: 9, // For 'Which one of these is "they"?' : Pronouns : Spanish Unit 1 = Learn the Basics of Spanish
        text: "वे",
        correct: true,
        imageSrc: "/they.png",
        audioSrc: "/hi_they.mp3",
      },
    ]);

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
    image_src: "/US - United States.svg",
    instructor_id: 1,
    category: "language",
    price: 50000,
    visits: 34,
  },
  {
    id: 2,
    title: "Hindi",
    image_src: "/IN - India.svg",
    instructor_id: 2,
    category: "language",
    price: 50000,
    visits: 433,
  },
  {
    id: 3,
    title: "Japanese",
    image_src: "/JP - Japan.svg",
    instructor_id: 3,
    category: "vowels",
    price: 40000,
    visits: 324,
  },
  {
    id: 4,
    title: "Espanol",
    image_src: "/ES - Spain.svg",
    instructor_id: 4,
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
