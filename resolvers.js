
/**
 * A resolver is a function that is responsible for populating the data
 * for a single field in your schema.
 */
const fetch = require('node-fetch');

const API_URL = 'http://localhost:4001/api/v1';
const Query = {
    message: (parent, args, context, info) => {
        return "Hello World";
    },

    // a way of returning patient with a hard coded value
    /*patient: (parent, args, context, info) => {
        return {id: 5, name: 'Sanjay Dutt'};
    }*/

    // get patient
    patient: async (parent, args, context, info) => {
        const {id} = args;
        console.log(`id: ${id}`);
        const response = await fetch(`${API_URL}/patient/${id}`);
        const result = await response.json();
        //console.log('result: ', result);
        return result;
    },

    // using one-line arrow function syntax here plus destructuring inline
    /*doctor: (_, { id }) =>
    fetch(`${API_URL}/doctor/${id}`).then((res) => res.json()),*/
    doctor: async (parent, args, context, info) => {
        const {id} = args;
        const result = await fetch(`${API_URL}/doctor/${id}`).then((res) => res.json());
        return result;
    }

    // get patient based on visit
    /*patient: async (parent, args, context, info) => {
        const {id} = args;
        console.log(`id: ${id}`);
        const response = await fetch(`${API_URL}/visit/patient/${id}`);
        const result = await response.json();
        console.log('result: ', result);
        return result;
    },*/
};

//Query.patient() -> Patient.doctors() -> Doctor
/*const Patient = {
    async doctors(parent, args, context, info) {
        const { id: patientId } = parent;
        console.log('parent: ', id);
        //const url = `${API_URL}/visit/patient/${parent.patientId}`;
        //console.log(url);

        const response = await fetch(`${API_URL}/visit/patient/${parent.patientId}`);
        const visits = await response.json();
        // Or do it in 1 step using shorthand notation like this
        //const visits = await fetch(url).then((res) => res.json());

      // Equivalent to
      // const result = await fetch(url);
      // const visits = await result.json();

      console.log('visits: ',visits);
      return visits;
    },
  };*/

//Now that we have the list of visits, we want to iterate
//through that list and grab the doctor information (id and name),
//since we only have the id. More details in the comments below.
const Patient = {
    async doctors(parent, args, context, info) {
        const {id } = parent;
        console.log('id: '+id);
        const url = `${API_URL}/visit/patient/${id}`;
        const visits = await fetch(url).then((res) => res.json());
        console.log('visits: ',visits); // observe the shape of the return value

        // GOAL: we want to iterate through the list of visits and use the `doctorId` to do a
        // GET /doctors/doctorId call, and build our array of doctors that the patient has seen
        const arrayOfDoctorPromises = visits.map((v) =>
            fetch(`${API_URL}/doctor/${v.doctorId}`).then((res) => res.json())
        );
        const doctors = await Promise.all(arrayOfDoctorPromises);

        return doctors;

    }
};

const Doctor = {
    patients: async ({id}) => {
        const visits = await fetch(`${API_URL}/visit/doctor/${id}`).then((res) => res.json() );
        console.log('visits: ',visits); // observe the shape of the return value
        return Promise.all(visits.map(({patientId}) =>
        fetch(`${API_URL}/patient/${patientId}`)
            .then((res) => res.json()))
            );
    }
}

let mockAppointmentsDb = [];

const Mutation = {
    createAppointment: (patient, args, context, info) => {
        const { input } = args;
        const { patientId, doctorId, date } = input;

        // Create and save the new Appointment model to our database
        const appointmentRecord = {
            id: mockAppointmentsDb.length+1,
            patientId,
            doctorId,
            date,
        };

        mockAppointmentsDb.push(appointmentRecord);

        // Return the new appointment
        return {
            appointment: appointmentRecord,
        };
    }
};

module.exports = { Query, Patient, Doctor, Mutation }; // we'll add more resolvers to this object
