import SearchForms from './SearchForms'
import { useCopyToClipboard } from 'usehooks-ts'
import { Form, UseFormReturn } from 'react-hook-form'
import { Dispatch, SetStateAction, useState } from 'react'
import ResultComponent from './ResultComponent'
import { Button } from '@/components/ui/button'
import {
  useGetSearchTeams,
  defaultValues,
  useSearchResults,
} from '@/lib/hooks/dataHooks/search/useSearchForm'
import { SearchParamsObject } from '@/lib/types/games/search'
import { ErrorState } from '@/lib/hooks/dataHooks/search/useSearchForm'
import { FormComponent } from '../Common/ReactHookFormComponents/FormComponent'
import { useNavigate } from '@tanstack/react-router'
type SearchContentProps = {
  methods: UseFormReturn<SearchParamsObject>
  searchParams: SearchParamsObject | null
  setSearchParams: Dispatch<SetStateAction<SearchParamsObject | null>>
  setError: Dispatch<SetStateAction<ErrorState>>
  error: ErrorState
}

const SearchContent = ({
  methods,
  error,
  setError,
  searchParams,
  setSearchParams,
}: SearchContentProps) => {
  const navigate = useNavigate({ from: '/search' })
  const [openAccordion, setOpenAccordion] = useState<string>('')
  const [copiedText, copy] = useCopyToClipboard()
  const { teamSelection, opponentSelection } = useGetSearchTeams()
  const { searchResult, gameArray, searchLink, isSearchResultSuccess } =
    useSearchResults(searchParams, setError)

  const onSubmit = (data: SearchParamsObject) => setSearchParams(data)
  const submitAndCollapse = () => {
    methods.handleSubmit(onSubmit)
    setOpenAccordion('')
  }

  const formValues = methods.watch()

  const handleOnBlur = () => {
    if (methods.formState.isValid) {
      navigate({ search: formValues })
      setSearchParams(formValues)
    }
  }

  return (
    <div className="mx-1 mt-2 xl:mx-0">
      <div className="flex flex-row-reverse justify-between">
        <div className="flex max-h-[160px] flex-col gap-4">
          <div>
            <Button
              type="submit"
              form="search-form"
              onClick={() => submitAndCollapse()}
            >
              Skicka
            </Button>
          </div>
          <Button onClick={() => methods.reset(defaultValues)}>
            Nollställ
          </Button>
          {isSearchResultSuccess && (
            <Button onClick={() => copy(searchLink)}>
              {copiedText ? 'Kopierad!' : `Söklänk`}
            </Button>
          )}
        </div>
        <div className="ml-2 w-[70%] max-w-[800px] lg:ml-0 lg:w-full">
          <div>
            <Form {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                onBlur={handleOnBlur}
                id="search-form"
              >
                <div className="mb-2 grid grid-cols-1 gap-2 lg:grid-cols-2 lg:justify-between">
                  <div className="flex max-w-[24rem] flex-col lg:w-full">
                    <div>
                      <FormComponent methods={methods} name="team">
                        <FormComponent.Label>Välj lag</FormComponent.Label>
                        <FormComponent.Select
                          selectionArray={teamSelection}
                          placeholder="Välj"
                        />
                      </FormComponent>
                    </div>
                  </div>

                  <div className="flex max-w-[18rem] flex-col">
                    <div>
                      <FormComponent methods={methods} name="opponent">
                        <FormComponent.Label>Välj lag</FormComponent.Label>
                        <FormComponent.Select
                          selectionArray={opponentSelection}
                          placeholder="Välj"
                        />
                      </FormComponent>
                    </div>
                  </div>
                </div>
                <SearchForms
                  openAccordion={openAccordion}
                  setOpenAccordion={setOpenAccordion}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="ml-2 w-[18rem] max-w-[800px] lg:ml-0 lg:w-full">
        {error.error && (
          <div className="mb-2 rounded border-red-700 bg-background p-2 text-sm font-semibold text-red-700 md:text-base">
            {error.message}
          </div>
        )}
        {searchResult && searchResult.searchResult.length === 0 && (
          <div className="rounded bg-background p-2">
            <p className="">Din sökning gav inga träffar.</p>
          </div>
        )}
        {searchResult && <ResultComponent gameArray={gameArray} />}
      </div>
    </div>
  )
}

export default SearchContent
