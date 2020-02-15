import React from 'react'

const ModalDeleteCase = ({ singleCase, deleteCase }) => {

  return (
    <div id="modalDeleteCase" className="modal">
      <div className="modal-content">
        <h4>Delete Case</h4>
        <h6>คุณแน่ใจใหม จะลบ Case ID : ${ singleCase.case_id }</h6>
      </div>
      <div className="modal-footer">
        <a href="#!" className="modal-close waves-effect waves-green white black-text btn ">close</a>
        <a href="#!" className=" modal-close waves-effect waves-green btn pink left" onClick={ () => deleteCase(singleCase.case_id) }>delete</a>
      </div>
    </div>
  )
}

export default ModalDeleteCase
