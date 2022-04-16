import type { MetaFunction } from "remix";

export const meta: MetaFunction = () => ({
  title: "Remix: So great, it's funny!",
  description:
    "Remix jokes app. Learn Remix and laugh at the same time!",
});

export default function Index() {
  return (
    <div className="container">
      <a className="button" href="/login">ログインはこちら</a>
      <div className="content">
        <h1>
          できROOM!
        </h1>
      </div>
    </div>
  );
}