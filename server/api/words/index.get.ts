import { words } from "../../dbModels";

export default defineEventHandler(async (event) => {
  console.log("GET /api/words");
  try {
    console.log("Find words");
    const wordsData = await words.find();
    return wordsData.map((word) => ({
      id: word._id,
      name: word.name,
      indice: word.indice
    }));
  } catch (err) {
    console.dir(err);
    event.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});