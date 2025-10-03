import React from "react";
import logo from "../../assets/icons/logo.png";
function AuthSideImage({ children }) {
  const styles = {
    backgroundColor: "#1c7de7",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232884e8' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E\")",
    backgroundRepeat: "repeat",
    backgroundSize: "20px 20px",
  };

  return (
    <div
      className="lg:h-screen lg:w-[30rem] lg:top-0 lg:left-0 sticky"
      style={styles}
    >
      <header className="lg:hidden flex w-full flex-col justify-center items-center py-4">
        <img src={logo} alt="Dern Support" className="h-40 w-50 mt-[-50px]" />
        <h1 className="text-white text-2xl font-bold">Dern Support</h1>
      </header>
      <div className="hidden lg:block">{children}</div>
    </div>
  );
}

export default AuthSideImage;
