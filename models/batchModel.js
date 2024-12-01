import mongoose from "mongoose";

const batchSchema = mongoose.Schema({
    batchName: {
        type: String,
        required: [true, "batch name is required"]
    },
    subject: {
        type: String,
        required: [true, "subject is required"]
    },
    trainer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
        required: [true, "trainer is required"]
    },
    startDate: {
        type: Date,
        required: [true, "start date is required"]
    },
    endDate: {
        type: Date,
        required: [true, "end date id required"]
    },
    capacity: {
        type: Number,
        required: [true, "capacity is required"]
    },
    status: {
        type: String,
        enum: ["not started", "ongoing", "completed"],
        default: "not started"
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students"
    }],
    timeSchedule: {
        type: String,
        required: [true, "schedule is required"]
    },
});

const batchModel = mongoose.model("Batches", batchSchema);
export default batchModel;