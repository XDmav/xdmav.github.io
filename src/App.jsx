import React from 'react';
import { HashRouter as Router, createHashRouter, RouterProvider } from 'react-router-dom';
import TodoPage from './pages/TodoPage';
import DndPage from './pages/DndPage';

const router = createHashRouter([
  {
    path: "/",
    element: <TodoPage />,
  },
  {
    path: "/dnd",
    element: <DndPage />,
  },
]);

function App() {
  return (
    <Router>
      <RouterProvider router={router} />
    </Router>
  );
}

export default App;