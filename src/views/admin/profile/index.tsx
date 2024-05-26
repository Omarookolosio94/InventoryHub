import React, { useState, useEffect } from "react";
import Card from "core/components/card";
import avatar from "assets/img/avatars/avatar4.png";
import useUserStore from "core/services/stores/useUserStore";
import { getDate } from "core/services/helpers";
import { MdVerifiedUser } from "react-icons/md";
import { BsFillPatchMinusFill } from "react-icons/bs";
import Button from "core/components/button/Button";
import { AiFillEdit } from "react-icons/ai";
import Modal from "core/components/modal/Modal";
import InputField from "core/components/fields/InputField";
import TextField from "core/components/fields/TextField";
import UploadField from "core/components/fields/UploadField";

const Profile = () => {
  const errors = useUserStore((state) => state.errors);
  const updateError = useUserStore((state) => state.updateError);
  const user = useUserStore((state) => state.user);
  const isEmployer = useUserStore((state) => state.isEmployer);
  const updateProfileAction = useUserStore((state) => state.editEmployer);
  const [fields, setFields] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [profile, setProfile] = useState<UpdateEmployer>({
    name: "",
    about: "",
    caption: "",
    contactLine: "",
    headOfficeAddress: "",
    legalDocument: "",
    logo: [],
    privacyPolicy: "",
    services: "",
    termsAndConditions: "",
    weblink: "",
  });

  const handleProfileChange = (e: any) => {
    const { name, value } = e?.target;

    setProfile((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const updateProfile = async (e: any) => {
    e.preventDefault();
    await updateProfileAction(profile);
  };

  useEffect(() => {
    console.log("set profile");

    console.log(user);

    if (isEmployer) {
      setFields([
        {
          name: "Email",
          value: user?.email,
        },
        {
          name: "Head Office Address",
          value: user?.headOfficeAddress,
        },
        {
          name: "Contact Line",
          value: user?.contactLine,
        },
        {
          name: "Store Front Link",
          value: user?.weblink,
        },
        {
          name: "Date Registered",
          value: getDate(user?.dateRegistered),
        },
        {
          name: "Last Updated",
          value: getDate(user?.lastUpdated),
        },
      ]);
    } else {
      setFields([
        {
          name: "Email",
          value: user?.email,
        },
        {
          name: "Staff ID",
          value: user?.staffId,
        },
        {
          name: "Company",
          value: user?.employer?.name,
        },
        {
          name: "Date Employed",
          value: getDate(user?.dateEmployed),
        },
        {
          name: "Last Updated",
          value: getDate(user?.lastUpdated),
        },
      ]);
    }
  }, []);

  return (
    <div className="ml-4 mt-3">
      <div className="flex gap-3 pb-6">
        <Card extra={"w-2/5 h-full p-6 sm:overflow-x-auto"}>
          <div className="flex h-[250px] flex-col items-center gap-1">
            <div className="relative h-[200px] w-[200px] rounded-full">
              <img
                src={avatar}
                alt="user"
                className="h-[200px] w-[200px] rounded-full"
              />
              {user?.isActive || user?.isVerified ? (
                <MdVerifiedUser className="absolute right-0 top-0 z-40 h-[20px] w-[20px] text-green-500" />
              ) : (
                <BsFillPatchMinusFill className="absolute right-0 top-0 z-40 h-[20px] w-[20px] text-gray-500" />
              )}
            </div>
            <p>{user?.name}</p>
            <p className="text-xs font-bold text-gray-500">{user?.roles}</p>
          </div>
        </Card>
        <Card extra={"w-3/5 h-full p-6 sm:overflow-x-auto"}>
          <div className="relative h-[250px]">
            <>
              {fields != null &&
                fields?.length > 0 &&
                fields?.map((field) => (
                  <div className="mb-3">
                    <span className="text-gray-500">{field?.name}: </span>
                    {field?.name == "Store Front Link" ? (
                      <a
                        className="text-brand inline-block underline"
                        href={field?.value}
                        referrerPolicy="no-referrer"
                        target="_blank"
                      >
                        {field?.value}
                      </a>
                    ) : (
                      <span>{field?.value}</span>
                    )}
                  </div>
                ))}

              {isEmployer && (
                <div className="absolute bottom-0 flex w-full justify-end gap-3">
                  <Button
                    style={`flex gap-1 justify-items-center items-center bg-yellow-500 hover:bg-yellow-600 dark:text-white-300`}
                    onClick={() => {
                      setOpenEditModal(true);
                      setProfile((state) => ({
                        ...state,
                        ...user,
                      }));
                    }}
                  >
                    <AiFillEdit />
                    <span className="text-xs">Edit</span>
                  </Button>
                </div>
              )}
            </>
          </div>
        </Card>
      </div>

      <Card extra={"w-full h-full p-6 sm:overflow-x-auto mb-5"}>
        <p className="mr-1 font-bold text-brand-500 dark:text-white">About:</p>
        {isEmployer ? (
          <p>
            {user?.about == null || user?.about?.length < 1
              ? "please include information about your business"
              : user?.about}
          </p>
        ) : (
          <p>
            {user?.employer?.about == null || user?.employer?.about?.length < 1
              ? "about information has not been included yet"
              : user?.employer?.about}
          </p>
        )}
      </Card>

      <Card extra={"w-full h-full p-6 sm:overflow-x-auto mb-5"}>
        <p className="mr-1 font-bold text-brand-500 dark:text-white">
          Business Caption:
        </p>

        {isEmployer ? (
          <p>
            {user?.caption == null || user?.caption?.length < 1
              ? "no Business Caption yet"
              : user?.caption}
          </p>
        ) : (
          <p>
            {user?.employer?.caption == null ||
            user?.employer?.caption?.length < 1
              ? "no Business Caption yet"
              : user?.employer?.caption}
          </p>
        )}
      </Card>

      <Card extra={"w-full h-full p-6 sm:overflow-x-auto mb-5"}>
        <p className="mr-1 font-bold text-brand-500 dark:text-white">
          Services:
        </p>

        {isEmployer ? (
          <p>
            {user?.services == null || user?.services?.length < 1
              ? "No services yet"
              : user?.services}
          </p>
        ) : (
          <p>
            {user?.employer?.services == null ||
            user?.employer?.services?.length < 1
              ? "No services yet"
              : user?.services}
          </p>
        )}
      </Card>

      <Card extra={"w-full h-full p-6 sm:overflow-x-auto mb-5"}>
        <p className="mr-1 font-bold text-brand-500 dark:text-white">
          Terms and Conditions:
        </p>

        {isEmployer ? (
          <p>
            {user?.termsAndConditions == "null" ||
            user?.termsAndConditions?.length < 1
              ? "No Terms yet"
              : user?.termsAndConditions}
          </p>
        ) : (
          <p>
            {user?.termsAndConditions == "null" ||
            user?.termsAndConditions?.length < 1
              ? "no business Terms"
              : user?.termsAndConditions}
          </p>
        )}
      </Card>

      <Card extra={"w-full h-full p-6 sm:overflow-x-auto mb-5"}>
        <p className="mr-1 font-bold text-brand-500 dark:text-white">
          Privacy Policy:
        </p>

        {isEmployer ? (
          <p>
            {user?.privacyPolicy == "null" || user?.privacyPolicy?.length < 1
              ? "No business privacy policy"
              : user?.privacyPolicy}
          </p>
        ) : (
          <p>
            {user?.employer?.privacyPolicy == "null" ||
            user?.employer?.privacyPolicy?.length < 1
              ? "no business privacy policy"
              : user?.employer?.privacyPolicy}
          </p>
        )}
      </Card>

      {openEditModal && (
        <Modal
          styling="w-3/6 p-5"
          onClose={() => {
            setOpenEditModal(false);
          }}
        >
          <form onSubmit={(e) => updateProfile(e)}>
            <p className="text-black mb-5 font-bold">Update Profile</p>

            <InputField
              variant="auth"
              extra="mb-3"
              label="Name*"
              id="name"
              type="text"
              name="name"
              value={profile?.name}
              onChange={handleProfileChange}
              onFocus={() => {
                if (errors?.Name && errors?.Name?.length > 0) {
                  updateError("Name");
                }
              }}
              error={errors?.Name}
            />

            <InputField
              variant="auth"
              extra="mb-3"
              label="Head Office Address"
              id="headOfficeAddress"
              type="text"
              name="headOfficeAddress"
              value={profile?.headOfficeAddress}
              onChange={handleProfileChange}
            />

            <InputField
              variant="auth"
              extra="mb-3"
              label="Contact Line"
              id="contactLine"
              type="text"
              name="contactLine"
              value={profile?.contactLine}
              onChange={handleProfileChange}
            />

            <InputField
              variant="auth"
              extra="mb-3"
              label="Store Front Link"
              id="weblink"
              type="text"
              name="weblink"
              value={profile?.weblink}
              onChange={handleProfileChange}
            />

            <TextField
              ref={null}
              extra="mb-3"
              rows={5}
              variant="auth"
              label="About Business"
              id="about"
              type="text"
              name="about"
              value={profile?.about}
              onChange={handleProfileChange}
            />

            <TextField
              ref={null}
              extra="mb-3"
              rows={5}
              variant="auth"
              label="Business Caption"
              id="caption"
              type="text"
              name="caption"
              value={profile?.caption}
              onChange={handleProfileChange}
            />

            <TextField
              ref={null}
              extra="mb-3"
              rows={5}
              variant="auth"
              label="Services"
              id="services"
              type="text"
              name="services"
              value={profile?.services}
              onChange={handleProfileChange}
            />

            <TextField
              ref={null}
              extra="mb-3"
              rows={5}
              variant="auth"
              label="Terms and Conditions"
              id="termsAndConditions"
              type="text"
              name="termsAndConditions"
              value={profile?.termsAndConditions}
              onChange={handleProfileChange}
            />

            <TextField
              ref={null}
              extra="mb-3"
              rows={5}
              variant="auth"
              label="Privacy Policy"
              id="privacyPolicy"
              type="text"
              name="privacyPolicy"
              value={profile?.privacyPolicy}
              onChange={handleProfileChange}
            />

            <UploadField
              boxStyle="mb-[24px]"
              label="Upload Logo of Business"
              name="logo"
              onChange={setProfile}
            />

            <div className="mb-5 flex flex-wrap gap-2">
              {profile &&
                profile?.logo?.length > 0 &&
                Array.from(profile?.logo)?.map(
                  (file: any, index: number) => (
                    <div key={file?.name} className="h-[80px] w-[80px]">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`logo${index}`}
                      />
                    </div>
                  )
                )}
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                onClick={() => {
                  setOpenEditModal(false);
                }}
                style={`linear mb-5 mt-3 w-full rounded-md bg-red-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-red-600 active:bg-red-700 dark:bg-red-400 dark:text-white dark:hover:bg-red-300 dark:active:bg-red-200 text-xs`}
              >
                Cancel
              </Button>
              <button
                className={`linear mb-5 mt-3 w-full rounded-md bg-green-500 py-[12px] text-base text-xs font-medium text-white transition duration-200 hover:bg-green-600 active:bg-green-700 dark:bg-green-400 dark:text-white dark:hover:bg-green-300 dark:active:bg-green-200`}
              >
                Edit Profile
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
