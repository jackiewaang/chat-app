
const Homepage = () => {

  return (
    <>
    <div className="bg-fixed bg-cover h-screen">
        <nav className="bg-white shadow-md fixed w-full z-10">
          <div className="flex justify-center md:justify-between items-center p-4">
            <h1 className="text-3xl font-bold">DotChat</h1>
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-700 hover:text-black">About</a>
              <a href="#preview" className="text-gray-700 hover:text-black">Help Center</a>
              <a href="#signup" className="text-gray-700 hover:text-black">Apps</a>
            </div>
            <div className="hidden md:flex gap-3">
              <a href="/login" className="border border-black hover:bg-black hover:text-white py-2 px-4 rounded-lg transition duration-300">Log In</a>
              <a href="/signup" className="bg-black text-white hover:bg-gray-700 py-2 px-4 rounded-lg transition duration-300">Sign Up</a>
            </div>
          </div>
        </nav>
        </div>
    </>
  )
}

export default Homepage
