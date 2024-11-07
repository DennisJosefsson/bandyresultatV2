import searchhelp from '@/assets/markdown/searchhelp.md'
import Markdown from 'react-markdown'

const SearchHelp = () => {
  return (
    <>
      <div className="p-5 font-inter text-foreground">
        <article className="prose prose-xs sm:prose-sm md:prose-base text-foreground dark:prose-invert">
          <Markdown>{searchhelp}</Markdown>
        </article>
      </div>
    </>
  )
}

export default SearchHelp
