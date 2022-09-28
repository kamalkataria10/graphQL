import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } from "graphql";

export const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        user_id: { type: GraphQLID },
        user_name: { type: GraphQLString},
        bank_accounts: { type: new GraphQLList(GraphQLString) },
    })
})