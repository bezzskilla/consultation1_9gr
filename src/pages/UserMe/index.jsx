import { useQuery } from "@tanstack/react-query"
import { getUserMe } from '../../api/user'
import { useAuth } from '../../hooks/useAuth'

export const UserMe = () => {
  const { token } = useAuth()

  const { data: userData, isLoading, isError, error } = useQuery({
    queryKey: ['getUserMe'],
    queryFn: async () => {
      const res = await getUserMe(token)

      if (res.ok) {
        return await res.json();
      }
    }
  })

  if (isLoading) return <p>Загрузка...</p>

  if (isError) return <p>Произошла ошибка: {error}</p>

  return (
    <div>
      <h1>User Info</h1>
      <p>ФИО: {userData.name}</p>
      <p>О себе: {userData.about}</p>
      <p>avatar: {userData.avatar}</p>
      <p>email: {userData.email}</p>
      <p>group: {userData.group}</p>
    </div>
  )
}
