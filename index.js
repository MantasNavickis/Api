require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000

// Set 'strictQuery' option for Mongoose (to suppress the deprecation warning)
mongoose.set('strictQuery', false)

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

// Routes go here
app.all('*', (req, res) => {
  res.json({ everything: 'is awesome' })
})

// Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
})
