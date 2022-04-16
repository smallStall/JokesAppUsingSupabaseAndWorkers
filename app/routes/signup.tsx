import {
  LinksFunction,
  MetaFunction,
} from "remix";
import { LoginForm } from "~/components/loginForm";
import stylesUrl from "../styles/login.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const meta: MetaFunction = () => {
  return {
    title: "集中できルーム | ユーザー登録",
  };
};

export default function Authenticate() {
  return <LoginForm isLogin={false}/>;
}

