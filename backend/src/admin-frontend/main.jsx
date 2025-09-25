import React from "react";
import { createRoot } from "react-dom/client";
import { Admin, Resource, ListGuesser } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider = simpleRestProvider("/api");

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={ListGuesser} />
    <Resource name="afiliados" list={ListGuesser} />
    <Resource name="boletos" list={ListGuesser} />
    <Resource name="distribuidores" list={ListGuesser} />
    <Resource name="referrals" list={ListGuesser} />
  </Admin>
);

const root = createRoot(document.getElementById("root"));
root.render(<App />);
