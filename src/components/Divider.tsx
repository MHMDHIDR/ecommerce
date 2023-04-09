const Divider = ({ children, className }: { children?: string; className?: string }) => (
  <div
    className={`flex relative justify-center items-center m-4 before:[background:linear-gradient(90deg,transparent,#555,transparent)] dark:before:[background:linear-gradient(90deg,transparent,#999,transparent)] before:absolute before:left-0 before:top-1/2 before:w-full before:h-px${
      className ? ' ' + className : ''
    }`}
  >
    {children ? (
      <span className='dark:text-neutral-200 bg-white dark:bg-gray-800 z-10 px-2'>
        {children}
      </span>
    ) : null}
  </div>
)
export default Divider
