import React from "react";
import Navbar from './navbar';  
import Footbar from './footbar';
import '../css/details.css';

const ProductDetails = () => {
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
                <h4>รายละเอียดสินค้า</h4>
                <a href="page1.html">
                  <button className="btn-back">ย้อนกลับ</button>
                </a>
              </div>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ที่</th>
                    <th>รหัสสินค้า</th>
                    <th>ชื่อสินค้า</th>
                    <th>จำนวนสินค้า</th>
                    <th>ราคาสินค้า</th>
                    <th>ยอดรวม</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>B0001</td>
                    <td>เบอร์เกอร์ ไก่</td>
                    <td>5</td>
                    <td>80</td>
                    <td>400</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>B0021</td>
                    <td>เบอร์เกอร์ หมู</td>
                    <td>2</td>
                    <td>80</td>
                    <td>160</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>N11014</td>
                    <td>น้ำส้ม</td>
                    <td>1</td>
                    <td>5000</td>
                    <td>5000</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3">รวม</td>
                    <td>8</td>
                    <td></td>
                    <td>5560</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

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

export default ProductDetails;
