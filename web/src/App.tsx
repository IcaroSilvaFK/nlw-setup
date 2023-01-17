import { Plus } from 'phosphor-react';
import { useState } from 'react';
import { Modal } from './components/Modal';

export default function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  return (
    <div className='h-full w-full flex items-center justify-center'>
      <main className='w-[100%] max-w-4xl'>
        <header className='flex items-center justify-between w-[100%]'>
          <img src='/assets/logo.svg' alt='habits logo' />
          <button
            className='
          bg-transparent  border border-violet-500 flex items-center gap-2
          p-2 rounded-md
        '
            onClick={handleOpenModal}
          >
            <Plus className='text-violet-500' />
            <span className='font-semibold'>Novo hábito</span>
          </button>
        </header>
      </main>
      <Modal isOpen={modalIsOpen} handleCloseModal={handleCloseModal} />
    </div>
  );
}
