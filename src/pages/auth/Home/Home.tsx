import List from "../../../components/List/List";
import Layout from "../Layout";
import styles from "./Home.module.scss";


function Home() {

  return (
    <Layout>
    <div className={styles.container}>
        <List />
    </div>
    </Layout>
  );
}

export default Home;
