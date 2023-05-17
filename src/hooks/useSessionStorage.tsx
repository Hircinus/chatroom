import { useState, useEffect, SetStateAction } from "react";

const useSessionStorage = (name) => {
  const [value, setValue] = useState("")

  useEffect(() => {
    setValue(sessionStorage.getItem(name))
  }, [])

  return value
}

export default useSessionStorage