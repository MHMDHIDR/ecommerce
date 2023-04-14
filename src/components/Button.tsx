import { ButtonProps } from '@/types'

export const ClickableButton = ({ className, children }: ButtonProps) => {
  return (
    <button
      className={`min-w-[7rem] text-white py-1.5 px-6 mb-8 rounded-md shadow-[0_7px] hover:shadow-[0_5px] hover:translate-y-1 transition-all${
        className
          ? ' ' + className
          : ' bg-blue-500 hover:bg-blue-600 shadow-blue-600 hover:shadow-blue-800'
      }`}
    >
      {children}
    </button>
  )
}
