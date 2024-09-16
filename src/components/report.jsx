import React from 'react';
import '../css/report.css'

const SalesReport = () => {
  return (
    <>
      <header>
        รายงานการขาย - Sales Report
      </header>

      <div className="container">
        {/* Navigation buttons */}
        <nav>
          <button className="nav-button">ยอดขายรายวัน</button>
          <button className="nav-button">ยอดขายรายเดือน</button>
          <button className="nav-button">สถิติการขาย</button>
        </nav>

        {/* Sales Table */}
        <table>
          <thead>
            <tr>
              <th>บิล</th>
              <th>ชำระโดย</th>
              <th>รายการ</th>
              <th>ราคา</th>
              <th>ส่วนลด</th>
              <th>ราคาหลังหัก</th>
              <th>จ่าย</th>
              <th>ทอน</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>เงินสด</td>
              <td>12</td>
              <td>1,252</td>
              <td>0%</td>
              <td>1,252</td>
              <td>1,500</td>
              <td>248</td>
            </tr>
            <tr>
              <td>2</td>
              <td>แสกนจ่าย</td>
              <td>6</td>
              <td>650</td>
              <td>5%</td>
              <td>617.5</td>
              <td>700</td>
              <td>82.5</td>
            </tr>
            <tr>
              <td>3</td>
              <td>บัตรเครดิต</td>
              <td>5</td>
              <td>500</td>
              <td>0%</td>
              <td>500</td>
              <td>500</td>
              <td>0</td>
            </tr>
            <tr>
              <td>4</td>
              <td>เงินสด</td>
              <td>1</td>
              <td>10</td>
              <td>0%</td>
              <td>10</td>
              <td>20</td>
              <td>10</td>
            </tr>
            <tr>
              <td>5</td>
              <td>เงินสด</td>
              <td>1</td>
              <td>10</td>
              <td>0%</td>
              <td>10</td>
              <td>10</td>
              <td>0</td>
            </tr>
          </tbody>
        </table>

        {/* Sales Summary */}
        <div className="summary">
          รายการรวม 25 รายการ<br />
          ยอดขายรวม 2,389.5 บาท
        </div>
      </div>
    </>
  );
};

export default SalesReport;
