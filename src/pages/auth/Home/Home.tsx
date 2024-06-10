import List from "../../../components/List/List";
import Layout from "../Layout";
import styles from "./Home.module.scss";


function Home() {

  // Todo:  Baci pogled na react-router outlet komponentu, da ne bi morao layout-om da wrappujes svaku stranicu individualno
  // https://reactrouter.com/en/main/components/outlet
  // https://medium.com/@shruti.latthe/understanding-react-outlet-a-comprehensive-guide-b122b1e5e7ff#:~:text=React%20Outlet%20is%20a%20component,navigation%20structures%20in%20their%20applications.
  return (
    <Layout>
    <div className={styles.container}>
        <List />
    </div>
    </Layout>
  );
}

export default Home;
