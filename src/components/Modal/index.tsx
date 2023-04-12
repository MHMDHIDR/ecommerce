import { Link } from 'react-router-dom'
import { Loading } from '../Icons/Status'
import { ModalProps } from '@/types'
import ThemeToggler from '../ThemeToggler'

const Modal = ({
  msg = ``,
  extraComponents,
  status = Loading,
  modalHidden = '',
  classes = msg.length > 500 ? 'text-justify' : 'text-center',
  redirectLink,
  redirectTime = 2500,
  btnName = '',
  btnLink = '/',
  onClick,
  ctaConfirmBtns = [],
  ctaSpecialBtns = [],
  fullscreen
}: ModalProps) => {
  if (redirectLink && redirectTime) {
    setTimeout(() => window.location.assign(redirectLink), redirectTime)
  }

  return (
    <section
      id='modal'
      className={`fixed inset-0 p-0 m-0 min-h-screen min-w-screen z-[10000] bg-gray-500${
        modalHidden.includes('hidden') ? ' hidden' : ''
      } flex items-center`}
    >
      <span className='hidden'>
        {/* hidden theme toggler because I don't want user to change theme inside a modal view */}
        <ThemeToggler />
      </span>
      <div className={fullscreen ? 'w-full' : 'container mx-auto'}>
        <div
          className={`p-6 mx-12 text-center text-black bg-gray-200 border border-gray-400 rounded-lg shadow-lg dark:bg-gray-700 dark:text-gray-300 dashed${
            fullscreen
              ? ' min-h-screen min-w-screen flex flex-col justify-center mx-[0_!important] rounded-none'
              : ''
          }`}
          aria-modal='true'
        >
          <div className='flex justify-center'>{status}</div>
          <pre className='py-8 leading-9 whitespace-pre-line' dir='auto'>
            <p className={classes}>{msg}</p>
          </pre>
          {extraComponents && extraComponents}
          {btnName && btnLink ? (
            <Link
              to={btnLink}
              className='inline-block px-10 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700 mx-auto'
              onClick={onClick}
            >
              {btnName}
            </Link>
          ) : ctaConfirmBtns ? (
            <button className='flex items-center justify-center w-full gap-6'>
              {ctaConfirmBtns.map((btn, key) => {
                const greenConditions = [
                  'تفعيل',
                  'موافق',
                  'متأكد',
                  'تأكيد',
                  'تحويل الى مدير',
                  'تحويل الى مستخدم'
                ]
                const redConditions = ['حظر', 'حذف', 'رفض']
                const pinkConditions = ['توصيل']
                const blueConditions = ['كاشير', 'طباعة', 'شحن']

                const confirmColor = redConditions.some(btnTxt => btn.includes(btnTxt))
                  ? 'red'
                  : blueConditions.some(btnTxt => btn.includes(btnTxt))
                  ? 'blue'
                  : greenConditions.some(btnTxt => btn.includes(btnTxt))
                  ? 'green'
                  : pinkConditions.some(btnTxt => btn.includes(btnTxt))
                  ? 'pink'
                  : 'neutral'
                return (
                  <span
                    key={key}
                    id={key === 0 ? 'confirm' : 'cancel'}
                    className={`${
                      key === 0
                        ? `bg-${confirmColor}-600 hover:bg-${confirmColor}-700 border-2 text-white py-1 px-5 rounded-md inline-block`
                        : 'underline-hover text-blue-700 dark:text-white'
                    }`}
                  >
                    {btn}
                  </span>
                )
              })}
            </button>
          ) : ctaSpecialBtns ? (
            <button>
              {ctaSpecialBtns.map((btn, idx) => (
                <span
                  key={idx}
                  className='inline-block px-5 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700'
                >
                  {btn}
                </span>
              ))}
            </button>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default Modal
