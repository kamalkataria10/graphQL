import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "./Queries/User"
import { CREATE_USER, ADD_ACCOUNT_DETAILS } from "./Mutations/User";

const rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: {
        getAllUsers: GET_ALL_USERS,
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: CREATE_USER,
        addAccountDetails: ADD_ACCOUNT_DETAILS
    }
});

export const schema = new GraphQLSchema({
    query: rootQuery,
    mutation: Mutation,
});