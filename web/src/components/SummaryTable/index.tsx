import { v4 as Uuid } from 'uuid';
import { generateRangeBetweenDates } from '../../utils/generate-range-from-year-beginning';
import { HabitDay } from '../HabitDay';

const daysOfWeek = [
  {
    shortDay: 'D',
    id: Uuid(),
  },
  {
    shortDay: 'S',
    id: Uuid(),
  },
  {
    shortDay: 'T',
    id: Uuid(),
  },
  {
    shortDay: 'Q',
    id: Uuid(),
  },
  {
    shortDay: 'Q',
    id: Uuid(),
  },
  {
    shortDay: 'S',
    id: Uuid(),
  },
  {
    shortDay: 'S',
    id: Uuid(),
  },
];

const summaryDates = generateRangeBetweenDates();

const minimumSummaryDateSize = 18 * 7;

const amountOfDaysToFill = minimumSummaryDateSize - summaryDates.length;

export function SummaryTable() {
  return (
    <div className='w-full flex'>
      <div className='grid grid-rows-7 grid-flow-row gap-3'>
        {daysOfWeek.map((day) => (
          <div
            className='text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center'
            key={day.id}
          >
            {day.shortDay}
          </div>
        ))}
      </div>
      <div className='grid grid-rows-7 grid-flow-col gap-3'>
        {summaryDates.map((date, index) => (
          <HabitDay
            key={`${date}-${index}`}
            amount={5}
            completed={Math.round(Math.random() * 5)}
          />
        ))}
        {!!amountOfDaysToFill &&
          Array.from({ length: amountOfDaysToFill }).map(() => (
            <div
              className='w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed'
              key={Uuid()}
            />
          ))}
      </div>
    </div>
  );
}
