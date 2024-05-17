import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/about')({
  component: About,
})

function About() {
  return (
    <div className="w-20 text-wrap">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias voluptas
      magni natus enim similique obcaecati nam sunt et deserunt officia, a totam
      iusto corporis praesentium adipisci harum possimus id ullam?
    </div>
  )
}
