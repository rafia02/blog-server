const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')

app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');








async function run() {
  try {
      const uri = "mongodb+srv://rafia:Ym2WLtiVKtuJb3Mz@cluster0.uidcysm.mongodb.net/?retryWrites=true&w=majority";
      const client = new MongoClient(uri, {
          serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
          }
      });


      const blogsCollection = client.db("Blog").collection("AllBlog")
      const commentCollection = client.db("Blog").collection("AllComment")










      app.get("/blogs", async (req, res) => {
          const result = await blogsCollection.find({}).toArray()
          res.send(result)
      })


      app.post('/blog', async (req, res) => {
        const info = req.body
        const result = await blogsCollection.insertOne(info)
        res.send(result)
    })

      app.post('/comment', async (req, res) => {
        const info = req.body
        const result = await commentCollection.insertOne(info)
        res.send(result)
    })


    app.get("/blog/:id", async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const result = await blogsCollection.findOne(filter)
      res.send(result)
  })




    app.patch("/blogUpdate/:id", async (req, res) => {
      const id = req.params.id
      const upinfo = req.body
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true };
      const update = {
        $set: {
          title: upinfo.title,
          content: upinfo.content
        }
      }
      const result = await blogsCollection.updateOne(filter, update, options)
      res.send(result)
    })



    app.delete("/blog/:id", async(req, res)=>{
        const id = req.params.id 
        const filter = {_id: new ObjectId(id)}
        const result = await blogsCollection.deleteOne(filter)
        res.send(result)
    })
    app.delete("/comment/:id", async(req, res)=>{
        const id = req.params.id 
        const filter = {_id: new ObjectId(id)}
        const result = await commentCollection.deleteOne(filter)
        res.send(result)
    })




    app.get("/comments", async (req, res) => {
      const id = req.query.id
      const filter = { id: id }
      const result = await commentCollection.find(filter).toArray()
      res.send(result)
    })








  } finally {


  }
}
run().catch(console.dir);













app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})