interface Header {
  content: string;
}

const Header = (props: Header) => {
  return <h1>{props.content}</h1>;
};

export default Header;
