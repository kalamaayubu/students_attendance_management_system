import NotificationPermission from "@/utils/notification/firebase/NotificationPermission"

const UsersLayout = ({ children  }) => {
  return (
    <>
        <NotificationPermission/>
        {children}
    </>
  )
}

export default UsersLayout