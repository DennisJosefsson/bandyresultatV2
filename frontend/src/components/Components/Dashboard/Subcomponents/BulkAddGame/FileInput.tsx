import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dispatch, SetStateAction } from 'react'

const gameArray = z.array(
  z.object({
    date: z.string(),
    home: z.string(),
    away: z.string(),
  })
)

type GameArrayType = z.infer<typeof gameArray>

const readJsonFile = (file: Blob) =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader()

    fileReader.onload = (event) => {
      if (event.target) {
        resolve(JSON.parse(event.target.result as string))
      }
    }

    fileReader.onerror = (error) => {
      console.log(error)
      reject(error)
    }
    fileReader.readAsText(file)
  })

//

const FileInput = ({
  setGamesList,
}: {
  setGamesList: Dispatch<SetStateAction<GameArrayType>>
}) => {
  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const parsedData = await readJsonFile(event.target.files[0])
      const gameData = gameArray.safeParse(parsedData)
      if (!gameData.success) {
        console.log('ERROR', gameData.error)
      } else {
        setGamesList(gameData.data)
      }
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Matchfil</Label>
      <Button asChild variant="outline">
        <Input
          id="picture"
          type="file"
          accept=".json,application/json"
          onChange={onChange}
        />
      </Button>
    </div>
  )
}

export default FileInput
