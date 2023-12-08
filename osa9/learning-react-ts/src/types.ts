interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: 'basic';
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: 'group';
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: 'background';
}

interface AnotherCoursePart extends CoursePartDescription {
  requirements: Array<string>;
  kind: 'special';
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | AnotherCoursePart;

export interface HeaderInterface {
  content: string;
}

export interface TotalInterface {
  total: number;
}

export interface Props {
  courseParts: Array<CoursePart>;
}
