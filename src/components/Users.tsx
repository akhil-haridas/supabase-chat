import { useEffect, useState } from "react";
import User from "./utils/User";
import { supabaseAdmin } from "../supabase/supabaseAdmin";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../context/store";
import { setUsersData } from "../context/slices/userSlice";

const Chatlist = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.user.userData);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data, error: apiError } = await supabaseAdmin.auth.admin.listUsers();
                if (apiError) {
                    setError(apiError.message);
                    return;
                }
                dispatch(setUsersData(data.users));
                setUsers(data.users.filter((user: any) => user.id !== userData?.id));
            } catch (err) {
                console.error("Error fetching users:", err);
                setError("An error occurred while fetching users.");
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex flex-col mt-8 max-h-70">
            <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Members</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                    {users?.length}
                </span>
            </div>
            {error ? (
                <div className="text-red-500 mt-4">Error: {error}</div>
            ) : (
                <div className="flex flex-col mt-4 -mx-2 mb-4 overflow-y-auto">
                    {users.map((user: any) => (
                        <User key={user.id} user={user?.user_metadata} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Chatlist;
