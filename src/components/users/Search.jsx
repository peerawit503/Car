import React, { useState, useEffect } from 'react'

const Serch = ({ searchUser, getAllUsers }) => {
  const [text, setText] = useState("")

  useEffect(() => {
    if (text === '') getAllUsers()
    if (text !== '') searchUser()

    // eslint-disable-next-line
  }, [text])

  const handlerChangeSearch = (e) => {
    setText(e.target.value)
    searchUser(text)

  }

  const clearText = () => {
    setText("")
    getAllUsers()
  }


  return (
    <>
      <div className="row">
        <form  >
          <div className="input-field col s10 ">
            <i className="material-icons prefix">textsms</i>
            <input
              className=""
              type="text"
              name="serach"
              value={ text }
              onChange={ handlerChangeSearch }
            />

            <label htmlFor="Users">Users</label>

          </div>
          <button className="btn waves-effect waves-light pink right " onClick={ clearText }>Clear search
            <i className="material-icons right">delete_sweep</i>
          </button>
        </form>
      </div>
    </>
  )
}

export default Serch
