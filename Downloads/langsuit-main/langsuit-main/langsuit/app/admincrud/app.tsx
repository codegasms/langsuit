"use client";

import simpleRestProvider from "ra-data-simple-rest";
import { Admin, CustomRoutes, Resource } from "react-admin";
import { Route } from "react-router-dom";

import { ChallengeAnalytics } from "./analytics/ChallengeAnalytics";
import { CourseAnalytics } from "./analytics/CourseAnalytics";
import { LessonAnalytics } from "./analytics/LessonAnalytics";
import { UnitAnalytics } from "./analytics/UnitAnalytics";

import { ChallengeCreate } from "./challenge/create";
import { ChallengeEdit } from "./challenge/edit";
import { ChallengeList } from "./challenge/list";
import { ChallengeOptionCreate } from "./challengeOption/create";
import { ChallengeOptionEdit } from "./challengeOption/edit";
import { ChallengeOptionsList } from "./challengeOption/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";
import { CourseList } from "./course/list";
import { LessonCreate } from "./lesson/create";
import { LessonEdit } from "./lesson/edit";
import { LessonList } from "./lesson/list";
import { UnitCreate } from "./unit/create";
import { UnitEdit } from "./unit/edit";
import { UnitList } from "./unit/list";

import { theme } from "./theme";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return (
    <Admin theme={theme} dataProvider={dataProvider}>
      <CustomRoutes>
        <Route path="/courses/analytics" element={<CourseAnalytics />} />
        <Route path="/units/analytics" element={<UnitAnalytics />} />
        <Route path="/lessons/analytics" element={<LessonAnalytics />} />
        <Route path="/challenges/analytics" element={<ChallengeAnalytics />} />
      </CustomRoutes>

      <Resource
        name="courses"
        recordRepresentation="title"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
      />

      <Resource
        name="units"
        recordRepresentation="title"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
      />

      <Resource
        name="lessons"
        recordRepresentation="title"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
      />

      <Resource
        name="challenges"
        recordRepresentation="question"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
      />

      <Resource
        name="challengeOptions"
        recordRepresentation="text"
        list={ChallengeOptionsList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        options={{
          label: "Challenge Options",
        }}
      />
    </Admin>
  );
};

export default App;
