import React, { createContext, useState } from 'react'
export const LinkDataContext = createContext()
const LinkDataProvider = ({children}) => {
const [linkData, setLinkData] = useState('');

    return (
    <LinkDataContext.Provider value={{linkData, setLinkData}}>{children}</LinkDataContext.Provider>
  )
}

export default LinkDataProvider