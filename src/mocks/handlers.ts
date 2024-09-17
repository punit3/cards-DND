import { http, HttpResponse } from 'msw';
import mockData from './app.mock';


const getDataFromStorage = () => {
  const storedData = localStorage.getItem('data');
  if (!storedData) {
    localStorage.setItem('data', JSON.stringify(mockData));
    return mockData;
  }
  return JSON.parse(storedData); 
};


const saveDataToStorage = (data: any[]) => {
  localStorage.setItem('data', JSON.stringify(data));
};

export const handlers = [
  
  
  http.get('/data', () => {
    const data = getDataFromStorage();
    
    return HttpResponse.json(data);
  }),

  
  http.post('/data/save', async ({ request }) => {
    try {
      
      const newData = await request.json();

     
      if (!Array.isArray(newData)) {
        return HttpResponse.json({ success: false, message: 'Invalid data format.' }, { status: 400 });
      }

     
      saveDataToStorage(newData);

     
      return HttpResponse.json({ success: true, message: 'Data saved successfully.' }, { status: 201 });
    } catch (error) {
      console.error('Error saving data:', error);

     
      return HttpResponse.json({ success: false, message: 'Error processing request.' }, { status: 500 });
    }
  }),
];
