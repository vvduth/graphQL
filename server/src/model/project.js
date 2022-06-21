"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not started', 'In progress', 'Completed']
    },
    clientId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    }
});
const Project = mongoose_1.default.model('Project', ProjectSchema);
exports.default = Project;
