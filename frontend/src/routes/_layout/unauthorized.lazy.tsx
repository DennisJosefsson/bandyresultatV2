import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_layout/unauthorized')({
  component: () => (
    <div className="flex flex-row justify-center">
      Måste vara inloggad för att se sidan.
    </div>
  ),
})
