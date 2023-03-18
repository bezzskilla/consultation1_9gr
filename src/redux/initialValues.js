export const getInitialValues = () => {
  const lc_store = localStorage.getItem('reduxState')

  if (lc_store) {
    return JSON.parse(lc_store)
  }

  return {
    user: initialUserState
  }
}

export const initialUserState = {
  token: '',
  name: "",
  about: "",
  avatar: "",
  _id: "",
  email: "",
  group: "",
  __v: 0
}

