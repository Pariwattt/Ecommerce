import React from 'react';
import Navbar from './navbar';  
import Footbar from './footbar';
import '../css/summary2.css';

const MonthlySalesSummary = () => {
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
                {/* Date Picker */}
                <div className="date-picker">
                  <span>กันยายน 2567</span>
                  <button className="btn btn-light ms-2">
                    <i className="bi bi-calendar3"></i> {/* Calendar Icon */}
                  </button>
                </div>
              </div>

              {/* Sales Table */}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>วันที่</th>
                    <th>จำนวนสินค้า</th>
                    <th>ราคา</th>
                    <th>ส่วนลด</th>
                    <th>ยอดรวม</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>59</td>
                    <td>98,100</td>
                    <td>5699</td>
                    <td>91,888</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>100</td>
                    <td>130,012</td>
                    <td>100</td>
                    <td>129,912</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>รวม</td>
                    <td>159</td>
                    <td>228,112</td>
                    <td>5799</td>
                    <td>221,800</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Summary Buttons */}
          <div className="col-lg-3">
            <div className="summary-buttons">
              <button className="btn active">ยอดขายรายวัน</button>
              <button className="btn">ยอดขายรายเดือน</button>
              <button className="btn">ยอดขายสินค้า</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MonthlySalesSummary;
