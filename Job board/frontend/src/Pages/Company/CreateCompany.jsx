import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createCompany } from "../../Redux/Slices/companyCreateSlice";
import { BsPersonCircle } from "react-icons/bs";
import ReactQuill from 'react-quill';

const CreateCompany = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const quillRef = useRef(null);

    const [createNewCompany, setCompany] = useState({
        nameOfCompany: '',
        aboutCompany: '',
        companyLogo: '',
    });

    const [previewImage, setPreviewImage] = useState("");

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setCompany({
            ...createNewCompany,
            [name]: value
        });
    };

    const handleQuillChange = (value) => {
        setCompany({
            ...createNewCompany,
            aboutCompany: value
        });
    };

    const getImage = (event) => {
        const uploadImage = event.target.files[0];

        if (uploadImage) {
            setCompany({
                ...createNewCompany,
                companyLogo: uploadImage
            });

            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.onloadend = () => {
                setPreviewImage(fileReader.result);
            };
        }
    };

    const createNewCompanyHandler = async (event) => {
        event.preventDefault();

        // Basic validation
        if (!createNewCompany.nameOfCompany || !createNewCompany.aboutCompany || !createNewCompany.companyLogo) {
            toast.error("Please fill all the details");
            return;
        }

        // Use FormData to handle file upload
        const formData = new FormData();
        formData.append('nameOfCompany', createNewCompany.nameOfCompany);
        formData.append('aboutCompany', createNewCompany.aboutCompany);
        formData.append('companyLogo', createNewCompany.companyLogo);

        try {
            console.log("Dispatching createCompany action with data:", createNewCompany);
            const response = await dispatch(createCompany(formData)); // Send FormData to the backend

            console.log("Response from createCompany:", response);

            if (response?.payload?.success) {
                toast.success("Company created successfully!");
                navigate("/post-job");
            } else {
                throw new Error(response?.payload?.message || "Failed to create company");
            }
        } catch (error) {
            console.error("Error creating company:", error);
            toast.error(`Error: ${error.message}`);
        }

        // Reset form state
        setCompany({
            nameOfCompany: '',
            aboutCompany: '',
            companyLogo: '',
            user: ''
        });

        setPreviewImage(""); // Reset the image preview
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Company Details</h2>
            <form onSubmit={createNewCompanyHandler}>
                <div className="mb-4">
                    <label htmlFor="image_uploads" className="cursor-pointer">
                        {previewImage ? (
                            <img className="w-24 h-24 rounded-full m-auto" src={previewImage} alt="Preview" />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>
                    <input
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        name="companyLogo"
                        id="image_uploads"
                        accept=".jpg, .jpeg, .png, .svg"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Name of Company:</label>
                    <input
                        className="w-full px-3 py-2 border rounded-md"
                        type="text"
                        name="nameOfCompany"
                        value={createNewCompany.nameOfCompany}
                        onChange={handleUserInput}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">About Your Company:</label>
                    <ReactQuill
                        ref={quillRef}
                        value={createNewCompany.aboutCompany}
                        onChange={handleQuillChange}
                        modules={{
                            toolbar: [
                                ['bold', 'italic', 'underline'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                ['clean']
                            ]
                        }}
                        className="border rounded-md h-40"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700"
                >
                    Next
                </button>
            </form>
        </div>
    );
};

export default CreateCompany;
