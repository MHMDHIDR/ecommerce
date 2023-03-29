import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isSmallScreen } from '@/constants'
import { SearchContext } from '@/contexts/SearchContext'
import useEventListener from '@/hooks/useEventListener'
import { removeSlug } from '@/utils/slug'

const Search = ({
  small = isSmallScreen,
  className
}: {
  small?: boolean
  className?: string
}) => {
  const [smallSearch, setSmallSearch] = useState(small)
  // const { setSearch, search, searchResults } = useContext(SearchContext)
  const navigate = useNavigate()

  const searchWrapper = document.querySelector('.search__wrapper')

  useEventListener('click', (e: any) => {
    // when clicking outside search input
    if (e.target.id !== 'search') searchWrapper?.classList.remove('opacity-100')
  })

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    // navigate(`/search/${search}`)
  }

  return (
    <form
      method='post'
      className={`relative z-20 transition-all${smallSearch ? ' w-16' : ' w-full'}${
        className ? ' ' + className : ''
      }`}
      onSubmit={handleSearch}
    >
      <input
        type='search'
        id='search'
        className={`font-[600] px-5 py-3 bg-gray-200 dark:bg-gray-700 text-black dark:text-white outline-blue-400 border-blue-400 outline-offset-2 rtl rounded-full${
          smallSearch ? ' w-0 pl-10 hover:cursor-pointer' : ' w-[inherit] pl-16 sm:pl-28'
        }`}
        placeholder={smallSearch ? '' : 'ابحث عن منتج في المتجر'}
        // onChange={e => (e.target.value.trim() ? setSearch(e.target.value.trim()) : '')}
        onKeyUp={(e: any) => {
          const searchValue = e.target.value.trim()
          searchValue.length > 0
            ? searchWrapper?.classList.add('opacity-100', 'pointer-events-auto')
            : searchWrapper?.classList.remove('opacity-100', 'pointer-events-auto')
        }}
        disabled={smallSearch}
      />
      <button
        type={`button`} //todo: if search value length > 1 make it submit/ else button
        onClick={() => setSmallSearch(prev => !prev)}
        role='search'
        aria-label='search'
        title='search'
        className={`absolute top-0 bottom-0 flex items-center w-16${
          smallSearch ? ' justify-start -left-4' : ' justify-center left-0'
        }`}
      >
        <svg
          className='w-6'
          viewBox='0 0 40 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M39.5112 37.155L28.1363 25.78C30.3397 23.0584 31.6663 19.6 31.6663 15.8334C31.6663 7.10336 24.563 0 15.8331 0C7.1032 0 0 7.10328 0 15.8333C0 24.5633 7.10328 31.6666 15.8332 31.6666C19.5998 31.6666 23.0581 30.34 25.7797 28.1366L37.1546 39.5116C37.4796 39.8366 37.9062 40 38.3329 40C38.7597 40 39.1863 39.8366 39.5113 39.5116C40.1629 38.86 40.1629 37.8066 39.5112 37.155ZM15.8332 28.3333C8.9399 28.3333 3.33332 22.7266 3.33332 15.8333C3.33332 8.93992 8.9399 3.33328 15.8332 3.33328C22.7265 3.33328 28.333 8.93992 28.333 15.8333C28.333 22.7266 22.7264 28.3333 15.8332 28.3333Z'
            fill={
              document.querySelector('html')?.classList.contains('dark')
                ? 'white'
                : 'black'
            }
          />
        </svg>
      </button>

      <div className='absolute w-[inherit] bg-neutral-200 dark:bg-neutral-300 opacity-0 pointer-events-none search__wrapper rtl border-2 border-b-blue-400 border-r-blue-400 border-l-blue-400 hidden'>
        <ul className='overflow-y-auto rtl:text-right max-h-60'>
          {/* {search &&
            searchResults?.map(({ _id, itemName, itemImgs }, idx) => (
              <Link
                key={idx}
                to={`/view/item/${_id}`}
                className={`w-full flex px-4 py-2 justify-start items-center gap-x-5 transition-colors font-[600] text-blue-600 dark:text-blue-700 text-xl hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-neutral-400 border-b border-b-gray-300 dark:border-b-gray-400`}
              >
                <img
                  loading='lazy'
                  src={itemImgs[0].ImgDisplayPath}
                  alt={itemName}
                  className={`object-cover rounded-lg shadow-md w-14 h-14`}
                />
                <p>{removeSlug(itemName)}</p>
              </Link>
            ))} */}
        </ul>
      </div>
    </form>
  )
}

export default Search
