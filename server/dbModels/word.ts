import mongoose from "mongoose";
// import bcrypt from "mongoose-bcrypt";

const schema = new mongoose.Schema(
  {
    name: String,
    indice: String
  }
);

// schema.plugin(bcrypt);
export default mongoose.model("Word", schema, "word");