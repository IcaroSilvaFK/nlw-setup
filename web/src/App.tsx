import { Plus } from 'phosphor-react';
import { useState } from 'react';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { SummaryTable } from './components/SummaryTable';

export function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <main className='w-full max-w-5xl px-6 flex flex-col gap-16'>
        <Header handleOpenModal={handleOpenModal} />
        <SummaryTable />
      </main>
      <Modal isOpen={modalIsOpen} handleCloseModal={handleCloseModal} />
    </div>
  );
}
