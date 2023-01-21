interface IProgressBarProps {
  progress: number;
}

export function ProgressBar(props: IProgressBarProps) {
  const { progress } = props;

  return (
    <div
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={progress}
      aria-valuetext={`${progress}%`}
      role='progressbar'
      data-state='loading'
      data-value={progress}
      data-max={100}
      className='h-3 rounded-xl bg-zinc-700 w-full mt-4'
      aria-label='Progresso de hábito completados nesse dia'
    >
      <div
        data-state='loading'
        data-value={progress}
        data-max={100}
        className='h-3 rounded-xl bg-violet-600'
        aria-label='Progresso de hábito completos'
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
