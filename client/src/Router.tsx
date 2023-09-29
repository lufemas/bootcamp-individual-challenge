import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import SendMessage from './pages/SendMessage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import SearchPage from './pages/SearchPage';
import DeletePage from './pages/DeletePage';
import QueuePage from './pages/QueuePage';

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddPage />} />
          {/* <Route path="/edit" element={<EditPage />} /> */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/fila-de-atendimento" element={<QueuePage />} />
          {/* <Route path="/consume-messages" element={<ListMessagesPage />} /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
