import React from 'react'
import { useSession } from './SessionContext'

const Test = () => {

    const session = useSession();

    console.log(session.user.id);

  return (
    <div>
      
    </div>
  )
}

export default Test
