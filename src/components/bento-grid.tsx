import clsx from 'clsx';

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ',
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  owner,
  header,
  tags,
  onClick,
}: {
  className?: string;
  title?: string | React.ReactNode;
  owner?: {
    name: string;
    photo: string;
  };
  header?: string;
  tags?: string[];
  onClick?: () => void;
}) => {
  return (
    <div
      className={clsx(
        'row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4',
        className
      )}
      onClick={onClick}
    >
      {header && <img src={header} className='h-72 w-full object-cover' />}
      <div className='transition duration-200'>
        {tags && (
          <div className='flex gap-3 justify-center'>
            {tags.map((item, id) => (
              <span
                key={id}
                className='text-sm border border-white border-opacity-20 px-4 py-1 rounded-full'
              >
                {item}
              </span>
            ))}
          </div>
        )}
        <div className='font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2 truncate'>
          {title}
        </div>
        {owner && (
          <div className='font-sans font-normal text-neutral-600 text-base dark:text-neutral-300 flex items-center gap-2 mt-8'>
            <div className='w-6 h-6 rounded-full overflow-hidden'>
              <img src={owner.photo} className='w-full h-full object-cover' />
            </div>
            {owner.name}
          </div>
        )}
      </div>
    </div>
  );
};
