import maratonhelp from '@/assets/markdown/maratonhelp.md'
import Markdown from 'react-markdown'

const MaratonHelp = () => {
  return (
    <>
      <div className="p-5 font-inter text-foreground">
        <article className="prose prose-xs sm:prose-sm md:prose-base text-foreground dark:prose-invert">
          <Markdown>{maratonhelp}</Markdown>
        </article>
      </div>
    </>
  )
}

export default MaratonHelp
