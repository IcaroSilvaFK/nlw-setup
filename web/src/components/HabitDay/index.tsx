import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';

import { ProgressBar } from '../ProgressBar';

import dayjs from 'dayjs';
import { HabitsList } from '../PopoverContent';

interface IHabitDayProps {
  completed?: number;
  amount?: number;
  date: Date;
}

export function HabitDay(props: IHabitDayProps) {
  const { amount = 0, completed = 0, date } = props;

  const completedPercentage =
    amount > 0 ? Math.round((completed / amount) * 100) : 0;
  const dayAnMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

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
          <span className='font-semibold text-zinc-400 uppercase'>
            {dayOfWeek}
          </span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>
            {dayAnMonth}
          </span>

          <ProgressBar progress={completedPercentage} />

          <HabitsList date={date} />

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
