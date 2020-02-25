import React from 'react'

const ModalDelete = ({ user, deleteUser }) => {
  return (
    <div>
      <div class='navbar-fixed'>
        <nav class="no-padding-left nav-noclor">
          <div class="nav-wrapper">
            aa
          </div>
        </nav>
      </div>
      <div id="modal3" className="modal modal-fixed-footer">
        <div className="modal-content">
          <h4>ลบบัญชีผู้ใช้</h4>
          <h5>คุณแน่ใจที่จะลบ  { user.firstname } { user.lastname } :หรือไม่</h5>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect left pink btn" onClick={ () => deleteUser(user.user_id) }>Delete</a>
          <a href="#!" className="modal-close waves-effect grey lighten-2 btn black-text right">close</a>
        </div>
      </div>
     
    </div>
  )
}

export default ModalDelete
