import logo from "../logo.svg";

export default function Loading(props: {
  loading: boolean;
}): JSX.Element | null {
  return props?.loading ? (
    <img src={logo} className="App-logo" alt="loading" />
  ) : null;
}
