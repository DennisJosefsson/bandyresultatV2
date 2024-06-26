import { useState } from 'react'
import Errors from './Errors'
import Seasons from './Seasons'
import NewSeason from './NewSeason'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import useGenderContext from '@/lib/hooks/contextHooks/useGenderContext'
import { TabBarDivided } from '../Common/TabBar'
import TeamForm from './TeamForm'

const Dashboard = () => {
  const [tab, setTab] = useState<string>('error')

  const { women, dispatch } = useGenderContext()

  const dashboardTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          dispatch({ type: 'TOGGLE' })
        }}
      >
        {women ? 'Herrar' : 'Damer'}
      </Button>
    ),
    tabBarArray: [
      {
        tab: (
          <Button
            variant={tab === 'error' ? 'default' : 'outline'}
            onClick={() => {
              setTab('error')
            }}
          >
            Error
          </Button>
        ),

        tabName: 'error',
      },
      {
        tab: (
          <Button
            variant={tab === 'addteams' ? 'default' : 'outline'}
            onClick={() => {
              setTab('addteams')
            }}
          >
            Nytt lag
          </Button>
        ),
        tabName: 'addteams',
        conditional: true,
      },
      {
        tab: (
          <Button
            variant={tab === 'seasons' ? 'default' : 'outline'}
            onClick={() => {
              setTab('seasons')
            }}
          >
            Säsonger
          </Button>
        ),
        tabName: 'seasons',
      },
      {
        tab: (
          <Button
            variant={tab === 'newSeason' ? 'default' : 'outline'}
            onClick={() => {
              setTab('newSeason')
            }}
          >
            Ny säsong
          </Button>
        ),
        tabName: 'newSeason',
      },
    ],
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl font-inter text-foreground">
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>Dashboard {women ? 'Damer' : 'Herrar'}</CardTitle>
        </CardHeader>
        <CardContent>
          <TabBarDivided tabBarObject={dashboardTabBarObject} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="justify-self-center">
            {tab === 'error' && <Errors />}

            {tab === 'seasons' && <Seasons />}

            {tab === 'addteams' && (
              <>
                <TeamForm />
              </>
            )}
            {tab === 'newSeason' && <NewSeason />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
