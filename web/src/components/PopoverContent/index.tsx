import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../../global/configs/axios';
import { useHabits } from '../../store/habits';

interface IPopoverContentProps {
  date: Date;
}

interface IPossibleHabitsProps {
  id: string;
  title: string;
  createdAd: string;
}

type IRequestDataProps = {
  completedHabits: string[];
  possibleHabits: IPossibleHabitsProps[];
};

export function HabitsList(props: IPopoverContentProps) {
  const { date } = props;
  const [habits, setHabits] = useState<IRequestDataProps>(
    {} as IRequestDataProps
  );
  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());
  const { requestHabits } = useHabits((store) => store);

  useEffect(() => {
    requestSummaryHabitFromDay();
  }, []);

  async function requestSummaryHabitFromDay() {
    try {
      const { data } = await api.get<IRequestDataProps>('/day', {
        params: {
          date,
        },
      });

      setHabits(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleToggleHabit(id: string) {
    try {
      await api.patch(`/habits/${id}/toggle`);
      const isHabitAlreadyCompleted = habits.completedHabits.includes(id);

      if (isHabitAlreadyCompleted) {
        setHabits((prev) => ({
          ...prev,
          completedHabits: prev.completedHabits.filter(
            (completed) => completed !== id
          ),
        }));
      }
      if (!isHabitAlreadyCompleted) {
        setHabits((prev) => ({
          ...prev,
          completedHabits: [...prev.completedHabits, id],
        }));
      }
      await requestHabits();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <ul className='flex flex-col gap-3 mt-4 w-full'>
      {habits.possibleHabits?.map(({ id, title }) => (
        <li key={id} className='flex items-center gap-3'>
          <CheckboxPrimitive.Root
            defaultChecked={habits?.completedHabits?.includes(id)}
            onCheckedChange={() => handleToggleHabit(id)}
            className='group disabled:cursor-not-allowed flex items-center gap-3'
            disabled={isDateInPast}
          >
            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 overflow-hidden gap-2 group-data'>
              <CheckboxPrimitive.Indicator className='h-full w-full bg-green-500 flex items-center justify-center'>
                <Check size={20} className='text-white' weight='bold' />
              </CheckboxPrimitive.Indicator>
            </div>
            <span className='font-semibold text-xl text-white leading-light group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
              {title}
            </span>
          </CheckboxPrimitive.Root>
        </li>
      ))}
    </ul>
  );
}
