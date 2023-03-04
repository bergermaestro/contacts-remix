import create from 'zustand'
import type {Contact} from "@prisma/client";

// CONTACT STORE

interface ContactStoreInterface {
    activeContact: Contact | {}
    setActiveContact: (contact: Contact | {}) => void
    isModalOpen: boolean
    toggleModal: () => void
}

export const ContactStore = create<ContactStoreInterface>(set => ({
    activeContact: {},
    setActiveContact: (contact) => set(() => ({ activeContact: contact })),
    isModalOpen: false,
    toggleModal: () => set((state) => ({ isModalOpen: !state.isModalOpen }))
}))