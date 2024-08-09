import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { CheckedState } from '@/components/ui/checkbox'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import MemoCategoryItem from './CategoryItem'

const initCategories = [
  'qualification',
  'regular',
  'eight',
  'quarter',
  'semi',
  'final',
]

const catValues = [
  { category: 'qualification', name: 'Kval' },
  { category: 'regular', name: 'Grundserie' },
  { category: 'eight', name: 'Åttondel' },
  { category: 'quarter', name: 'Kvart' },
  { category: 'semi', name: 'Semi' },
  { category: 'final', name: 'Final' },
]

const CategoryArray = () => {
  const categoryArray = useSearch({
    from: '/_layout/search',
    select: (search) => search.categoryArray,
  })
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryArray ?? initCategories
  )
  const navigate = useNavigate({ from: '/teams' })

  const onCheckedChange = useCallback(
    (checked: CheckedState, category: string) => {
      if (checked) {
        setSelectedCategories((prev) => [...prev, category])
        navigate({
          search: (prev) => {
            if (prev.categoryArray) {
              return {
                ...prev,
                categoryArray: [...prev.categoryArray, category],
              }
            } else {
              return { ...prev, categoryArray: initCategories }
            }
          },
        })
      } else {
        setSelectedCategories((prev) => prev.filter((cat) => cat !== category))
        navigate({
          search: (prev) => {
            if (prev.categoryArray && prev.categoryArray.includes(category)) {
              return {
                ...prev,
                categoryArray: [
                  ...prev.categoryArray.filter((cat) => cat !== category),
                ],
              }
            } else {
              return {
                ...prev,
                categoryArray: initCategories.filter((cat) => cat !== category),
              }
            }
          },
        })
      }
    },
    [navigate]
  )
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Matchkategorier</CardTitle>
          <CardDescription>Välj minst en kategori.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 lg:gap-x-12">
            {catValues.map((cat) => {
              return (
                <MemoCategoryItem
                  key={cat.category}
                  category={cat}
                  selectedCategories={selectedCategories}
                  onCheckedChange={onCheckedChange}
                />
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CategoryArray
