import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_layout/team')({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
  notFoundComponent: () => <div>Testa att inte hitta lag</div>,
})
