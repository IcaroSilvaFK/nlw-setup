interface IHabitProps {
  completed: number;
}

export function Habit(props: IHabitProps) {
  const { completed } = props;

  return <p className='text-xl text-zinc-700'>Habit {completed}</p>;
}
