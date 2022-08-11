import UserForm from '../../components/UserForm'
import useUser from '../../hooks/useUser'

export default function LoginPage () {
  const { login } = useUser()
  return <UserForm submit={login}></UserForm>
}
