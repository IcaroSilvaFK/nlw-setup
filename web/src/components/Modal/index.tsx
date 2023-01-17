import { createPortal } from 'react-dom';
import { X, Check } from 'phosphor-react';
import { SelectDay } from '../SelectDay';

interface IModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
}

const DAYS_IN_WEEK = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export function Modal(props: IModalProps) {
  const { handleCloseModal, isOpen } = props;

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900/75 backdrop-blur-sm '>
      <div className='bg-zinc-900 max-w-md w-full px-9 py-10 rounded-lg shadow-md transition'>
        <header className='flex items-start justify-between mb-4'>
          <span className='font-extrabold text-3xl text-white'>
            Criar hábito
          </span>
          <button onClick={handleCloseModal}>
            <X size={22} className='text-zinc-400' />
          </button>
        </header>
        <div>
          <form action=''>
            <div className='flex flex-col gap-1'>
              <label htmlFor='' className='font-semibold text-white'>
                Qual seu compromentimento
              </label>
              <input
                type='text'
                placeholder='Exercícios,dormir bem, etc...'
                className='bg-zinc-800 text-zinc-400 rounded-lg p-2  border-none focus:outline-violet-500'
              />
            </div>
            <div className='mt-4'>
              <span className='font-semibold'>Qual a recorrência?</span>
              <ul className='flex flex-col gap-1 mt-4'>
                {DAYS_IN_WEEK.map((day) => (
                  <SelectDay
                    day={day}
                    key={day}
                    onSelect={() => console.log(day)}
                  />
                ))}
              </ul>
            </div>
            <button
              className='
              flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-600 transition
              w-full p-3 rounded-lg mt-3
              '
            >
              <Check size={20} />
              <span className='font-semibold'>Confirmar</span>
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
