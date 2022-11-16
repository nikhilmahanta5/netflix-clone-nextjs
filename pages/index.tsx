import Head from "next/head";
import styles from "../styles/Home.module.css";
import Nav from "../Components/Nav";
import Banner from "../Components/Banner";
import Row from "../Components/Row";
import requests from "../request";
import { modalState } from "../atom/modalAtom";
import {useRecoilValue} from 'recoil';
import { useState } from "react";
import Modal from '../Components/Modal'

interface Props {
  trendingNow: Movie[];
  topRated: movie[];
  actionMovies: Movie[];
}



const Home = ({ trendingNow, topRated, actionMovies }: Props) => {

  const modal = useRecoilValue(modalState);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix-Clone</title>
      </Head>
      <Nav />
      <main>
        <Banner trendingNow={trendingNow} />

        <section>
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated Movies" movies={topRated} />
          <Row title="Action Movies" movies={actionMovies} />
        </section>
      </main>
   { {modal} && <Modal/>}
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const [trendingNow, topRated, actionMovies] = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
  ]);

  return {
    props: {
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
    },
  };
};
