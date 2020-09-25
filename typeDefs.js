//schema definition goes here
const { gql } = require('apollo-server');

const typeDefs = gql`
    type Query {
        message: String
        patient(id: ID!): Patient
        doctor(id: ID!): Doctor
    }

    type Patient {
        id: ID!
        name: String!
        doctors: [Doctor]
    }

    type Doctor {
        id: ID!
        name: String
        patients: [Patient]
    }

    type Mutation {
        createAppointment(input: CreateAppointmentRequest!):CreateAppointmentResponse
    }

    input CreateAppointmentRequest {
        patientId: ID!
        doctorId: ID!
        date: String
    }

    type CreateAppointmentResponse {
        appointment: Appointment
    }

    type Appointment {
        id: ID!
        patientId: ID
        doctorId: ID
        date: String
    }
`;

// for Mutation
// Goal: Create an appointment for a patient with a doctor and a
    // date for that appointment. You can try this appointment addition
    // in-memory (not with REST APIs, as this is not supported by the API yet).
    // 1. In typeDefs.js, add a Mutation type.



module.exports = typeDefs;
