
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hello12345:hello12345@cluster0.0evpg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// testing the  connection
  const run = async () => {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      // Catches any errors that occur in the try block
      console.error("Error during MongoDB connection or ping:", error);
    } finally {
      // Ensures that the client will close when you finish/error
      try {
        await client.close();
      } catch (closeError) {
        // Catches errors related to closing the client
        console.error("Error closing MongoDB client:", closeError);
      }
    }
  };
  
// adding a record
const addRecord = async (collectionName, record) => {
    try {
      await client.connect();
      const collection = await client.db("hello").collection(collectionName);
      const result = await collection.insertOne(record);
      console.log("Record added:", result.insertedId);
    } catch (error) {
      console.error("Error adding record:", error);
    } finally {
      await client.close();
    }
  };

  
// viewing a record 
const viewRecords = async (collectionName) => {
    try {
      await client.connect();
      const collection = await client.db("hello").collection(collectionName);
      const records = await collection.find().toArray();
      console.log("Records found:", records);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      await client.close();
    }
  };

  
// updating a record
const updateRecord = async (collectionName, filter, update) => {
    try {
      await client.connect();
      const collection = await client.db("hello").collection(collectionName);
      const result = await collection.updateOne(filter, { $set: update });
      console.log("Records updated:", result.modifiedCount);
    } catch (error) {
      console.error("Error updating record:", error);
    } finally {
      await client.close();
    }
  };

  
// deleting a record
const deleteRecord = async (collectionName, filter) => {
    try {
      await client.connect();
      const collection = await client.db("hello").collection(collectionName);
      const result = await collection.deleteOne(filter);
      console.log("Records deleted:", result.deletedCount);
    } catch (error) {
      console.error("Error deleting record:", error);
    } finally {
      await client.close();
    }
  };

// connnection test
// run();

  
// // add
// addRecord("banana", { name: "John Doe", age: 30 });


// // view
// viewRecords("banana");


// // update
// updateRecord("banana", { name: "John Doe" }, { age: 31 });


// // delete
// deleteRecord("banana", { name: "John Doe" });





