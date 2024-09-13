import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { DndList } from './components/DragandDrop/DragandDropList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DndList />,
  },

]);

export function Router() {
  return <RouterProvider router={router} />;
}
