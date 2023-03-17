import { words } from "../../dbModels";

export default defineEventHandler(async (event) => {
  const newDate = new Date;
  const bodyOfPost = await readBody(event)
  console.log(`${bodyOfPost.uid} | GET WORD ${bodyOfPost.name} | ${newDate.getHours()}h${newDate.getMinutes()}:${newDate.getSeconds()}`)

  try {
    console.log("Find words");
    const wordsData = await words.find();
    const wordsArray = wordsData.map((word) => ({
      id: word._id,
      name: word.name,
      indice: word.indice,
      image: word.image
    }));
    const indice = wordsArray.find(word => word.name.toLowerCase() === bodyOfPost.name.toLowerCase())
    return indice ? indice : { code: "NOT_FOUND" };
  } catch (err) {
    console.dir(err);
    event.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});