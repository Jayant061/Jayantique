import React, { useState } from 'react';
import {Link} from "react-router-dom";
import "./footer.css";

export default function Footer() {
  const [data,setData] = useState({
    aboutCompany:"At Jayantique, we believe that style should transcend trends, and that's why we carefully curate pieces that withstand the test of time. From vintage-inspired dresses to artisan-crafted accessories, each item in our collection is chosen for its craftsmanship, authenticity, and ability to resonate with the individuality of our customers.",
    aboutUs:"/about-us",
    privacyPolicy:"/privacy-policy",
    shippingNReturns:"/shipping-and-returns",
    tnc:"/tnc",
    facebook:"",
    github:"https://github.com/Jayant061/Jayantique",
    twitter:""
  })
  return (
      <div className="footer">
      <div className="topFooter">
    <div className="footer-column" id="column1">
      <h3>Jayantique</h3>
      <p>{data?.aboutCompany}</p>
    </div>

      <div className="footer-column">
      <h3>Links</h3>
      <ul className="footer-list">
        <li><Link to={data?.aboutUs}>About Us</Link></li>
        <li><Link to={data?.privacyPolicy}>Privacy Policy</Link></li>
        <li><Link to={data?.tnc}>Terms & Conditions</Link></li>
      </ul>
    </div>


    <div className="footer-column">
      <h3>Social</h3>
      <ul className="footer-list">
        <li><Link to={data?.facebook}>Facebook</Link></li>
        <li><Link to={data?.github}>Github</Link></li>
        <li><Link to={data?.twitter}>Twitter</Link></li>
      </ul>
    </div>

    <div className="footer-column" id="column4">
      <h3>Contact Us</h3>
      <ul className="footer-list">
        <li>Jayantique Private Limited</li>
        <li>N.I.T. Kurukshetra</li>
        <li>Kurukshetra 136119,</li>
        <li>Haryana India</li>
      </ul>
    </div>

        </div>

      <div className="bottomFooter">
      <p>&copy; 2023 Jayantique</p>
      </div>
      </div>
  )
}
