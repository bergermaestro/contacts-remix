import create from 'zustand'

interface EditContactStore {
    isEdit: boolean
    toggleEdit: () => void
}

const useStore = create<EditContactStore>(set => ({
  isEdit: false,
  toggleEdit: () => set((state) => ({ isEdit: !state.isEdit }))
}))

export const useEditStore = useStore;