import React from "react";
import Navbar from './navbar';  
import Footbar from './footbar';
import '../css/summary1.css';

const SalesSummary = () => {
  return (
    <div>
        <Navbar />
        <Footbar/>
    <div className="container mt-4">
      <div className="content mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="summary">
              <div className="summary-header d-flex justify-content-between align-items-center mb-3">
                {/* ปุ่มเลือกวัน */}
                <input
                  type="date"
                  className="form-control w-25"
                  id="dateInput"
                  defaultValue="2023-09-15"
                />
              </div>

              {/* ตารางยอดขาย */}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ที่</th>
                    <th>เลขที่บิล</th>
                    <th>จำนวน</th>
                    <th>ราคา</th>
                    <th>ส่วนลด</th>
                    <th>ยอดรวม</th>
                    <th>เวลา</th>
                    <th>รายละเอียด</th>
                  </tr>
                </thead>
                <tbody>
                  {/* ข้อมูลรายการที่ 1 */}
                  <tr>
                    <td>1</td>
                    <td>00001</td>
                    <td>8</td>
                    <td>5560</td>
                    <td>0</td>
                    <td>5560</td>
                    <td>15:30:45</td>
                    <td>
                      <a href="page2.html" target="_blank">
                        <button className="details-btn">ดู</button>
                      </a>
                    </td>
                  </tr>
                  {/* ข้อมูลรายการที่ 2 */}
                  <tr>
                    <td>2</td>
                    <td>00002</td>
                    <td>10</td>
                    <td>300</td>
                    <td>150</td>
                    <td>150</td>
                    <td>15:30:55</td>
                    <td>
                      <button className="details-btn">ดู</button>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2">รวม</td>
                    <td>18</td>
                    <td>5860</td>
                    <td>150</td>
                    <td>5710</td>
                    <td colSpan="2"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="col-lg-3">
            <div className="summary-buttons">
              {/* ปุ่มสรุปยอดขายต่างๆ */}
              <a href="http://www.google.com" target="_blank">
                <button className="btn active">ยอดขายรายวัน</button>
              </a>
              <a href="page3.html">
                <button className="btn">ยอดขายรายเดือน</button>
              </a>
              <button className="btn">ยอดขายสินค้า</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SalesSummary;
