// import { http, HttpResponse } from 'msw';
// import mockData from './app.mock'; // Import static mock data

// // Function to retrieve data from localStorage or initialize it with the static mock data

// console.log("from here---->>>>",localStorage.getItem("token"))
// const getDataFromStorage = () => {
//   const storedData = localStorage.getItem('data');
  
//   if (!storedData) {
//     console.log('No data found in localStorage, initializing with mockData.');
//     localStorage.setItem('data', JSON.stringify(mockData));
//     return mockData;
//   }
  
//   console.log('Data retrieved from localStorage:', storedData);
//   return JSON.parse(storedData);
// };

// // Function to save new data to localStorage
// const saveDataToStorage = (data: any[]) => {
//   console.log('Saving data to localStorage:', data);
//   localStorage.setItem('data', JSON.stringify(data));
// };

// export const handlers = [
//   // GET request handler for fetching all data
//   http.get('/data', (req, res, ctx) => {
//     const data = getDataFromStorage(); // Get data from localStorage
//     console.log('GET /data response:', data);
//     return res(
//       ctx.status(200),
//       ctx.json(data) // Respond with the fetched data
//     );
//   }),

//   // POST request handler for adding new data
//   http.post('/data', (req, res, ctx) => {
//     const newItem = req.body; // Get the new item from the request body
//     const data = getDataFromStorage(); // Get current data from localStorage
//     const updatedData = [...data, newItem]; // Add the new item to the data array

//     saveDataToStorage(updatedData); // Save the updated data back to localStorage

//     console.log('POST /data response:', { message: 'Data added successfully', newItem });
//     return res(
//       ctx.status(201),
//       ctx.json({ message: 'Data added successfully', newItem })
//     );
//   }),
// ];
