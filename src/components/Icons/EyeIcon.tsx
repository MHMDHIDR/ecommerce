export const EyeIconOpen = ({ className }: { className?: string }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    enableBackground='new 0 0 512 512'
    viewBox='0 0 512 512'
    className={`dark:fill-white${className ? ' ' + className : ''}`}
  >
    <path
      d='M256,406c-30.6,0-62.2-7.6-94-22.5c-24.9-11.7-50-27.9-74.6-48.2C45.9,301,20.3,267,19.2,265.6
			c-4.3-5.7-4.3-13.5,0-19.2c1.1-1.4,26.7-35.4,68.2-69.7c24.6-20.3,49.7-36.5,74.6-48.2c31.8-14.9,63.4-22.5,94-22.5
			s62.2,7.6,94,22.5c24.9,11.7,50,27.9,74.6,48.2c41.5,34.3,67.2,68.3,68.2,69.7c4.3,5.7,4.3,13.5,0,19.2
			c-1.1,1.4-26.7,35.4-68.2,69.7c-24.6,20.3-49.7,36.5-74.6,48.2C318.2,398.4,286.6,406,256,406z M52.6,256
			c25.1,29.7,108,118,203.4,118c95.6,0,178.3-88.3,203.4-118c-25.1-29.7-108-118-203.4-118C160.4,138,77.7,226.3,52.6,256z'
    />
    <path
      d='M256,328c-39.7,0-72-32.3-72-72s32.3-72,72-72s72,32.3,72,72S295.7,328,256,328z M256,216
			c-22.1,0-40,17.9-40,40s17.9,40,40,40s40-17.9,40-40S278.1,216,256,216z'
    />
  </svg>
)

export const EyeIconClose = ({ className }: { className?: string }) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clipPath='url(#clip0_703_2)'>
      <path
        d='M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.6819 3.96914 7.65661 6.06 6.06M9.9 4.24C10.5883 4.07888 11.2931 3.99834 12 4C19 4 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19M14.12 14.12C13.8454 14.4147 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1962C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4859 9.58525 10.1546 9.88 9.88M1 1L23 23'
        stroke='black'
        strokeLinecap='round'
        strokeLinejoin='round'
        className={`dark:stroke-white${className ? ' ' + className : ''}`}
      />
    </g>
    <defs>
      <clipPath id='clip0_703_2'>
        <rect width='24' height='24' fill='white' />
      </clipPath>
    </defs>
  </svg>
)
