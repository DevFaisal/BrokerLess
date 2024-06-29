import React from "react";
import { H2 } from "../Index";

function AuthContainer({ children, logo, text, bgColorleft, bgColorright }) {
  return (
    <div className="flex flex-col-reverse md:flex-row-reverse">
      <aside
        className={`bg-transparent flex justify-center items-center py-5 h-screen w-full md:w-1/2 max-w-2/5`}
      >
        <div className="px-4 py-2 md:p-5 bg-slate-100 mx-5 2xl:mx-40 md:w-full rounded-md max-auto  shadow-xl  ring-1 ring-gray-100">
          {children}
        </div>
      </aside>
      <aside
        className={`hidden  md:flex flex-col justify-center items-start p-4 md:h-screen w-full md:w-1/2 max-w-2/5`}
      >
        <p>
          <img width={900} className="text-black " src={logo} alt="logo" />
        </p>
        <H2 className="mb-5">{text[0]?.text}</H2>
        <ul className="text-gray-700 leading-4 font-light">
          {text[0].list?.map((item, index) => (
            <li key={index} className="mb-2">
              {item}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

export default AuthContainer;
