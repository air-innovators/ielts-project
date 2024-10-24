import { Form, useLoaderData } from "@remix-run/react";
import { authenticator } from "../services/auth.server";
import { Properties } from "csstype";
import { LoaderFunction } from "@remix-run/node";
import { verifyUser } from "~/utils/verifyUser";

const CONTAINER_STYLES: Properties = {
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const BUTTON_STYLES: Properties = {
  padding: "15px 25px",
  background: "#dd4b39",
  border: "0",
  outline: "none",
  cursor: "pointer",
  color: "white",
  fontWeight: "bold",
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await verifyUser(request);
  return { user };
};


const Dashboard = () => {
  // getting user from loader data
  const { user } = useLoaderData<typeof loader>();
  console.log(user);

  // displaying authenticated user data
  return (
    <div style={CONTAINER_STYLES}>
      <h1>You are LoggedIn</h1>
      <p>{user?.name}</p>

      <Form action="/logout" method="post">
        <button style={BUTTON_STYLES}>Logout</button>
      </Form>
    </div>
  );
};

export default Dashboard;
