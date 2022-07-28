const END_POINT = "https://api.magicthegathering.io/v1/";

const getCards = async () => {
  console.log("<>><<<>>>><<>>><<>><");
  console.log("fetching 5 cards  ");
  return fetch("https://api.magicthegathering.io/v1/cards?pageSize=5").then(
    (a) => a.json()
  );
};

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
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  // const {cards} = await getCards()
  // console.log('getStaticPaths', cards.length)
  // const paths = cards.map((card) => ({
  //   params: { name: card.name.replace(' ', '-') }
  // }))

  return { paths: [], fallback: "blocking" };
}

export default IdPage;
