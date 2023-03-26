import { useState, createContext, useEffect, ReactNode } from 'react'
import { useAxios } from '@/hooks/useAxios'
import { SearchContextProps, SearchResultsProps } from '@/types'
import { removeSlug } from '@/utils/functions/slug'

export const SearchContext = createContext<SearchContextProps>({} as SearchContextProps)

const SearchContextProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('')
  const [searchResults, setRearchResults] = useState([''])
  const [category, setCategory] = useState('')
  const [searchFor, setSearchFor] = useState('items')

  const { error, loading, ...response } = useAxios({
    url: `/${searchFor}/0/0?category=${category}`
  })

  useEffect(() => {
    if (response.response !== null) {
      setRearchResults(
        response.response?.response?.filter(
          ({ itemName, itemCategories }: SearchResultsProps) =>
            removeSlug(itemName).includes(search) || itemCategories.includes(search)
        )
      )
    }
  }, [response.response, search])

  return (
    <SearchContext.Provider
      value={{
        setSearch,
        search,
        searchResults,
        setSearchFor,
        setCategory,
        loading,
        error
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider
