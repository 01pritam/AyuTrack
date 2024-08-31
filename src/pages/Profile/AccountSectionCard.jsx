import React from 'react';

const AccountSectionCard = ({ title, description, image }) => {
  return (
    <div className="flex flex-col justify-between max-w-sm h-full bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-700 ">
      <a href="#">
        <img className="rounded-t-lg w-full bg-cover max-h-40" src={image} alt={title} />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-black dark:text-black">
            {title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-800">
          {description}
        </p>
        <div className="flex pt-4 mt-auto justify-start">
        <a
          href="#"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-400 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Learn more
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
      </div>
    </div>
  );
};

export default AccountSectionCard;
