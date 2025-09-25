import * as React from "react";
import { createRoot } from "react-dom/client";
import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider("/api");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" />
    <Resource name="afiliados" />
    <Resource name="boletos" />
    <Resource name="distribuidores" />
    <Resource name="referrals" />
  </Admin>
);

const root = createRoot(document.getElementById("root"));
root.render(<App />);
