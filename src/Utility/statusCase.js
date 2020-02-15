const statusNumCase = (type) => {
  switch (type) {
    case 'receive': return [1, 'Receive Date / วันที่รับเคส	']
    case 'contact_customer': return [2, 'Contact Customer Date / วันที่ติดต่อลูกค้า	']
    case 'account_closing': return [3, 'Account Closing Date / วันที่ปิดเล่ม	']
    case 'transfer_doc_received': return [4, 'Transfer Doc. Received / วันรับชุดโอน	']
    case 'transfer_doc_submitted': return [5, 'Transfer Doc. Submitted / วันยื่นชุดโอน	']
    case 'book_received': return [6, 'Book Received Date / วันที่ได้รับเล่ม	']
    case 'submit_book_transfer': return [, 'Submit Book Transfer Date / วันที่ส่งงานโอนทะเบียน']
    case 'car_check_up': return [8, 'Car Check-Up / วันตรวจสภาพรถ	']
    case 'book_transfer': return [9, 'Book Transfer Date / โอนเล่มทะเบียน	']
    case 'book_copy_received': return [10, 'Book Copy Received / รับสำเนาเล่ม	']
    case 'deposit_doc_to_new_bank': return [11, 'deposit_doc_to_new_bank / ส่งเอกสารเบิกเงินธนาคารใหม่	']
    case 'submit_book_deposit_return': return [12, 'Submit Book Deposit Return / ทำเรื่องเบิกมัดจำคืน']
    case 'book_received_back': return [13, 'Book Received/ รับเล่มคืน	']
    case 'cash_received': return [14, 'Cash Received / เงินเข้าบัญชีคาร์ทรัส	']
    case 'book_deposit_received': return [15, 'Book Deposit Received/ เงินมัดจำคืนเข้าบัญชี']
    case 'submit_book_to_new_finance': return [16, 'Submit Book to New Finance / ส่งเล่มให้ไฟแนนซ์ใหม่']
    default: return;
  }

}
const statusCase = (type) => {
  switch (type) {
    case 0: return 'Receive Date / วันที่รับเคส	'
    case 1: return 'Contact Customer Date / วันที่ติดต่อลูกค้า	'
    case 2: return 'Account Closing Date / วันที่ปิดเล่ม	'
    case 3: return 'Transfer Doc. Received / วันรับชุดโอน	'
    case 4: return 'Transfer Doc. Submitted / วันยื่นชุดโอน	'
    case 5: return 'Book Received Date / วันที่ได้รับเล่ม	'
    case 6: return 'Submit Book Transfer Date / วันที่ส่งงานโอนทะเบียน'
    case 7: return 'Car Check-Up / วันตรวจสภาพรถ	'
    case 8: return 'Book Transfer Date / โอนเล่มทะเบียน	'
    case 9: return 'Book Copy Received / รับสำเนาเล่ม	'
    case 10: return 'deposit_doc_to_new_bank / ส่งเอกสารเบิกเงินธนาคารใหม่	'
    case 11: return 'Submit Book Deposit Return / ทำเรื่องเบิกมัดจำคืน'
    case 12: return 'Book Received/ รับเล่มคืน	'
    case 13: return 'Cash Received / เงินเข้าบัญชีคาร์ทรัส	'
    case 14: return 'Book Deposit Received/ เงินมัดจำคืนเข้าบัญชี'
    case 15: return 'Submit Book to New Finance / ส่งเล่มให้ไฟแนนซ์ใหม่'

    default: return;
  }

}

const statusTacking = (type) => {
  switch (type) {
    case 0: return 'receive'
    case 1: return 'contact_customer'
    case 2: return 'account_closing'
    case 3: return 'transfer_doc_received'
    case 4: return 'transfer_doc_submitted'
    case 5: return 'book_received'
    case 6: return 'submit_book_transfer'
    case 7: return 'car_check_up'
    case 8: return 'book_transfer'
    case 9: return 'book_copy_received'
    case 10: return 'deposit_doc_to_new_bank'
    case 11: return 'submit_book_deposit_return'
    case 12: return 'book_received_back'
    case 13: return 'cash_received'
    case 14: return 'book_deposit_received'
    case 15: return 'submit_book_to_new_finance'
    default: return;

  }
}

const initailACase = {
  F2_picture: '',
  account_closing_date: '',
  account_closing_id: '',
  account_closing_note: '',
  approve_amount: '',
  book_copy_received_date: '',
  book_copy_received_id: '',
  book_copy_received_note: '',
  book_deposit_received_date: '',
  book_deposit_received_id: '',
  book_deposit_received_note: '',
  book_received_back_date: '',
  book_received_back_id: '',
  book_received_back_note: '',
  book_received_date: '',
  book_received_id: '',
  book_received_note: '',
  book_transfer_date: '',
  book_transfer_id: '',
  book_transfer_note: '',
  car: "",
  car_check_up_date: '',
  car_check_up_id: '',
  car_check_up_note: '',
  car_license: "",
  car_license_book_picture: '',
  case_id: "",
  case_receiver: "",
  case_source: "",
  case_type: "",
  cash_received_date: '',
  cash_received_id: '',
  cash_received_note: '',
  contact_customer_date: '',
  contact_customer_id: '',
  contact_customer_note: '',
  contact_user_id: "",
  contract_officer: "",
  customer_id: "",
  date_create: "",
  date_update: "",
  deposit_doc_to_new_bank_date: '',
  deposit_doc_to_new_bank_id: '',
  deposit_doc_to_new_bank_note: '',
  document_id: "",
  finance_staff: "",
  id: "",
  job_id: "",
  name: "",
  new_bank: "",
  note_status: "",
  old_bank: "",
  old_finance: "",
  province: "",
  receive_date: "",
  receive_id: "",
  receive_note: "",
  status: "",
  submit_book_deposit_return_date: '',
  submit_book_deposit_return_id: '',
  submit_book_deposit_return_note: '',
  submit_book_to_new_finance_date: '',
  submit_book_to_new_finance_id: '',
  submit_book_to_new_finance_note: '',
  submit_book_transfer_date: '',
  submit_book_transfer_id: '',
  submit_book_transfer_note: '',
  take_car_picture: '',
  team: "",
  transfer_doc_received_date: '',
  transfer_doc_received_id: '',
  transfer_doc_received_note: '',
  transfer_doc_submitted_date: '',
  transfer_doc_submitted_id: '',
  transfer_doc_submitted_note: '',
  user_id: ""
}

export { statusNumCase, statusCase, statusTacking, initailACase }