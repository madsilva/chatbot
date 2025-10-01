import { authClient } from '../../utils/auth-client'
import { useNavigate } from 'react-router'
import { Button } from "@/components/ui/button"

export function LogOutButton() {
  const navigate = useNavigate()
  
  const handleLogOut = async () => {
    await authClient.signOut()
    navigate('/')
  }

  return (
    <Button onClick={handleLogOut}>Log out</Button>
  )
}