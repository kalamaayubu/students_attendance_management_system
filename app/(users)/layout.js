import NotificationPermission from "@/utils/notification/NotificationPermission"

const UsersLayout = ({ children  }) => {
  return (
    <>
        <NotificationPermission/>
        {children}
    </>
  )
}

export default UsersLayout