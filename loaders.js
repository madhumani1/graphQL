const DataLoader = require('dataloader');
const fetch = require('node-fetch');
const API_URL = 'http://localhost:4001/api/v1';

/*const doctorLoader = new DataLoader((ids) => {
    const arrayOfDoctorPromises = ids.map((id) => {
        console.log(`Calling for doctor: ${API_URL}/visit/doctor/${id}`);
        return fetch(`${API_URL}/visit/doctor/${id}`)
        .then((res) => {
            res.json();
            console.log(res.json());
        })
        .catch((error) => {
            console.log(`Calling for doctor: ${API_URL}/visit/doctor/${id} failed`);
            console.log('reason: ', error);
        });
                //.catch((err)=> console.log('Error fetching record: ', err));
    });
    console.log('arrayofDoctors: ', JSON.stringify(arrayOfDoctorPromises));
    /**
     * Creates a Promise that is resolved with an array of doctors
     * when all of the provided Promises resolve,
     * or rejected when any Promise is rejected.
     */
    /*return Promise.all(arrayOfDoctorPromises);
});*/

const doctorLoader = new DataLoader((ids) => {
    const arrayOfDoctorPromises = ids.map((id) => {
        //console.log(`Calling for doctor: ${API_URL}/doctor/${id}`);
        return fetch(`${API_URL}/doctor/${id}`).then((res) => res.json());
    });
    //console.log('loaders array: ',arrayOfDoctorPromises);
    return Promise.all(arrayOfDoctorPromises);
});

module.exports = {
    getDataLoaders: () => ({doctorLoader: doctorLoader,})
};
