/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import FixedPlugin from "core/components/fixedPlugin/FixedPlugin";
import Footer from "core/components/footer/FooterAuthDefault";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Support() {
  const urlStyling = "font-bold block mb-2 hover:text-brand-500";
  return (
    <div className=" h-full min-h-screen w-full dark:!bg-navy-900 dark:text-white">
      <div className="relative mx-auto w-9/12 py-[50px]  dark:text-white">
        <FixedPlugin />
        <a
          className="border-px fixed bottom-[100px] right-[35px] !z-[99] flex h-[60px] w-[60px] items-center justify-center rounded-full border-[#6a53ff] bg-gradient-to-br from-brandLinear to-blueSecondary p-0"
          href="#top"
        >
          <div className="cursor-pointer text-gray-600">
            <BsFillArrowUpCircleFill className="h-10 w-10 text-white" />
          </div>
        </a>
        <h4 className="mb-2.5 text-4xl font-bold text-brand-700 dark:text-white">
          Getting Started
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Everything you need to know about using inventory hub
        </p>
        <div className="mb-10">
          <a href="#overview" className={`${urlStyling}`}>
            Overview
          </a>
          <a href="#employer" className={`${urlStyling}`}>
            Getting Started as an Employer
          </a>
          <a href="#employee" className={`${urlStyling}`}>
            Getting Started as an Employee
          </a>
          <a href="#shops" className={`${urlStyling}`}>
            {" "}
            How to manage Shop Locations
          </a>
          <a href="#catalog" className={`${urlStyling}`}>
            Setting Up Shop's Catalogs
          </a>
          <a href="#sales" className={`${urlStyling}`}>
            {" "}
            Making Sales{" "}
          </a>
          <a href="#employee-management" className={`${urlStyling}`}>
            {" "}
            Employee management{" "}
          </a>
          <a href="#profile-management" className={`${urlStyling}`}>
            {" "}
            Profile Management{" "}
          </a>
          <a href="#features" className={`${urlStyling}`}>
            {" "}
            Upcoming Features
          </a>
        </div>
        <section id="overview" className="mb-10">
          <h4 className="mb-2.5 text-4xl font-semibold text-brand-700 dark:text-white">
            Overview
          </h4>
          <p className="mb-3">
            This user guide will provide you with the information you need to
            get started with using our platform, whether you are an employer,
            employee, or both. Our platform offers a variety of features to help
            you manage your business, including
          </p>
          <ul>
            <li className="mb-2">
              <span className="mr-2 font-bold">Shop locations:</span>
              Manage multiple shop locations from a single dashboard.
            </li>
            <li className="mb-2">
              <span className="mr-2 font-bold">Product management:</span>
              Add, edit, and manage your products from one place.
            </li>
            <li className="mb-2">
              <span className="mr-2 font-bold">Shop catalogs:</span>
              Create and manage shop catalogs to showcase your products to
              customers
            </li>
            <li className="mb-2">
              <span className="mr-2 font-bold">Sales:</span>
              Make sales directly from your platform and track your sales
              performance over time
            </li>
            <li className="mb-2">
              <span className="mr-2 font-bold">Employee management:</span>
              Manage your employees, including their roles and permissions
            </li>
            <li className="mb-2">
              <span className="mr-2 font-bold">profile management:</span>
              Update and manage your profile, including your contact information
              and logo.
            </li>
          </ul>
        </section>
        <section id="employer" className="mb-10">
          <h4 className="mb-2.5 text-4xl font-semibold text-brand-700 dark:text-white">
            Getting Started as an Employer
          </h4>
          <p className="mb-5">
            To get started as an employer, you will need to create an account
            for your business. if registration is success an OTP is sent to the
            email account used for registration.
          </p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21740&authkey=%21AMSZ8rVyOO2FbQ4&width=1920&height=866"
              alt="sign up as employer"
            />
          </div>
          <p className="mb-5">
            Using the One-Time-Password, the account must be verified before
            full access is given to the platform
          </p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21741&authkey=%21ABFIuqGa7XjWVxM&width=1920&height=866"
              alt="verify employer account"
            />
          </div>
          <p className="mb-5">
            Once an account is verified, only then can you can start adding
            employees and managing your shop locations, products, and sales
          </p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21739&authkey=%21AL4FEZzr-EmLGgc&width=1920&height=880"
              alt="login employer"
            />
          </div>
        </section>
        <section id="employee" className="mb-10">
          <h4 className="mb-2.5 text-4xl font-semibold text-brand-700 dark:text-white">
            Getting Started as an Employee
          </h4>
          <p className="mb-5">
            To get started as an employee, you will need to be invited to join a
            business by an employer. Once you have been invited, you can sign in
            via their email and default password which will be sent to them,
            using the employee user option.
          </p>
          <div className="flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21775&authkey=%21ADJxRgVyaSttkg8&width=728&height=335"
              alt="login as employee"
            />
          </div>
        </section>
        <section id="shops" className="mb-10">
          <h4 className="mb-2.5 text-4xl font-semibold text-brand-700 dark:text-white">
            Manage Shop Location
          </h4>
          <p className="mb-5">
            To manage your shops, go to the Stores page. From here, you can add,
            edit, and delete shop locations. You can also view detailed
            information about each shop location, such as its address, contact
            information, and hours of operation.
          </p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21774&authkey=%21AENJ024F9MTLV0c&width=1920&height=945"
              alt="view shops"
            />
          </div>
          <p className="text-gray-500">adding a shop</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21766&authkey=%21ADqW8DhTruubHLw&width=1920&height=945"
              alt="add shops"
            />
          </div>
          <p className="text-gray-500">updating a shop</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21769&authkey=%21AFZ20VntDjCruTk&width=1920&height=9455"
              alt="update shops"
            />
          </div>
          <p className="text-gray-500">activate or deactivate a shop</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21771&authkey=%21APuF5u6wInblOmw&width=1920&height=945"
              alt="activate or deactivate a shop"
            />
          </div>
        </section>
        <section id="products" className="mb-10">
          <h4 className="mb-2.5 text-4xl font-semibold text-brand-700 dark:text-white">
            How to Add Products
          </h4>
          <p className="mb-5">
            To add a product, go to the Products page and click the Add Product
            button. From here, you can enter the product's name, description,
            price, and other relevant information.
          </p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21757&authkey=%21AKVPLelaGuZmj-o&width=1920&height=1192"
              alt="view products"
            />
          </div>
          <p className="text-gray-500">adding a product</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21754&authkey=%21ADjn-jdIAxBqesw&width=1920&height=1192"
              alt="add products"
            />
          </div>
          <p className="text-gray-500">updating product details</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21756&authkey=%21ADNzqq1gdx5fVmA&width=1920&height=1192"
              alt="update product details"
            />
          </div>
          <p className="text-gray-500">updating product price</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21755&authkey=%21AF7WS2hmBIes_M4&width=1920&height=1192"
              alt="update product price"
            />
          </div>
          <p className="text-gray-500">list or unlist a product in shops</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21753&authkey=%21AOcF1Ss_Cu6WdG8&width=1920&height=1192"
              alt="list or unlist product in shops"
            />
          </div>
        </section>
        <section id="catalogs" className="mb-10">
          <h4 className="mb-2.5 text-4xl font-semibold text-brand-700 dark:text-white">
            Setting Up Shop Catalogs
          </h4>
          <p className="mb-5">
            To create a shop catalog, go to the Products page and click the
            Catalog Item button. From here, you can select the products that you
            want to include in the catalog and then customize the catalog's
            pricing.
          </p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21767&authkey=%21AMlLFsOi_MNB9HM&width=1920&height=945"
              alt="view shop catalog"
            />
          </div>
          <p className="text-gray-500">adding a product to catalog</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21751&authkey=%21ADLF0EhgLl9UQ1s&width=1920&height=1192"
              alt="add products to catalog"
            />
          </div>
          <p className="text-gray-500">updating catalog</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21772&authkey=%21AFZIgcw5UqF0InQ&width=1920&height=945"
              alt="update catalog"
            />
          </div>
        </section>
        <section id="sales" className="mb-10">
          <h4 className="mb-2.5 text-4xl font-semibold text-brand-700 dark:text-white">
            Making Sale
          </h4>
          <p className="mb-5">
            To make a sale, go to the Point of Sale (pos) page and click the
            Make Sale button. From here, you can select the customer, product,
            and quantity. Once you have entered all of the relevant information,
            click the Generate Receipt button to process the sale.
          </p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21750&authkey=%21ADclnD14gRUMDig&width=1920&height=992"
              alt="make sale"
            />
          </div>
          <p className="text-center text-gray-500">bill types</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21760&authkey=%21AAPJ4aFNZ8VJ5DU&width=604&height=260"
              alt="bill types"
            />
          </div>
          <p className="text-center text-gray-500">payment methods</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21761&authkey=%21ANHUGHmdZe3UINo&width=532&height=285"
              alt="payment methods"
            />
          </div>
          <p className="mb-5">
            Final Confirmation is needed before the sales receipt is generated
          </p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21749&authkey=%21AOskc6X1tItTW_U&width=1920&height=992"
              alt="sales final confirmation"
            />
          </div>
          <p className="text-gray-500">updating sales status</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21764&authkey=%21ACldBg7L9OAbydg&width=1920&height=1596"
              alt="updating sales status"
            />
          </div>
          <p className="text-center text-gray-500">sales status</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21762&authkey=%21AMISprC4IIhmDDs&width=780&height=377"
              alt="sales status"
            />
          </div>
          <p className="text-gray-500">printing invoice/receipt</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21748&authkey=%21AO7oFRhYt5dr3Tk&width=1920&height=866"
              alt="printing invoice/ receipt"
            />
          </div>
        </section>
        <section id="employee-management" className="mb-10">
          <h4 className="mb-2.5 text-4xl font-semibold text-brand-700 dark:text-white">
            Employee Management
          </h4>
          <p className="mb-5">
            To manage your employees, go to the Employees page. From here, you
            can add, change role, and resign employees. You can also view
            detailed information about each employee, such as their assigned
            store, staff id, role and status
          </p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21747&authkey=%21AIc6MdGNTnoS7So&width=1920&height=1539"
              alt="view employees"
            />
          </div>
          <p className="text-center text-gray-500">roles</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21776&authkey=%21ALS3EFw444hnC4Y&width=772&height=335"
              alt="employee roles"
            />
          </div>
          <p className="text-gray-500">add new employee</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21745&authkey=%21AHZyQztqVgRykss&width=1920&height=1539"
              alt="add new employee"
            />
          </div>
          <p className="text-gray-500">
            assign employee to new role and/or store
          </p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21746&authkey=%21AOo-e5QgWkBQSzU&width=1920&height=1539"
              alt="reassign employee"
            />
          </div>
          <p className="mb-5 text-gray-500">
            When an employee is resigned, all records of the employee are
            cleared. A resigned employee will seize to have access to the
            business portal.
          </p>
        </section>
        <section id="profile-management" className="mb-10">
          <h4 className="mb-2.5 text-4xl font-semibold text-brand-700 dark:text-white">
            Profile Management
          </h4>
          <p className="mb-5">
            To manage your profile, go to the Profile page. From here, you can
            update your business's contact information and other details.
          </p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21759&authkey=%21AA-l7FpHJ1viI2A&width=1920&height=945"
              alt="view profile"
            />
          </div>
          <p className="text-gray-500">update profile</p>
          <div className="mb-5 flex justify-center">
            <img
              src="https://onedrive.live.com/embed?resid=B8295C03D418D49B%21758&authkey=%21APfCSYewF890FTU&width=1920&height=945"
              alt="update profile "
            />
          </div>
        </section>
        <section id="features" className="mb-10">
          <h4 className="mb-2.5 text-4xl font-semibold text-brand-700 dark:text-white">
            Upcoming Features
          </h4>
          <p className="mb-5">
            The following features will be added in a future date,
          </p>
          <ol>
            <li className="">System and audit log pages</li>
            <li className="">
              image upload functionality for products, shop location and user
              profiles
            </li>
            <li className="">customer service portal</li>
            <li className="">
              Redesign for POS system to include product images
            </li>
          </ol>
        </section>
        <section className="mb-8 text-center">
          <a
            target="blank"
            href="mailto:omarookolosio94@gmail.com"
            className="text-base font-medium text-gray-600 hover:text-gray-600"
          >
            Have more questions? Submit a request
          </a>
        </section>
        <div className="my-5 flex gap-3 items-center justify-start">
          <Link
            to="/auth"
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Sign In
          </Link>
          <Link
            to="/auth/register"
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Register
          </Link>
        </div>
        <Footer />
      </div>
    </div>
  );
}
