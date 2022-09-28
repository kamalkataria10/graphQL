import { createConnection } from "typeorm";
var conString = "postgres://stciyxbx:y7oPiiFFjUAhK04sj4dnLe7w0TYNrMpe@heffalump.db.elephantsql.com/stciyxbx";
import express from "express"
import { graphqlHTTP } from "express-graphql";
import { schema } from "./Schema"; 
import { Users } from "./Entities/Users"

const main = async () => {
    await createConnection({
        type: "postgres",
        url: conString,
        entities: [Users]
    });
    const app = express();
    app.use(express.json());
    app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true,
    }))

    app.listen(3001, () => {
        console.log("Server is running")
    })
}


main().catch((err) => {
    console.log(err)
})
