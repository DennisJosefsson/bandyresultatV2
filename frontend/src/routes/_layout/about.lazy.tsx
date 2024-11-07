import about from '@/assets/markdown/about.md'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import Markdown from 'react-markdown'

export const Route = createLazyFileRoute('/_layout/about')({
  component: About,
})

function About() {
  return (
    <div className="text-foreground w-full p-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Om det här projektet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            <p className="text-xs md:text-base">
              OBS! Lista över förändringar på sidan finns{' '}
              <Link
                from="/about"
                to="/about/changelog"
                search={(prev) => ({ ...prev })}
                className="underline"
              >
                här
              </Link>
              .
            </p>

            <article className="prose prose-xs sm:prose-sm md:prose-base text-foreground dark:prose-invert">
              <Markdown>{about}</Markdown>
            </article>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
