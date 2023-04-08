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


// FAVORITE STORE

interface FavoriteStoreInterface {
    favorites: Contact[]
    addFavorite: (contact: Contact) => void
    removeFavorite: (contact: Contact) => void

}

export const FavoriteStore = create<FavoriteStoreInterface>(set => ({
    favorites: [],
    addFavorite: (contact) => set((state) => ({ favorites: [...state.favorites, contact] })),
    removeFavorite: (contact) => set((state) => ({ favorites: state.favorites.filter(favorite => favorite.id !== contact.id) }))
}))