import { useEffect, useState } from "react";
import { storeFile } from "../../context/slices/userSlice";
import { useDispatch } from "react-redux";
import { supabaseClient } from "../../supabase/supabaseClient";

const FileUpload: React.FC<any> = ({ file }) => {
    const [uploadFile, setUploadFile] = useState<any>(file);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const dispatch = useDispatch();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setUploadFile(selectedFile);
        dispatch(storeFile(selectedFile));
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreviewUrl(e.target?.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setImagePreviewUrl(null);
        }
    };

    useEffect(() => {
        if (file) {
            setUploadFile(file);
            setImagePreviewUrl(URL.createObjectURL(file));
        }
    }, [file]);

    const handleCancelFileUpload = () => {
        setUploadFile(null);
        dispatch(storeFile(null));
    };

    const handleFileUpload = async () => {
        if (!uploadFile) return;

        const fileExt = uploadFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;
        const fileType = uploadFile.type;
        const { data, error } = await supabaseClient.storage.from("supabase-chat").upload(filePath, uploadFile);
        if (error) console.log(error, data);

        const { data: url } = await supabaseClient.storage.from("supabase-chat").getPublicUrl(filePath);
        await sendMessage(url, fileType)
    }

    const sendMessage = async (imageUrl: any, fileType: any) => {
        const { error } = await supabaseClient.from("messages").insert({ message: imageUrl, is_file: true, file_type: fileType });
        if (error) console.log("error:", error);
        handleCancelFileUpload();
    };

    return (
        <section className="col-start-9 col-end-13 p-3 rounded-lg">
            <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden items-center">
                <div className="px-4 py-6">
                    <div
                        id="image-preview"
                        className="max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 border-gray-400 rounded-lg items-center mx-auto text-center cursor-pointer"
                    >
                        <input
                            id="upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {uploadFile && imagePreviewUrl ? (
                            <img
                                src={imagePreviewUrl}
                                className="max-h-48 rounded-lg mx-auto"
                                alt="Image preview"
                                onClick={() => document.getElementById("upload")?.click()}
                            />
                        ) : (
                            <label htmlFor="upload" className="cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-8 h-8 text-gray-700 mx-auto mb-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                                    />
                                </svg>
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">
                                    Upload picture
                                </h5>
                                <p className="font-normal text-sm text-gray-400 md:px-6">
                                    Choose photo size should be less than{" "}
                                    <b className="text-gray-600">2mb</b>
                                </p>
                                <p className="font-normal text-sm text-gray-400 md:px-6">
                                    and should be in{" "}
                                    <b className="text-gray-600">JPG, PNG, or GIF</b> format.
                                </p>
                                <span
                                    id="filename"
                                    className="text-gray-500 bg-gray-200 z-50"
                                ></span>
                            </label>
                        )}
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-3/4">
                            <label className="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer"
                                onClick={handleFileUpload}>
                                <span className="text-center ml-2">Upload</span>
                            </label>
                        </div>
                        <div className="w-1/4">
                            <label
                                className="w-full text-white bg-[#ff4229] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer"
                                onClick={handleCancelFileUpload}
                            >
                                <span className="text-center ml-2">Cancel</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FileUpload;
