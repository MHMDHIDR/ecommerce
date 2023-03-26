export const LoadingPage = () => (
  <div
    className='fixed inset-0 flex items-center justify-center w-screen h-screen bg-blue-100 dark:bg-blue-900 z-[100000]
    [--hue:223]
    [--bg:hsl(var(--hue),_10%,_90%)]
    [--fg:hsl(var(--hue),_10%,_10%)]
    [--primary:hsl(var(--hue),_90%,_55%)] dark:[--primary:hsl(var(--hue),_50%,_75%)]
    [--trans-dur:0.3s]
  '
  >
    <svg
      className='block mx-auto my-6 w-32 h-32 absolute animate-[slide_5s_linear_infinite]'
      role='img'
      aria-label='Shopping cart line animation'
      viewBox='0 0 128 128'
      width='128px'
      height='128px'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='8'>
        <g stroke='hsla(0,10%,10%,0.1)'>
          <polyline points='4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80' />
          <circle cx='43' cy='111' r='13' />
          <circle cx='102' cy='111' r='13' />
        </g>
        <g
          className='stroke-[var(--primary)] animate-[cartLines_2s_ease-in-out_infinite]'
          stroke='currentColor'
        >
          <polyline
            className='stroke-[var(--primary)] animate-[cartTop_2s_ease-in-out_infinite]'
            points='4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80'
            strokeDasharray='338 338'
            strokeDashoffset='-338'
          />
          <g
            className='animate-[cartWheel1_2s_ease-in-out_infinite] rotate-[-0.25turn] origin-[43px_111px]'
            transform='rotate(-90,43,111)'
          >
            <circle
              className='animate-[cartWheelStroke_2s_ease-in-out_infinite]'
              cx='43'
              cy='111'
              r='13'
              strokeDasharray='81.68 81.68'
              strokeDashoffset='81.68'
            />
          </g>
          <g
            className='animate-[cartWheel2_2s_ease-in-out_infinite] rotate-[0.25turn] origin-[102px_111px]'
            transform='rotate(90,102,111)'
          >
            <circle
              className='animate-[cartWheelStroke_2s_ease-in-out_infinite]'
              cx='102'
              cy='111'
              r='13'
              strokeDasharray='81.68 81.68'
              strokeDashoffset='81.68'
            />
          </g>
        </g>
      </g>
    </svg>
  </div>
)

export const LoadingSpinner = ({
  color = 'blue',
  size = '6',
  title = 'جار العمل...'
}: {
  color?: string
  size?: string
  title?: string
}) => (
  <svg
    className={`fill-${color} animate-spin h-${size} w-${size} inline-block`}
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <title>{title}</title>
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    ></circle>
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    ></path>
  </svg>
)

export const LoadingCard = () => (
  <div className='grid items-center w-4/5 p-2 mx-auto rounded-lg shadow-xl bg-neutral-400 h-fit dark:bg-white sm:grid-cols-2 opacity-60 dark:opacity-80'>
    <div className='w-48 h-48 mx-auto mt-4 rounded-md rounded-bl-lg bg-neutral-100 animate-pulse sm:mt-0 sm:mx-0'></div>
    <div className='p-5 mr-0 sm:-mr-10 md:-mr-20 lg:-mr-40 xl:-mr-60 2xl:-mr-[22rem]'>
      <h3 className='my-2 font-bold text-center select-none ltr'>
        <LoadingSpinner title='' />
        &nbsp; Loading Items...
      </h3>
      <div className='h-6 mb-4 rounded-sm bg-neutral-100 animate-pulse'></div>
      <div className='grid grid-cols-4 gap-4'>
        <div className='h-4 col-span-3 rounded-sm bg-neutral-100 animate-pulse'></div>
        <div className='h-4 rounded-sm bg-neutral-100 animate-pulse'></div>

        <div className='h-4 col-span-2 rounded-sm bg-neutral-100 animate-pulse'></div>
        <div className='h-4 col-span-2 rounded-sm bg-neutral-100 animate-pulse'></div>

        <div className='h-4 rounded-sm bg-neutral-100 animate-pulse'></div>
        <div className='h-4 col-span-3 rounded-sm bg-neutral-100 animate-pulse'></div>
        <div className='h-4 col-span-2 rounded-sm bg-neutral-100 animate-pulse'></div>
        <div className='h-4 rounded-sm bg-neutral-100 animate-pulse'></div>
      </div>
    </div>
  </div>
)
