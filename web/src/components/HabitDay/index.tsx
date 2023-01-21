import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import clsx from 'clsx';

import { ProgressBar } from '../ProgressBar';
import { Check } from 'phosphor-react';

interface IHabitDayProps {
  completed: number;
  amount: number;
}

export function HabitDay(props: IHabitDayProps) {
  const { amount, completed } = props;

  const completedPercentage = Math.round((completed / amount) * 100);

  return (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger
        className={clsx('w-10 h-10  rounded-lg', {
          'bg-zinc-900 border-zinc-800': completedPercentage === 0,
          'bg-violet-900 border-violet-700':
            completedPercentage > 0 && completedPercentage < 20,
          'bg-violet-800 border-violet-600':
            completedPercentage >= 20 && completedPercentage < 40,
          'bg-violet-700 border-violet-400':
            completedPercentage >= 40 && completedPercentage < 60,
          'bg-violet-600 border-violet-500':
            completedPercentage >= 60 && completedPercentage < 80,
          'bg-violet-500 border-violet-400': completedPercentage >= 80,
        })}
      />

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col '>
          <span className='font-semibold text-zinc-400'>Segunda-feira</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>
            23/01
          </span>

          <ProgressBar progress={completedPercentage} />

          <CheckboxPrimitive.Root className='flex items-center gap-3'>
            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 overflow-hidden gap-2'>
              <CheckboxPrimitive.Indicator className='h-full w-full bg-green-500 flex items-center justify-center'>
                <Check size={20} className='text-white' weight='bold' />
              </CheckboxPrimitive.Indicator>
            </div>
            <span className='font-semibold text-xl text-white leading-light'>
              Beber 2L de água
            </span>
          </CheckboxPrimitive.Root>

          <PopoverPrimitive.Arrow
            height={8}
            width={16}
            className='fill-zinc-900'
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
