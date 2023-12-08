import { CoursePart } from '../types';

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  console.log(coursePart);
  switch (coursePart.kind) {
    case 'basic':
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>{' '}
          <br />
          <em>{coursePart.description}</em>
        </div>
      );
    case 'group':
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>{' '}
          <br />
          project exercises {coursePart.groupProjectCount}
        </div>
      );
    case 'background':
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>{' '}
          <br />
          <em>{coursePart.description}</em> <br />
          submit to {coursePart.backgroundMaterial}
        </div>
      );
    case 'special':
      return (
        <div>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>{' '}
          <br />
          <em>{coursePart.description}</em>
          <br />
          required skills: {coursePart.requirements.join(', ').toString()}
        </div>
      );
  }
};

export default Part;
