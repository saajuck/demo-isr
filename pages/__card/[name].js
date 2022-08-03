
const getCard = async (name) => {
  console.log("fetching card: ", name);

  return fetch(
    `https://api.magicthegathering.io/v1/cards?name=${name.replace("-", " ")}`
  ).then((a) => a.json());
};

const IdPage = ({ card, getStaticProps }) => {
  return (
    <div>
      <p>getStaticProps: {JSON.stringify(getStaticProps)}</p>
      <pre>{JSON.stringify(card, undefined, 2)}</pre>
    </div>
  );
};

export async function getStaticProps({ params }) {
  return {
    props: {
      card: (await getCard(params.name)).cards,
      getStaticProps: true,
    },
    revalidate: 6000,
  };
}

export async function getStaticPaths() {
  return { paths: [], fallback: "blocking" };
}

export default IdPage;
