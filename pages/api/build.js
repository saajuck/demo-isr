export default async function handler(req, res) {
  if (req.query.secret !== "coucou") {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const { cards } = await fetch(
      "https://api.magicthegathering.io/v1/cards?set=10E&pageSize=300"
    ).then((r) => r.json());
    await Promise.all(
      cards.map((card) => res.revalidate(`/card/${card.name}`))
    );
    return res.json({ "build done": true });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error revalidating");
  }
}
