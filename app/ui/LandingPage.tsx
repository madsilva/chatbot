import SignUp from './signup'
import SignIn from './signin'

export default function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex-col w-full max-w-md p-6 bg-white rounded-lg shadow">
        <SignIn />
        <SignUp />
      </div>
    </div>
  )
}