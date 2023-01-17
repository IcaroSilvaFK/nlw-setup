import { Habit } from './components/Habit';

export default function App() {
  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Habit completed={10} />
    </>
  );
}
