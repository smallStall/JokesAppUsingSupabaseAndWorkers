//import { Link, Outlet, useLoaderData } from "remix";
import { Room } from "~/components/room";
import { useLoaderData, useCatch } from "remix";
import type { LoaderFunction, LinksFunction } from "remix";
import { Link } from "react-router-dom";
import { getSkywaySign } from "~/utils/session.server";
import type { SkywaySign } from "~/utils/session.server";
import stylesUrl from "../styles/room.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export const loader: LoaderFunction = async ({ request }) => {
  return await getSkywaySign(request, "/login?status=timeover");
};

export default function RoomRoute() {
  const loaderData = useLoaderData<SkywaySign>();
  return (
    <section>
      <Room sign={loaderData} />
    </section>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  if (caught.status === 401) {
    return (
      <div className="error-container">
        <p>
          認証期間が過ぎました。お手数おかけしますがルームに入り直してください。
        </p>
        <Link to="/user">ログインはこちら</Link>
      </div>
    );
  }
}
