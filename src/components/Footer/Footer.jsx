import { useEffect, useState, useContext } from "react";
import classes from "./Footer.module.css";
import amazonLogo from "../../assets/Amazon_logo.svg.png";
import americanExpressLogo from "../../assets/American_Express_logo_(2018).svg";
import masterCardLogo from "../../assets/MasterCard_Logo.svg.png";
import payPalLogo from "../../assets/paypal.svg";
import appStore from "../../assets/app-store-apple-logo.svg";
import googlePlay from "../../assets/google-play-badge-logo.svg";

function Footer() {
  return (
    <>
      <footer className="bg-gray-200 p-4">
        <div className="container mx-auto">
          <h3 className="text-2xl mb-4">Get the FreshCart app</h3>
          <p className="text-gray-600 mb-4">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="flex flex-col sm:flex-row justify-between items-center border-b-2 pb-7 border-gray-300 mb-4">
            <div className="relative w-full sm:w-2/3 flex flex-col sm:flex-row items-center">
              <input
                type="email"
                name="email"
                id="email"
                className="w-full sm:w-2/3 text-sm text-gray-900 bg-white border border-gray-300 rounded-md dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer mb-2 sm:mb-0"
                placeholder="Email..."
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter your email...
              </label>
            </div>
            <button className="btn btn-green whitespace-nowrap mt-2 sm:mt-0">
              Share app link
            </button>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex flex-wrap items-center mb-4 sm:mb-0">
              <h4 className="block me-2 text-sm">Payment Partners</h4>
              <img
                src={amazonLogo}
                alt="Amazon logo"
                className="w-14 me-2 mb-2 sm:mb-0"
              />
              <img
                src={americanExpressLogo}
                alt="American Express logo"
                className="w-14 me-2 mb-2 sm:mb-0 h-9"
              />
              <img
                src={masterCardLogo}
                alt="MasterCard logo"
                className="w-14 me-2 mb-2 sm:mb-0"
              />
              <img
                src={payPalLogo}
                alt="PayPal logo"
                className="w-14 mb-2 sm:mb-0"
              />
            </div>
            <div className="flex flex-wrap items-center">
              <h4 className="block me-2 text-sm">
                Get deliveries with FreshCart
              </h4>
              <img
                src={appStore}
                alt="App Store logo"
                className="w-14 me-2 mb-2 sm:mb-0"
              />
              <img
                src={googlePlay}
                alt="Google Play logo"
                className="w-14 mb-2 sm:mb-0"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
