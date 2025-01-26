import { HERO_HEADING, HERO_SUBHEADING1, HERO_SUBHEADING2 } from "../constants"

const Homepage = () => {

  return (
    <>
    <div className="bg-gray-100 bg-[url(./assets/chatIcon.svg)] bg-repeat bg-center h-screen flex">
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
        <div className="w-full pt-20 flex justify-center items-center">
          <div className="border border-black rounded-lg bg-white shadow-lg p-10 flex flex-col justify-center items-center gap-5">
            <h1 className="text-6xl font-extrabold">{HERO_HEADING}</h1>
            <p className="text-xl">{HERO_SUBHEADING1}</p>
            <p className="text-xl">{HERO_SUBHEADING2}</p>
            <div className="flex items-center justify-center gap-5">
              <a href="/signup" className="text-lg border border-black hover:bg-black hover:text-white py-2 px-4 rounded-lg transition duration-300">Get Started</a>
              <a href="/features" className="text-lg bg-black text-white hover:bg-gray-700 py-2 px-4 rounded-lg transition duration-300">Learn More</a>
            </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default Homepage
