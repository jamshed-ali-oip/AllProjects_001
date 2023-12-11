import { useContext, useMemo } from 'react'
import { DrawerContext } from 'src/@core/context/DrawerContext'

const useToggleDrawer = () => {
  const { serviceId, toggleDrawer, isDrawerOpen, toggleModal, isModalOpen, toggleView, view, drawerType } = useContext(DrawerContext)

  const handleDrawer = (id: string | null, type?: string) => toggleDrawer(id, type)

  const handleModal = (id: string | null) => toggleModal(id)

  // useEffect(() => {
  //   if (!isDrawerOpen) {
  //     setServiceId(null);
  //   }
  // }, [isDrawerOpen]);
  // useMemo(() => {
  // }, [serviceId, isDrawerOpen, isModalOpen])

  return {
    serviceId,
    isDrawerOpen,
    isModalOpen,
    handleDrawer,
    handleModal,
    view,
    drawerType,
    toggleView
  }
}

export default useToggleDrawer
