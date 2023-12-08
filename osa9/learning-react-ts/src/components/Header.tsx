import { HeaderInterface } from '../types';

const Header = (props: HeaderInterface) => {
  return <h1>{props.content}</h1>;
};

export default Header;
