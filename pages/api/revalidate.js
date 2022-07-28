export default async function handler(req, res) {
  if (req.query.secret !== "coucou") {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (!req.query.card) {
    return res.status(401).json({ message: "need card parameter" });
  }
  try {
    await res.revalidate(`/card/${req.query.card}`);
    return res.json({ revalidated: true });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error revalidating");
  }
}
