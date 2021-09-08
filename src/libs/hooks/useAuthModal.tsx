import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useState } from "react";
import { handleSignIn } from "src/libs/functions/handleSignIn";

// 認証モーダルの開閉
export const useAuthModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsOpenModal(true);
  }, []);
  const handleCloseModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  // モーダルの中身のボタンをクリックした時
  const handleClick = useCallback(async () => {
    await handleSignIn();
    handleCloseModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // コンポーネントを返す関数
  const renderModal = () => {
    return (
      <Transition appear show={isOpenModal} as={Fragment}>
        <Dialog as="div" className="overflow-y-auto fixed inset-0 z-10" onClose={handleCloseModal}>
          <div className="px-4 min-h-screen text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block overflow-hidden p-6 my-8 w-full max-w-md text-left align-middle bg-white rounded-2xl shadow-xl transition-all transform">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-center text-gray-900"
                >
                  Googleでログイン
                </Dialog.Title>

                <div className="mt-4">
                  <button
                    type="button"
                    className="block py-2 px-4 mx-auto text-sm font-medium text-blue-900 bg-blue-100 hover:bg-blue-200 rounded-md border border-transparent focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus:outline-none"
                    onClick={handleClick}
                  >
                    SignIn with Google
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return {
    handleOpenModal,
    renderModal,
  };
};
