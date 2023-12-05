interface Total {
  total: number;
}

const Total = (props: Total) => <p>Number of exercises {props.total}</p>;

export default Total;
