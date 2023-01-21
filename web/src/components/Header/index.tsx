import { Plus } from 'phosphor-react';

interface IHeaderProps {
  handleOpenModal(): void;
}

export function Header(props: IHeaderProps) {
  const { handleOpenModal } = props;

  return (
    <header className='flex items-center justify-between w-[100%] max-w-3xl mx-auto'>
      <img src='/assets/logo.svg' alt='habits logo' />
      <button
        className='
    bg-transparent  border border-violet-500 flex items-center gap-3
    px-6 py-4 rounded-md hover:border-violet-300 transition focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background
  '
        onClick={handleOpenModal}
      >
        <Plus className='text-violet-500' size={20} />
        <span className='font-semibold'>Novo hábito</span>
      </button>
    </header>
  );
}
