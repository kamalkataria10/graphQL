import { GraphQLObjectType, GraphQLString, GraphQLBoolean, GraphQLInt, GraphQLFloat, GraphQLID, GraphQLList } from "graphql";

export const BankDetails = new GraphQLObjectType({
  name: "Details",
  fields: () => ({
  id: { type: GraphQLID},
  name: { type: GraphQLString },
  accounts: { type: new GraphQLList(GraphQLString) },
  MICR: { type: GraphQLString },
  BRANCH: { type: GraphQLString },
  ADDRESS: { type: GraphQLString }, 
  STATE: { type: GraphQLString },
  CONTACT: { type: GraphQLInt },
  UPI: { type: GraphQLBoolean },
  RTGS: { type: GraphQLBoolean },
  CITY: { type: GraphQLString },
  CENTRE: { type: GraphQLString },
  DISTRICT: { type: GraphQLString },
  NEFT: { type: GraphQLBoolean },
  IMPS: { type: GraphQLBoolean },
  SWIFT: { type: GraphQLString },
  ISO3166: { type: GraphQLString },
  BANK: { type: GraphQLString },
  BANKCODE: { type: GraphQLString },
  IFSC: { type: GraphQLString },
  
  temp: { type: GraphQLFloat },
  humidity: { type: GraphQLFloat },
  }),
});