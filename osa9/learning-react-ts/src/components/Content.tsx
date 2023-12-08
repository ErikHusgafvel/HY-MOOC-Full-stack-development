import { Props } from '../types';
import Part from './Part';

const Content = (props: Props) => (
  <div>
    {props.courseParts.map((part, index) => {
      return <Part key={index} coursePart={part} />;
    })}
  </div>
);

export default Content;
