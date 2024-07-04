import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../supabase";

const LoginPage = () => {
    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{
                backgroundImage:
                    "url(https://4kwallpapers.com/images/wallpapers/dark-background-abstract-background-network-3d-background-2560x1440-8324.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
                <div className="flex items-center justify-center w-full lg:p-12">
                    <div className="flex items-center xl:p-10">
                        <Auth
                            supabaseClient={supabase}
                            providers={["google"]}
                            appearance={{ theme: ThemeSupa }}
                            onlyThirdPartyProviders={true}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
