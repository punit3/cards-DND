import { http, HttpResponse } from 'msw';
import mockData from './app.mock'; 

// Function to retrieve data from localStorage or initialize it with the static mock data
const getDataFromStorage = () => {
  const storedData = localStorage.getItem('data');
  
  if (!storedData) {
    // Initialize localStorage with mockData if it's empty
    localStorage.setItem('data', JSON.stringify(mockData));
    return mockData;
  }
  
  return JSON.parse(storedData);
};

// Function to save new data to localStorage
const saveDataToStorage = (data: any[]) => {
  console.log('Saving data to localStorage:', data);
  localStorage.setItem('data', JSON.stringify(data));
};

export const handlers = [
  // GET request handler for fetching all data
  http.get('/data', () => {
    const data = getDataFromStorage(); 
    return HttpResponse.json(data); 
  }),

  // POST request handler for saving data
  http.post('/data', async ({ request }) => {
    try {
      // Read the intercepted request body as JSON
      const newData = await request.json();

      // Check if the data is an array
      if (!Array.isArray(newData)) {
        return HttpResponse.json({ success: false, message: 'Invalid data format. Expected an array.' }, { status: 400 });
      }

      // Save the new data to localStorage
      saveDataToStorage(newData);

      // Return a success response
      return HttpResponse.json({ success: true, message: 'Data saved successfully.' }, { status: 201 });
    } catch (error) {
      console.error('Error saving data:', error);

      // Return an error response
      return HttpResponse.json({ success: false, message: 'Error processing request.' }, { status: 500 });
    }
  }),
];
