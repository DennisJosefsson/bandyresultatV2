import SearchButtons from '@/components/Components/Search/SearchButtons'
import SearchForms from '@/components/Components/Search/SearchForms'
// import SearchTeamComponent from '@/components/Components/Search/SearchTeamComponent'
// import { Form } from '@/components/ui/form'
// import { useSearchForm } from '@/lib/hooks/dataHooks/search/useSearchForm'
// import { SearchParamsObject } from '@/lib/types/games/search'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
//import { SubmitHandler } from 'react-hook-form'

export const Route = createFileRoute('/_layout/search/')({
  component: SearchComponent,
})

function SearchComponent() {
  const [openAccordion, setOpenAccordion] = useState('')
  // const { methods } = useSearchForm()
  // const onSubmit: SubmitHandler<SearchParamsObject> = (data) =>
  //   console.log(data)

  // const formValues = methods.watch()

  // console.log(formValues)
  return (
    <div className="mx-1 mt-2 xl:mx-0">
      <div className="flex flex-row-reverse justify-between">
        <SearchButtons />
        <div className="ml-2 w-full">
          {/* <Form {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} id="search"> */}
          {/* <SearchTeamComponent /> */}
          <SearchForms
            openAccordion={openAccordion}
            setOpenAccordion={setOpenAccordion}
          />
          {/* </form>
          </Form> */}
        </div>
      </div>
    </div>
  )
}
