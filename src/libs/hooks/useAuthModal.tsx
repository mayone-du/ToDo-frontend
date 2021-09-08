import { Dialog, Transition } from "@headlessui/react";
import { useCallback, useState } from "react";
import { FcGoogle } from "react-icons/fc";
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
      <Transition appear show={isOpenModal} as="div">
        <Dialog
          as="div"
          className="overflow-y-auto fixed inset-0 z-10 bg-gray-400 bg-opacity-40"
          onClose={handleCloseModal}
        >
          <div className="flex justify-center items-center px-4 min-h-screen text-center">
            <Transition.Child
              as="div"
              enter="ease-out duration-50"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as="div"
              enter="ease-out duration-100"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="overflow-hidden p-6 m-auto w-96 bg-white rounded-lg shadow-xl transition-all transform">
                <Dialog.Title as="h3" className="text-2xl font-bold text-center text-gray-900">
                  TODO App
                </Dialog.Title>

                <div className="mt-4">
                  <button
                    type="button"
                    className="flex items-center py-2 px-4 mx-auto bg-blue-50 hover:bg-blue-100 rounded border border-blue-200 focus-visible:ring-2 active:ring-2 ring-blue-200 focus-visible:ring-blue-500 focus-visible:ring-offset-2 shadow-sm focus:outline-none"
                    onClick={handleClick}
                  >
                    <FcGoogle className="w-6 h-6" />
                    <span className="mx-4 font-bold">SignIn with Google</span>
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
