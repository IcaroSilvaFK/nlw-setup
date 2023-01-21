import { createPortal } from 'react-dom';
import { X, Check } from 'phosphor-react';
import { SelectDay } from '../SelectDay';
import { FormEvent, useEffect, useId, useState } from 'react';
import { api } from '../../global/configs/axios';

interface IModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
}

const DAYS_IN_WEEK = [
  {
    day: 'Domingo',
    value: 0,
  },
  {
    day: 'Segunda-feira',
    value: 1,
  },
  {
    day: 'Terça-feira',
    value: 2,
  },
  {
    day: 'Quarta-feira',
    value: 3,
  },
  {
    day: 'Quinta-feira',
    value: 4,
  },
  {
    day: 'Sexta-feira',
    value: 5,
  },
  {
    day: 'Sábado',
    value: 6,
  },
];

export function Modal(props: IModalProps) {
  const { handleCloseModal, isOpen } = props;

  const [title, setTitle] = useState('');
  const [daysSelected, setDaysSelected] = useState<number[]>([]);
  const titleId = useId();

  useEffect(() => {
    if (isOpen) {
      document.body.setAttribute('aria-hidden', 'true');
    }
    if (!isOpen) {
      document.body.removeAttribute('aria-hidden');
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await api.post('/habits', {
        title,
        weekDays: daysSelected,
      });
      setTitle('');
      setDaysSelected([]);
    } catch (err) {
      console.log(err);
    }
  }

  function handleAddOrRemoveDay(day: number) {
    const existsDayInArray = daysSelected.includes(day);

    if (existsDayInArray) {
      return setDaysSelected((prev) =>
        prev.filter((element) => element !== day)
      );
    }

    if (!existsDayInArray) {
      return setDaysSelected((prev) => [...prev, day]);
    }
  }

  return createPortal(
    <div
      className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900/75 backdrop-blur-sm'
      role='dialog'
      tabIndex={-1}
      data-state='open'
    >
      <div className='bg-zinc-900 max-w-md w-full px-9 py-10 rounded-lg shadow-md transition'>
        <header className='flex items-start justify-between mb-4'>
          <span className='font-extrabold text-3xl text-white'>
            Criar hábito
          </span>
          <button onClick={handleCloseModal} aria-label='Close' title='Fecha'>
            <X size={22} className='text-zinc-400' />
          </button>
        </header>
        <div>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
              <label htmlFor={titleId} className='font-semibold text-white'>
                Qual seu compromentimento
              </label>
              <input
                type='text'
                name='title'
                placeholder='Exercícios,dormir bem, etc...'
                className='bg-zinc-800 text-zinc-400 rounded-lg p-2  border-none focus:outline-violet-500 placeholder:text-zinc-400'
                id={titleId}
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className='mt-4'>
              <span className='font-semibold'>Qual a recorrência?</span>
              <ul className='flex flex-col gap-1 mt-4'>
                {DAYS_IN_WEEK.map(({ day, value }) => (
                  <SelectDay
                    day={day}
                    key={day}
                    onSelect={() => handleAddOrRemoveDay(value)}
                    checked={daysSelected.includes(value)}
                  />
                ))}
              </ul>
            </div>
            <button
              className='
              flex items-center justify-center gap-3 bg-green-600 text-white hover:bg-green-500 transition w-full p-4 rounded-lg mt-6'
              type='submit'
            >
              <Check size={20} weight='bold' />
              <span className='font-semibold'>Confirmar</span>
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.body
  );
}
