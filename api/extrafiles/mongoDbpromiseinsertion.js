MongoClient.connect(url).then((client) => { 
   
    const db = client.db(database_name); 
   
    database.insertDocument(db, { name: "Test",  description: "Chill Out! Its just a test program!"}, "test") 
        
    
    .then((result) => { return database.findDocuments(db, "test"); }) 
        .then((documents) => { console.log("Found Documents:\n", documents); return database.updateDocument(db, { name: "Test" }, { description: "Updated Test" }, "test");}) 
        .then((result) => { 
            console.log("Updated Documents Found:\n", result.result); 
   
            return database.findDocuments(db, "test"); 
        }) 
        .then((docs) => { 
            console.log("The Updated Documents are:\n", docs); 
                               
            return db.dropCollection("test"); 
        }) 
        .then((result) => { 
             
            return client.close(); 
        }) 
        .catch((err) => alert(err)); 
   
}) 
.catch((err) => alert(err)); 