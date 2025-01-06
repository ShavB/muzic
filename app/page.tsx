import AppBar from "./components/AppBar";
import Provider from "./Provider";

export default function Home() {
  console.log(process.env.GOOGLE_CLIENT_ID);
  return (
    <main>
      <Provider>
        <AppBar />
      </Provider>
    </main>
  );
}
