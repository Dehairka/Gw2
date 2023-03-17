import { words } from "../../dbModels";

export default defineEventHandler(async (event) => {
  const newDate = new Date;
  console.log("GET WORDS | ", event.req.headers["x-forwarded-for"] || event.req.connection.remoteAddress, ` | ${newDate.getHours()}h${newDate.getMinutes()}:${newDate.getSeconds()}`)
  console.log('the words are: ')

  try {
    console.log("Find words");
    const wordsData = await words.find();
    return wordsData.map((word) => ({
      id: word._id,
      name: word.name,
      indice: word.indice,
      image: word.image
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