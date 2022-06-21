"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../model/client"));
const project_1 = __importDefault(require("../model/project"));
const graphql_1 = require("graphql");
// Client
const ClientType = new graphql_1.GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        phone: { type: graphql_1.GraphQLString },
    }),
});
const ProjectType = new graphql_1.GraphQLObjectType({
    name: "Project",
    fields: () => ({
        id: { type: graphql_1.GraphQLID },
        name: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        status: { type: graphql_1.GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return client_1.default.findById(parent.clientId);
            },
        },
    }),
});
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        projects: {
            type: new graphql_1.GraphQLList(ProjectType),
            resolve(parent, args) {
                return project_1.default.find();
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return project_1.default.findById(args.id);
            },
        },
        clients: {
            type: new graphql_1.GraphQLList(ClientType),
            resolve(parent, args) {
                return client_1.default.find();
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: graphql_1.GraphQLID } },
            resolve(parent, args) {
                return client_1.default.findById(args.id);
            },
        },
    },
});
// Mutation
const mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                email: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                phone: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            },
            resolve(parent, args) {
                const client = new client_1.default({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            },
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
            },
            resolve(parent, args) {
                return client_1.default.findByIdAndRemove(args.id);
            },
        },
        addProject: {
            type: ProjectType,
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                description: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                status: {
                    type: new graphql_1.GraphQLEnumType({
                        name: "ProjectStatus",
                        values: {
                            new: { value: "Not started" },
                            progress: { value: "In progress" },
                            completed: { value: "Completed" },
                        },
                    }),
                    defaultValue: "Not started",
                },
                clientId: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
            },
            resolve(parent, args) {
                const project = new project_1.default({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });
                return project.save();
            },
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
            },
            resolve(parent, args) {
                return project_1.default.findByIdAndRemove(args.id);
            },
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
                name: { type: graphql_1.GraphQLString },
                description: { type: graphql_1.GraphQLString },
                status: {
                    type: new graphql_1.GraphQLEnumType({
                        name: "ProjectStatusUpdate",
                        values: {
                            new: { value: "Not started" },
                            progress: { value: "In progress" },
                            completed: { value: "Completed" },
                        },
                    }),
                },
            },
            resolve(parent, args) {
                return project_1.default.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        description: args.description,
                        status: args.status,
                    },
                }, { new: true });
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation,
});
