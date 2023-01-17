import { useId } from 'react';
import { Check } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';

interface ISelectDayProps {
  day: string;
  onSelect: () => void;
}

export function SelectDay(props: ISelectDayProps) {
  const { day, onSelect } = props;
  const inputId = useId();

  return (
    <li className='flex gap-4'>
      <div className=' rounded-lg'>
        <Checkbox.Root className='w-6 h-6 rounded-lg flex items-center justify-center border border-zinc-700 overflow-hidden'>
          <Checkbox.Indicator className='w-[100%] h-[100%] flex items-center justify-center bg-green-500'>
            <Check size={20} weight='bold' />
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <label htmlFor={inputId}>{day}</label>
    </li>
  );
}
