import { SelectItem } from '@/components/ui/select'
import { ListChildComponentProps } from 'react-window'

type Item = {
  value: number
  label: string
}

const RenderItem = ({
  index,
  style,
  data,
}: ListChildComponentProps<Item[]>) => (
  <SelectItem
    value={data[index].value.toString()}
    key={data[index].value}
    style={{
      ...style,
    }}
  >
    {data[index].label}
  </SelectItem>
)

export default RenderItem
