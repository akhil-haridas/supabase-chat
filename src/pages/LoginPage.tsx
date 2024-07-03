import React from "react";

const LoginPage = () => {
    return (

        <div className="container flex flex-col mx-auto bg-white rounded-lg pt-12 my-5">
            <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                <div className="flex items-center justify-center w-full lg:p-12">
                    <div className="flex items-center xl:p-10">
                        <form className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl">
                            <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                                Sign In
                            </h3>
                            <a className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300">
                                <img
                                    className="h-5 mr-2"
                                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                                    alt=""
                                />
                                Sign in with Google
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
