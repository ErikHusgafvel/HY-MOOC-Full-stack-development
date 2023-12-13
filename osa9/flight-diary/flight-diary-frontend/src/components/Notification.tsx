interface Props {
  message: string;
}

const Notification = ({ message }: Props) => {
  if (!message) {
    return null;
  }

  const errorStyle = {
    color: 'red',
    font: 20,
    background: 'lightgrey',
    border: 'solid',
    padding: 10,
    marginBottom: 10,
  };

  return <div style={errorStyle}>{message}</div>;
};

export default Notification;
