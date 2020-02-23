import {bold, itailic, light, normal} from '../font/Sarabun';
import {bold as bold2, normal as normal2, thin} from '../font/helvethaica';
import logo from '../images/logo';
import Pdfmake from 'pdfmake/build/pdfmake';

/**
 *
 * @param old_finance_closing_fee {number} - ค่าปิดไฟแนนซ์เก่า
 * @param old_finance_transfer_fee {number} - ค่าโอนไฟแนนซ์เก่า
 * @param book_closing_fee {number} - ค่าบริการปิดเล่มม
 * @param vat7_fee {number} - ภาษีมูลค่าเพิ่ม 7%
 * @param transfer_fee {number} - ค่าธรรมเนียมการโอน
 * @param duty_fee {number} - ค่าอากร
 * @param discount_fee {number} - ส่วนลดพิเศษ
 * @param car_shield_fee {number} - ค่าประกันคุ้มครองสินเชื่อ
 * @param cartrust_total_cost {number} - รวมค่าใช้จ่ายคาร์ทรัส
 * @param car_insurance_fee {number} - ค่าประกันภัยรถยนต์
 * @param transfer_service_fee {number} - ค่าบริการจัดชุดโอน
 * @param contract_fee {number} - ค่าทำสัญญา
 * @param outside_transfer_fee {number} - contract_fee
 * @param tax_renewal_fee {number} - outside_transfer_fee
 * @param act_renewal_fee {number} - tax_renewal_fee
 * @param new_finance_total_cost {number} - act_renewal_fee
 * @param approve_amount {number} - new_finance_total_cost
 * @param old_bank {number} - amount_received
 * @param cheque {number} - จำนวนเงินโอน
 * @param deposit {number} - deposit
 * @param cheque_receiver {string} - cheque_receiver
 * @param deposit_receiver {string} - deposit_receiver
 * @param car_check_con {string} - เงื่อนไขการตรวจสภาพรถ
 * @param doc_storage_con  {string} - เงื่อนไขการเก็บเอกสาร
 * @param margin_account {string} - บัญชีรับเงินส่วนต่าง
 * @param margin_account_no {string} - margin_account_no
 * @returns {{styles : {subheader : {fontSize : number, marginBottom : number, bold : boolean, font : string}, address : {fontSize : number, marginBottom : number, itailic : boolean, font : string}, defaultStyle : {fontSize : number, font : string}, telphone : {fontSize : number, font : string}, header : {color : string, fontSize : number, marginBottom : number, bold : boolean, font : string}}, content : ({columns : [{image : string, width : number, height : number}, {stack : [{style : string, text : string}, {style : string, text : string}, {fontSize : number, style : string, text : string}, {fontSize : number, style : string, text : string}, {fontSize : number, style : string, text : string, bold : boolean}], alignment : string}]}|{columns : [{stack : [{fontSize : number, marginBottom : number, text : string, itailic : boolean}, {fontSize : number, marginBottom : number, text : string, itailic : boolean, marginLeft : number}, {fontSize : number, marginBottom : number, text : string, marginLeft : number}]}, {stack : [{columns : [{width : number, marginBottom : number, text : string, bold : boolean}, {width : string, text : *, marginLeft : number}]}, {columns : [{width : number, marginBottom : number, text : string, bold : boolean}, {width : string, text : string, marginLeft : number}]}, {columns : [{width : number, marginBottom : number, text : string, bold : boolean}, {width : string, text : string, marginLeft : number}]}, {columns : [{width : number, marginBottom : number, text : string, bold : boolean}, {width : string, text : string, marginLeft : number}]}], fontSize : number, alignment : string}], font : string}|{columns : [{stack : [{columns : [{width : number, marginBottom : number, text : string, bold : boolean}, {width : number, marginBottom : number, text : string, bold : boolean}]}, {columns : [{width : number, marginBottom : number, text : string, bold : boolean}, {width : number, text : string, bold : boolean}]}, {columns : [{width : number, text : string, bold : boolean}, {text : string, bold : boolean}]}], width : number, fontSize : number}, {marginRight : number, fontSize : number, table : {body}, marginLeft : number}, {stack : [{columns : [{marginBottom : number, text : string, bold : boolean}, {text : string}]}, {columns : [{marginBottom : number, text : string, bold : boolean}, {text : string}]}, {columns : [{marginBottom : number, text : string, bold : boolean}, {text : string}]}, {columns : [{marginBottom : number, text : string, bold : boolean}, {text : string}]}], width : string, fontSize : number}], fontSize : number, marginTop : number, font : string}|{canvas : [{y1 : number, x1 : number, y2 : number, x2, type : string, lineWidth : number}], margin : number}|{padding : number, columns : [{stack, fontSize : number, marginTop : number}, {stack : [{fontSize : number, text : string, bold : boolean}], marginTop : number}], fontSize : number, marginTop : number, font : string})[]}} - documentDefinition
 */
export default function (
	old_finance_closing_fee = 0,
	old_finance_transfer_fee = 0,
	book_closing_fee = 0,
	vat7_fee= 0,
	transfer_fee= 0,
	duty_fee= 0,
	discount_fee= 0,
	car_shield_fee= 0,
	cartrust_total_cost= 0,
	car_insurance_fee= 0,
	transfer_service_fee= 0,
	contract_fee= 0,
	outside_transfer_fee= 0,
	tax_renewal_fee= 0,
	act_renewal_fee= 0,
	new_finance_total_cost= 0,
	approve_amount= 0,
	old_bank= 0,
	cheque= 0,
	deposit= 0,
	cheque_receiver= 0,
	deposit_receiver= 0,
	car_check_con= '-',
	doc_storage_con= '-',
	margin_account= '-',
	margin_account_no = '-'
	) {
	const amount_received = (cartrust_total_cost + new_finance_total_cost) - approve_amount;
	const old_finance_total_cost = old_finance_closing_fee + old_finance_transfer_fee;
	const total_cost = cartrust_total_cost + new_finance_total_cost;
	const templeteOne = {
		content: [
			{
				columns: [
					{
						image: 'logo.jpg',
						width: 210,
						height: 100,
					},
					{
						stack: [
							{
								text: 'ใบเสนอยอดจัดและดอกเบี้ยรถยนต์มือสอง',
								style: 'header',
							},
							{
								text: 'บริษัท คาร์ทรัส จำกัด',
								style: 'subheader',
							},
							{
								text: '88 ถนนประเสรฐมนูกิจแขวงนวมินทร์',
								fontSize: 10,
								style: 'address',
							},
							{
								text: 'เขตบึงกุ่ม กรุงเทพฯ 10210',
								fontSize: 10,
								style: 'address',
							},
							{
								text: 'Tel. 02-276-5765-6 Hotline: 097-146-0239',
								bold: true,
								fontSize: 7,
								style: 'telphone',
							},
						],
						alignment: 'right',
					},
				],
			},
			{
				columns: [
					{
						stack: [
							{
								text: 'ข้อมูลลูกค้า',
								itailic: true,
								fontSize: 13,
								marginBottom: 7,
							},
							{
								text: 'คุณ  ณัฏพล ชละเอม  Tel. +66859077647 ,',
								fontSize: 9,
								marginLeft: 10,
								itailic: true,
								marginBottom: 7,
							},
							{
								text: 'Chevrolet Sonic  ปี 2014   ทะเบียน กม 6818 กรุงเทพมหานคร',
								fontSize: 10,
								marginLeft: 10,
								marginBottom: 7,
							},
						],
					},
					{
						stack: [
							{
								columns: [
									{
										text: 'วันที่จัดทํา / Date :',
										bold: true,
										width: 200,
										marginBottom: 7,
									},
									{
										width: 'auto',
										text: new Date().toLocaleDateString(),
										marginLeft: 5,
									},
								],
							},
							{
								columns: [
									{
										text: 'Case Type: ',
										bold: true,
										width: 200,

										marginBottom: 7,
									},
									{
										width: 'auto',
										text: 'Refinance',
										marginLeft: 5,
									},
								],
							},
							{
								columns: [
									{
										text: 'Case ID :',
										bold: true,
										width: 200,

										marginBottom: 7,
									},
									{
										width: 'auto',
										text: '600',
										marginLeft: 5,
									},
								],
							},
							{
								columns: [
									{
										width: 200,

										text: 'Job Number :',
										bold: true,
										marginBottom: 7,
									},
									{
										width: 'auto',
										text: '-',
										marginLeft: 5,
									},
								],
							},
						],
						alignment: 'right',
						fontSize: 10,
					},
				],
				font: 'Halvethaica',
			},
			{
				columns: [
					{
						stack: [
							{
								columns: [
									{
										text: 'สถาบันการเงิน',
										bold: true,
										width: 60,
										marginBottom: 7,
									},
									{
										text: 'SCB Leasing',
										bold: true,
										width: 80,
										marginBottom: 7,
									},
								],
							},
							{
								columns: [
									{
										text: 'ยอดจัด',
										bold: true,
										width: 60,
										marginBottom: 7,
									},
									{
										text: '333500 บาท',
										bold: true,
										width: 80,
									},
								],
							},
							{
								columns: [
									{
										text: 'ดาวน์',
										bold: true,
										width: 60,
									},
									{
										text: '',
										bold: true,
									},
								],
							},
						],
						width: 60,
						fontSize: 11,
					},
					{
						table: {
							body: [
								[
									{
										text: 'การผ่อนชำระ',
										alignment: 'center',
										margin: 3,
										border: [0, 0, 1, 1],
									},
									{
										text: '24 เดือน',
										width: 100,
										alignment: 'center',
										margin: 3,
										border: [0, 0, 1, 1],
									},
									{
										text: '36 เดือน',
										width: 100,
										alignment: 'center',
										margin: 3,
										border: [0, 0, 1, 1],
									},
									{
										text: '48 เดือน',
										width: 100,
										alignment: 'center',
										margin: 3,
										border: [0, 0, 1, 1],
									},
									{
										text: '60 เดือน',
										width: 100,
										alignment: 'center',
										margin: 3,
										border: [0, 0, 1, 1],
									},
									{
										text: '72 เดือน',
										width: 100,
										alignment: 'center',
										margin: 3,
										border: [0, 0, 0, 1],
									},
								],
								[
									{
										text: 'ผ่อนชำระ / ต่อเดือน',
										alignment: 'center',
										margin: 3,
										border: [0, 1, 1, 1],
									},
									{
										text: '',
										width: 100,
										alignment: 'center',
										margin: 3,
									},
									{
										text: '',
										width: 100,
										alignment: 'center',
										margin: 3,
									},
									{
										text: '',
										width: 100,
										alignment: 'center',
										margin: 3,
									},
									{
										text: '',
										width: 100,
										alignment: 'center',
										margin: 3,
									},
									{
										text: '',
										width: 100,
										alignment: 'center',
										margin: 3,
										border: [1, 1, 0, 1],
									},
								],
								[
									{
										alignment: 'center',
										margin: 3,
										border: [0, 1, 1, 1],
										text: 'อัตราดอกเบี้ย',
									},
									{
										text: '',
										width: 100,
										alignment: 'center',
										margin: 3,
										border: [1, 1, 0, 1],
									},
									{
										text: '',
										width: 100,
										alignment: 'center',
										margin: 3,
										border: [1, 1, 0, 1],
									},
									{
										text: '',
										width: 100,
										alignment: 'center',
										margin: 3,
										border: [1, 1, 0, 1],
									},
									{
										text: '',
										width: 100,
										alignment: 'center',
										margin: 3,
										border: [1, 1, 0, 1],
									},
									{
										text: '',
										width: 100,
										alignment: 'center',
										margin: 3,
										border: [1, 1, 0, 1],
									},
								],
								[
									{
										alignment: 'center',
										margin: 3,
										border: [0, 1, 1, 0],
										text: 'ยอดจัด',
									},
									{
										alignment: 'center',
										margin: 3,
										border: [1, 1, 1, 0],
										text: '',
									},
									{
										alignment: 'center',
										margin: 3,
										border: [1, 1, 1, 0],
										text: '',
									},
									{
										alignment: 'center',
										margin: 3,
										border: [1, 1, 1, 0],
										text: '',
									},
									{
										alignment: 'center',
										margin: 3,
										border: [1, 1, 1, 0],
										text: '',
									},
									{
										alignment: 'center',
										margin: 3,
										border: [1, 1, 0, 0],
										text: '',
									},
								],
							],
						},
						fontSize: 9,
						marginLeft: 65,
						marginRight: 20,
					},
					{
						stack: [
							{
								columns: [
									{
										text: 'เงื่อนไขการตรวจรถ',
										bold: true,
										marginBottom: 7,
									},
									{
										text: 'ตรวนอก/ชุดเลข/ถ่ายรูป',
									},
								],
							},
							{
								columns: [
									{
										text: 'จนท. Oper Cartrust',
										bold: true,
										marginBottom: 7,
									},
									{
										text: '...',
									},
								],
							},
							{
								columns: [
									{
										text: 'จังหวัดที่อยู่อาศัย',
										bold: true,
										marginBottom: 7,
									},
									{
										text: 'กทม.',
									},
								],
							},
							{
								columns: [
									{
										text: 'บัญชีรับเงินส่วนต่าง',
										bold: true,
										marginBottom: 7,
									},
									{
										text: '',
									},
								],
							},
						],
						width: 'auto',
						fontSize: 9,
					},
				],
				font: 'Halvethaica',
				fontSize: 7,
				marginTop: 10,
			},
			{
				canvas: [{type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1}],
				margin: 5,
			},
			{
				columns: [
					{
						marginTop: 15,
						fontSize: 12,
						stack: [
							{
								text: 'ค่าใช้จ่าย CarTrust',
								bold: true,
								fontSize: 15,
								marginBottom: 12,
							},
							{
								marginLeft: 23,
								columns: [
									{
										text: '1. ยอดปิดไฟแนนต์เก่า',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '320000.00 บาท',
									},
								],
							},
							{
								marginLeft: 23,
								columns: [
									{
										text: '2. ค่าดำเนินการโอนไฟแนนเก่า',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '',
									},
								],
							},
							{
								marginLeft: 23,
								columns: [
									{
										text: '3. ค่าบริการเงินสด',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '',
									},
								],
							},
							{
								marginLeft: 23,
								columns: [
									{
										text: '4. ค่าดำเนินการ',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '',
									},
								],
							},
							{
								marginLeft: 23,
								columns: [
									{
										text: '5. ภาษีมูลค่าเพิ่ม 7 %',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '',
									},
								],
							},
							{
								bold: true,
								marginLeft: 35,
								columns: [
									{
										text: 'ส่วนลดพิเศษ',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '',
									},
								],
							},
							{
								bold: true,
								marginLeft: 35,
								columns: [
									{
										text: 'รวมค่าใช้จ่าย',
										width: 100,
										marginBottom: 12,
									},
									{
										text: '320000.00 บาท',
									},
								],
							},
							{
								text: 'ค่าใช้จ่ายไฟแนนซ์ใหม่',
								bold: true,
								fontSize: 15,
								marginBottom: 12,
							},
							{
								marginLeft: 23,
								columns: [
									{
										text: '6. ค่าใช้จ่ายไฟแนนซ์ใหม่',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '230000.00 บาท',
									},
								],
							},
							{
								marginLeft: 23,
								columns: [
									{
										text: '7. ค่าประกันภัยรถยนต์',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '2000.00 บาท',
									},
								],
							},
							{
								marginLeft: 23,
								columns: [
									{
										text: '8. ค่าบริการจัดชุดโอน',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '1300.00 บาท',
									},
								],
							},
							{
								marginLeft: 23,
								columns: [
									{
										text: '9. ค่าทำสัญญา',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '900.00 บาท',
									},
								],
							},
							{
								marginLeft: 23,
								columns: [
									{
										text: '10. ค่าโอนนอก',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '4000.00 บาท',
									},
								],
							},
							{
								marginLeft: 23,
								columns: [
									{
										text: '11. ค่าต่อภาษี',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '800.00 บาท',
									},
								],
							},
							{
								marginLeft: 23,
								columns: [
									{
										text: '12. ค่าต่อ พรบ.',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '600.00 บาท',
									},
								],
							},
							{
								bold: true,
								marginLeft: 35,
								columns: [
									{
										text: 'รวมค่าใช้จ่ายทั้งสิน',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '566860.00 บาท',
									},
								],
							},
							{
								bold: true,
								marginLeft: 35,
								columns: [
									{
										text: 'ยอดเงินที่ได้รับ',
										width: 100,
										marginBottom: 10,
									},
									{
										text: '-23336.00 บาท',
									},
								],
							},
						],
					},
					{
						marginTop: 15,
						stack: [
							{
								text: 'หมายเหตุ',
								bold: true,
								fontSize: 15,
							},
						],
					},
				],
				font: 'Halvethaica',
				fontSize: 8,
				padding: 20,
				marginTop: 5,
			},
			{
				canvas: [{type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 1}],
				margin: 5,
			},
			{
				marginTop: 15,
				marginLeft: 25,
				columns: [
					{
						text: 'การจ่ายเงิน :',
						width: 50,
						bold: true,
					},
					{
						stack: [
							{
								columns: [
									{
										text: 'จ่ายเป็นเงินสด',
										marginBottom: 7,
									},
									{
										text: '322500.00 บาท',
									},
								],
							},
							{
								columns: [
									{
										text: 'ทำเช็คจ่ายในนาม ...',
										marginBottom: 7,
									},
									{
										text: '180000.00 บาท',
									},
								],
							},
							{
								columns: [
									{
										text: 'มัดจำจ่ายให้ ...',
										marginBottom: 7,
									},
									{
										text: '5000.00 บาท',
									},
								],
							},
						],
					},
				],
				font: 'Halvethaica',
				fontSize: 12,
				marginBottom: 7,
			},
			{
				text: [
					{text: 'หมายเหตุ', fontSize: 12, color: 'red', bold: true},
					{
						text:
							'  เงื่อนไขการมัดจำเช็ค ลูกค้าต้องนำรถยนต์เข้าตรวจสภาพภายใน 3 วัน เมื่อเจ้าหน้าที่หรือบริษัทฯ ร้องขอ มิเช่นนั้น ทางบริษัทฯ ขอหักเงินมัดจำเป็นจำนวน 50% ของยอดเงินที่',
						color: 'red',
						marginBottom: 5,
					},
				],
				font: 'Halvethaica',
				fontSize: 10,
			},
			{
				text:
					'มัดจำไว้ และหากลูกค้าไม่ดำเนินการให้ ตามที่บริษัทร้องขอภายใน 5 วัน บริษัทขอสงวนสิทธิ์ในการคืนเงินมัดจำทั้งหมด',
				color: 'red',
				font: 'Halvethaica',
				marginLeft: 90,
				marginTop: 7,
				fontSize: 10,
			},
			{
				marginTop: 15,
				table: {
					width: '100%',
					body: [
						[
							{
								stack: [
									{
										text: 'ข้าพเจ้า  ..............................................',
										margin: [15, 15, 100, 15],
									},
									{
										text: 'ได้อ่านรายละเอียดเกี่ยวกับค่าใช้จ่ายต่างๆข้างต้นเรียบร้อยแล้ว',
										margin: 15,
									},
									{
										text: 'และยอมรับเงื่อนไขของค่าใช้จ่ายทั้งหมด',
										margin: 15,
									},
								],
							},
							[
								{
									stack: [
										{
											margin: 15,
											text: '',
										},
										{
											margin: 15,
											text: '',
										},
										{
											margin: 15,
											columns: [
												{text: 'ลงชื่อ : ', marginRight: 100},
												{text: 'วันที่ :'},
											],
										},
									],
								},
							],
						],
					],
				},
				font: 'Halvethaica',
				marginBottom: 25,

			},
			{
				text: 'เงื่อนไข: ยอดจัด,ดอกเบี้ยและค่าใช้จ่ายอาจมีการเปลี่ยนแปลง หากไม่ตรงตามเกณฑ์มาตราฐานการตามที่มาตราฐานแจ้งไว้ โดยที่ทางบริษัทฯ ไม่ต้องแจ้งให้ทราบล่วงหน้า',
				font: 'Halvethaica',
				fontSize: 10,
				marginBottom: 15,
				alignment: 'center'

			},
			{
				text: 'สอบถามรายละอียดเพิ่มเติมได้ที่ โทร. 02-276-5765 ทุกวันจันทร์ - ศุกร์ เวลา 9:00 - 18:00 น.',
				font: 'Halvethaica',
				bold: true,
				fontSize: 10,
				alignment: 'center'

			},
		],
		styles: {
			header: {
				fontSize: 25,
				bold: true,
				color: '#335599',
				marginBottom: 15,
				font: 'Halvethaica',
			},
			subheader: {
				fontSize: 20,
				bold: true,
				font: 'Halvethaica',
				marginBottom: 10,
			},
			address: {
				fontSize: 15,
				font: 'Halvethaica',
				marginBottom: 6,
				itailic: true,
			},
			telphone: {
				fontSize: 15,
				font: 'Halvethaica',
			},
			defaultStyle: {
				font: 'Halvethaica',
				fontSize: 16,
			},
		},
	}
	Pdfmake.vfs['Sarabun.ttf'] = normal;
	Pdfmake.vfs['Sarabun-bold.ttf'] = bold;
	Pdfmake.vfs['Sarabun-itailic.ttf'] = itailic;
	Pdfmake.vfs['Sarabun-light.ttf'] = light;
	Pdfmake.vfs['halvethaica.ttf'] = normal2;
	Pdfmake.vfs['halvethaica-bold.tff'] = bold2;
	Pdfmake.vfs['halvethaica-thin.tff'] = thin;
	Pdfmake.vfs['logo.jpg'] = logo;
	Pdfmake.fonts = {
		...Pdfmake.fonts,
		Sarabun: {
			normal: 'Sarabun.ttf',
			bold: 'Sarabun-bold.ttf',
			italics: 'Sarabun-light.ttf',
		},
		Halvethaica: {
			normal: 'halvethaica.ttf',
			bold: 'halvethaica-bold.tff',
			italics: 'halvethaica-thin.tff',
		},
	};

	return Pdfmake.createPdf(templeteOne);
}