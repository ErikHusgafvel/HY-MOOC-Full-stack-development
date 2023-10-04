const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log("give password as argument")
  process.exit(1)
}

const password = process.argv[2]

const url =
  /*`mongodb://erik:${password}@cluster0.fucj9.mongodb.net/test-app?retryWrites=true&w=majority`*/
  `mongodb://erik:${password}@cluster0-shard-00-00.fucj9.mongodb.net:27017,cluster0-shard-00-01.fucj9.mongodb.net:27017,cluster0-shard-00-02.fucj9.mongodb.net:27017/test-app?ssl=true&replicaSet=atlas-qupde3-shard-0&authSource=admin&retryWrites=true&w=majority`

mongoose.set("strictQuery", false)
const logger = require("./utils/logger")
mongoose
  .connect(url)
  .then(() => {
    logger.info("connected to MongoDB")
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model("Note", noteSchema)

const note = new Note({
  content: "HTML is Easy",
  important: true,
})

note.save().then((result) => {
  console.log("note saved!")
  mongoose.connection.close()
})
