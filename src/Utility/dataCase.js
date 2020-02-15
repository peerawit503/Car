const caseStatus = [
  "ติดต่อลูกค้าไม่ได้",
  'ติดต่อลูกค้าได้',
  'รอเอกสาร',
  'ปิดสินเชื่อเดิม',
  'ยื่นชุดโอน',
  'รอรับชุดโอน',
  'รอรับเล่ม',
  'ส่งงานโอนทะเบียน',
  'ตรวจสภาพรถ',
  'โอนเล่มทะเบียน',
  'รับสำเนาเล่มจาก KM',
  'ส่งสำเนาเล่มเบิกมัดจำคืน',
  'ส่งสำเนาเล่มให้ Finance',
  'รับเล่มคืนจาก KM',
  'ส่งเล่มจริงให้ Finance',
  'ไฟแนนซ์โอนเงินให้ลูกค้า',
  'รอเงินเข้าบัญชี CT',
  'รอเงินมัดจำคืน',
  'Case Close / ปิด Job',
  'ลูกค้ายกเลิก'
]

const caseTypeAll = [
  "Refinance",
  "Buy - Sell / ซื้อขาย",
  "PAWN / จำนำเล่ม",
]

const caseSourceAll = [
  "Kiatnakin",
  'Thanachart',
  'Cartrust',
  'Dealer',
]


const paymentType = [
  "จ่ายเป็นเงินสด",
  'จ่ายเป็นเช็ค',
  'จ่ายมัดจำ',
]

const financeInstitution = [
  'Akanay Capital',
  'Amana Leasing',
  'Asla Sermkkij Leasing PLC.',
  'Ayudhya Capital Auto lease',
  'CIMB',
  'City Leasing',
  'Honda Leasing',
  'ICBC',
  'Kasikorn Leasing',
  'Kiatnakin',
  'Krungsri Auto',
  'KSM',
  'KTA - กรุงไทย ออโต้ลิส',
  'KTB Leasing',
  'MIDA Leasing',
  'Muangthai Capital',
  'Nawakij',
  'Nissan Leasing',
  'NNN Co., Ltd.',
  'PLV',
  'SCB Leasing',
  'Sinsurin Leasing',
  'SMM',
  'Star Money Co., Ltd.',
  'TANA leasing CO., Ltd.',
  'Thai Credit Retail Bank',
  'Thanachart Leasing',
  'Tisco',
  'Toyota Leasing',
  'Tripeth Isuzu Leasing',
  'พระนคร ยนตรการ',
  'ศรีสวัสดิ์',
  'สมหวัง เงินสั่งได้',
  'เอเชียนเสิมกิจ',
]

const provinceAll = [
  'กระบี่',
  'กรุงเทพมหานคร',
  'กาญจนบุรี',
  'กาฬสินธุ์',
  'กำแพงเพชร',
  'ขอนแก่น',
  'จันทบุรี',
  'ฉะเชิงเทรา',
  'ชลบุรี',
  'ชัยนาท',
  'ชัยภูมิ',
  'ชุมพร',
  'เชียงราย',
  'เชียงใหม่',
  'ตรัง',
  'ตราด',
  'ตาก',
  'นครนายก',
  'นครปฐม',
  'นครพนม',
  'นครราชสีมา',
  'นครศรีธรรมราช',
  'นครสวรรค์',
  'นนทบุรี',
  'นราธิวาส',
  'น่าน',
  'บึงกาฬ',
  'บุรีรัมย์',
  'ปทุมธานี',
  'ประจวบคีรีขันธ์',
  'ปราจีนบุรี',
  'ปัตตานี',
  'พระนครศรีอยุธยา',
  'พะเยา',
  'พังงา',
  'พัทลุง',
  'พิจิตร',
  'พิษณุโลก',
  'เพชรบุรี',
  'เพชรบูรณ์',
  'แพร่',
  'ภูเก็ต',
  'มหาสารคาม',
  'มุกดาหาร',
  'แม่ฮ่องสอน',
  'ยโสธร',
  'ยะลา',
  'ร้อยเอ็ด',
  'ระนอง',
  'ระยอง',
  'ราชบุรี',
  'ลพบุรี',
  'ลำปาง',
  'ลำพูน',
  'เลย',
  'ศรีสะเกษ',
  'สกลนคร',
  'สงขลา',
  'สตูล',
  'สมุทรปราการ',
  'สมุทรสงคราม',
  'สมุทรสาคร',
  'สระแก้ว',
  'สระบุรี',
  'สิงห์บุรี',
  'สุโขทัย',
  'สุพรรณบุรี',
  'สุราษฎร์ธานี',
  'สุรินทร์',
  'หนองคาย',
  'หนองบัวลำภู',
  'อ่างทอง',
  'อำนาจเจริญ',
  'อุดรธานี',
  'อุตรดิตถ์',
  'อุทัยธานี',
  'อุบลราชธานี',
]

const initialValueTracking = {
  tracking: "",
  note_status: "",
  date: "",
  user_id: "",
  F2_picture: "",
  take_car_picture: "",
  approve_amount: "",
  job_id: "",
  old_finance_closing_fee: "",
  old_finance_transfer_fee: "",
  book_closing_fee: "",
  vat7_fee: "",
  transfer_fee: "",
  duty_fee: "",
  discount_fee: "",
  car_shield_fee: "",
  car_insurance_fee: "",
  transfer_service_fee: "",
  contract_fee: "",
  outside_transfer_fee: "",
  tax_renewal_fee: "",
  act_renewal_fee: "",
  yes_no: "no",
  car_license_book_picture: "",
  close_amount: "",
}

const initialNewCase = {
  user_id: "",
  customer_id: "",
  document_id: "",
  old_bank: "",
  new_bank: "",
  status: "",
  note_status: "",
  team: "",
  contract_officer: "",
  finance_staff: "",
  case_type: "",
  case_receiver: "",
  case_source: "",
  job_id: "",
  down_amount: "",
  case_status: "",

  car_name: "",
  car_brand: "",
  car_model: "",
  car_sub_model: "",
  car_year: "",
  car_license: "",
  province: "",
  car_detail: "",
}

const actCase = (step, oneCase) => {
  switch (step) {
    case 0:
      return ['1.วันที่รับเคส/ Receive Date / ', oneCase.receive_date, oneCase.receive_note, oneCase.receive_yn]
    case 1:
      return ['2.วันที่รับเคส / Contact Customer Date ', oneCase.contact_customer_date, oneCase.contact_customer_note, oneCase.contact_customer_yn]
    case 2:
      return ['3.วันที่รับเคส / Account Closing Date ', oneCase.account_closing_date, oneCase.account_closing_note, oneCase.account_closing_yn]
    case 3:
      return ['4.วันรับชุดโอน / Transfer Doc. Received / 	', oneCase.transfer_doc_received_date, oneCase.transfer_doc_received_note, oneCase.transfer_doc_received_yn]
    case 4:
      return ['5.วันยื่นชุดโอน / Transfer Doc. Submitted / 	', oneCase.transfer_doc_submitted_date, oneCase.transfer_doc_submitted_note, oneCase.transfer_doc_submitted_yn]
    case 5:
      return ['6.วันที่ได้รับเล่ม / Book Received Date / 	', oneCase.submit_book_transfer_date, oneCase.submit_book_transfer_note, oneCase.submit_book_transfer_yn]
    case 6:
      return ['7.วันที่ส่งงานโอนทะเบียน / Submit Book Transfer Date / ', oneCase.submit_book_transfer_date, oneCase.submit_book_transfer_note, oneCase.submit_book_transfer_yn]
    case 7:
      return ['8.วันตรวจสภาพรถ / Car Check-Up / 	', oneCase.car_check_up_date, oneCase.car_check_up_note, oneCase.car_check_up_yn]
    case 8:
      return ['9.โอนเล่มทะเบียน / Book Transfer Date / 	', oneCase.book_transfer_date, oneCase.book_transfer_note, oneCase.book_transfer_yn]
    case 9:
      return ['10.รับสำเนาเล่ม / Book Copy Received / 	', oneCase.book_copy_received_date, oneCase.book_copy_received_note, oneCase.book_copy_received_yn]
    case 10:
      return ['11.ส่งเอกสารเบิกเงินธนาคารใหม่ / deposit_doc_to_new_bank / 	', oneCase.deposit_doc_to_new_bank_date, oneCase.deposit_doc_to_new_bank_note, oneCase.deposit_doc_to_new_bank_yn]
    case 11:
      return ['12.ทำเรื่องเบิกมัดจำคืน / Submit Book Deposit Return / ', oneCase.submit_book_deposit_return_date, oneCase.submit_book_deposit_return_note, oneCase.submit_book_deposit_return_yn]
    case 12:
      return ['13.ทำเรื่องเบิกมัดจำคืน / Book Received/ รับเล่มคืน	', oneCase.book_received_back_date, oneCase.book_received_back_note, oneCase.book_received_back_yn]
    case 13:
      return ['14.เงินเข้าบัญชีคาร์ทรัส / Cash Received / 	', oneCase.cash_received_date, oneCase.cash_received_note, oneCase.cash_received_yn]
    case 14:
      return ['15.เงินมัดจำคืนเข้าบัญชี / Book Deposit Received/ ', oneCase.book_deposit_received_date, oneCase.book_deposit_received_note, oneCase.book_deposit_received_yn]
    case 15:
      return ['16.เงินมัดจำคืนเข้าบัญชี / Submit Book to New Finance / ', oneCase.submit_book_to_new_financ_date, oneCase.submit_book_to_new_financ_note, oneCase.submit_book_to_new_financ_yn]
    default:
      return;
  }

}

const conditionCheckCar = ['นัดตรวจรถ(บ.)', 'นัดตรวจรถ', 'ตรวจนอก / ขูดเลข / ถ่ายรูป']

const conditionKeppDocument = ['นัดรับเอกสาร', 'ส่งเอกสาร']

const staffOperOartrust = ['BUA', 'NUN', 'KWANG', 'AOY', 'AU', 'NUM', 'ARM',]

const marginAccount = [
  'ธนาคารไทยพาณิชย์',
  'ธนาคารกสิกร',
  'ธนาคารกรุงเทพ',
  'ธนาคารกรุงศรี',
  'ธนาคารธนชาต',
  'ธนาคารเกียรตินาคิน',
  'ธนาคารทหารไทย',
  'ธนาคารออมสิน',
  'ธนาคารอาคารสงเคราะห์',
  'ธนาคารเพื่อการเกษตรและสหกรณ์',
  'รอเลขบัญชี',
]


export { conditionCheckCar, conditionKeppDocument, staffOperOartrust, marginAccount, financeInstitution, caseSourceAll, caseTypeAll, caseStatus, provinceAll, initialValueTracking, initialNewCase, actCase }