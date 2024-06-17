import { useState } from 'react'

import SearchButtons from './SearchButtons'
import SearchForms from './SearchForms'

const SearchFormComponent = () => {
  const [openAccordion, setOpenAccordion] = useState('')

  return (
    <>
      <SearchButtons />
      <SearchForms
        openAccordion={openAccordion}
        setOpenAccordion={setOpenAccordion}
      />
    </>
  )
}

export default SearchFormComponent
