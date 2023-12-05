interface Part {
  name: string;
  exerciseCount: number;
}

interface Props {
  courseParts: Array<Part>;
}

const Content = (props: Props) => (
  <div>
    {props.courseParts.map((part) => {
      return (
        <p key={part.name}>
          {part.name} {part.exerciseCount}
        </p>
      );
    })}
  </div>
);

export default Content;
