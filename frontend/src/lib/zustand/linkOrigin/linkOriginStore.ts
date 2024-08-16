import { create } from 'zustand'

type Origin = { origin: string | null }

export const useOriginStore = create<Origin>()(() => ({
  origin: null,
}))

export const setOrigin = (origin: string) => useOriginStore.setState({ origin })
export const getOrigin = () => useOriginStore.getState()
export const resetOrigin = () => useOriginStore.setState({ origin: null })
