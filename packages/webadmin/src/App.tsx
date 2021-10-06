import { Refine } from "@pankod/refine";
import { dataProvider } from "@pankod/refine-supabase";
import "@pankod/refine/dist/styles.min.css";

import authProvider from "./authProvider";
import { supabaseClient } from "./utility";

function App() {
  return <Refine dataProvider={dataProvider(supabaseClient)} authProvider={authProvider} />;
}

export default App;
