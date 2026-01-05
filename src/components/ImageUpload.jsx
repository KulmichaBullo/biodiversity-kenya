import React, { useState, useRef } from 'react';
import { Upload, X, Camera } from 'lucide-react';

const ImageUpload = ({ onImageSelect, onClear }) => {
    const [preview, setPreview] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef(null);

    const handleFile = (file) => {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('Image size must be less than 5MB');
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);

        // Pass file to parent
        onImageSelect(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleClear = () => {
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        onClear();
    };

    return (
        <div className="w-full">
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                id="image-upload"
            />

            {!preview ? (
                <label
                    htmlFor="image-upload"
                    className={`flex flex-col items-center justify-center w-full h-96 border-2 border-dashed rounded-3xl cursor-pointer transition-all ${dragActive
                            ? 'border-green-500 bg-green-500/10'
                            : 'border-slate-700 bg-slate-900/50 hover:border-green-500/50 hover:bg-slate-800/50'
                        }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className={`w-16 h-16 mb-4 ${dragActive ? 'text-green-500' : 'text-slate-500'}`} />
                        <p className="mb-2 text-lg font-semibold text-slate-300">
                            <span className="text-green-500">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-slate-500">PNG, JPG, JPEG (MAX. 5MB)</p>

                        {/* Mobile: Camera option */}
                        <div className="mt-6 flex gap-4">
                            <label
                                htmlFor="image-upload"
                                className="px-6 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/20 flex items-center gap-2"
                            >
                                <Upload className="w-4 h-4" />
                                Choose File
                            </label>
                        </div>
                    </div>
                </label>
            ) : (
                <div className="relative w-full h-96 rounded-3xl overflow-hidden border-2 border-slate-800 bg-slate-950">
                    <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-contain"
                    />
                    <button
                        onClick={handleClear}
                        className="absolute top-4 right-4 p-2 bg-black/70 hover:bg-red-600 text-white rounded-full backdrop-blur transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;
