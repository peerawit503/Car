import React, { useState, useEffect } from 'react'

const SearchCase = ({ }) => {
  const [text, setText] = useState('')

  useEffect(() => {
    if (text === '') {
      getAllCustomers()

    }
    if (text !== "") {
      searchCustomer(text)

    }
    // eslint-disable-next-line
  }, [text])

  const handlerChangeSearch = (e) => {
    setText(e.target.value)
    searchCustomer(text)
  }
  const clearText = () => {
    setText('')
    getAllCustomers()
  }

  return (

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

          <label htmlFor="Search Customers">Search Customers</label>

        </div>
        <button className="btn waves-effect waves-light pink right " onClick={ clearText }>Clear search
            <i className="material-icons right">delete_sweep</i>
        </button>
      </form>
    </div>


  )
}

export default SearchCase
