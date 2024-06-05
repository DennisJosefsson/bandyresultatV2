import { Dispatch, SetStateAction, useState } from 'react'

import SearchButtons from './SearchButtons'
import SearchForms from './SearchForms'
import { UseFormReturn } from 'react-hook-form'
import { SearchParamsObject } from '@/lib/types/games/search'

type SearchFormComponentProps = {
  setSearchParams: Dispatch<SetStateAction<SearchParamsObject | null>>
  isSearchResultSuccess: boolean
  searchLink: string
  methods: UseFormReturn<SearchParamsObject>
}

const SearchFormComponent = ({
  setSearchParams,
  isSearchResultSuccess,
  searchLink,
  methods,
}: SearchFormComponentProps) => {
  const [openAccordion, setOpenAccordion] = useState('')

  const onSubmit = (data: SearchParamsObject) => setSearchParams(data)
  const submitAndCollapse = () => {
    methods.handleSubmit(onSubmit)
  }
  return (
    <>
      <SearchButtons
        collapse={submitAndCollapse}
        isSearchResultSuccess={isSearchResultSuccess}
        searchLink={searchLink}
        methods={methods}
      />
      <SearchForms
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
      />
    </>
  )
}

export default SearchFormComponent
