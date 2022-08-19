import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'

export default function MyModal({ modalTitle, modalBody, modalFooter } : { modalTitle: string, modalBody: JSX.Element, modalFooter: JSX.Element }) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
        <button
          onClick={openModal}
          className="my-12 py-2 px-4 rounded-md bg-indigo-600 flex flex-row justify-between items-center w-full"
        >
          <span>New Contact</span>
          <BsPlusLg />
        </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-indigo-900 bg-opacity-60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-xl bg-white text-left align-middle transition-all">
                  <div className='flex items-center place-content-between p-6'>
                    <Dialog.Title
                      as="h3"
                      className="text-3xl font-bold leading-6 text-indigo-900"
                      >
                      { modalTitle }
                    </Dialog.Title>
                    <a className='cursor-pointer' onClick={closeModal}><IoClose className="text-gray-300" size={35}/></a>
                  </div>
                  <div className="border-t border-gray-200"/>
                  <div className="mt-2 p-6">
                    { modalBody }
                  </div>
                  <div className="border-t border-gray-200"/>
                  <div className="mt-2 p-6">
                    { modalFooter }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
