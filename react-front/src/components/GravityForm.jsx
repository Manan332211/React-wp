import React, { useState, useEffect } from 'react';
import { fetchGravityForm, submitGravityForm } from '../services/wp-api';

const GravityForm = () => {
    const [formSchema, setFormSchema] = useState(null); // WP  structure
    const [formData, setFormData] = useState({}); // User  input data store
    const [loading, setLoading] = useState(true);

    // 1. API Form Data fetch
    useEffect(() => {
        const fetchForm = async () => {
            try {
                // Use service instead of hardcoded fetch
                const data = await fetchGravityForm(1);

                if (data) {
                    console.log("Success! Data:", data);
                    setFormSchema(data);
                } else {
                    console.error("Failed to load form data (null returned)");
                }

            } catch (error) {
                console.error("Error fetching form:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchForm();
    }, []);

    // 2. Input Change Handle 
    const handleChange = (fieldId, subId, value) => {
        // if simple field  then key "input_1", complex then "input_1_3"
        const key = subId ? `input_${fieldId}_${subId}` : `input_${fieldId}`;

        setFormData(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // 3. Field Renderer (Main Logic)
    // this function decide which component to render
    const renderField = (field) => {

        // CASE A: Complex Fields (e.g., Name field with First, Last)
        if (field.type === 'name' && field.inputs) {
            return (
                <div className="grid grid-cols-2 gap-4">
                    {field.inputs.map(input => {
                        if (input.isHidden) return null; // Prefix/Suffix hidden then skip

                        // Sub-ID get (e.g., "1.3" -> "3")
                        const subId = input.id.split('.')[1];

                        return (
                            <div key={input.id}>
                                <label className="block text-xs text-gray-500 mb-1">{input.label}</label>
                                <input
                                    type="text"
                                    placeholder={input.label}
                                    className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none"
                                    onChange={(e) => handleChange(field.id, subId, e.target.value)}
                                />
                            </div>
                        );
                    })}
                </div>
            );
        }

        // CASE B: Standard Fields (Text, Email, Number, Textarea)
        switch (field.type) {
            case 'textarea':
                return (
                    <textarea
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none"
                        onChange={(e) => handleChange(field.id, null, e.target.value)}
                    />
                );

            case 'select':
                return (
                    <select
                        className="w-full p-2 border border-gray-300 rounded"
                        onChange={(e) => handleChange(field.id, null, e.target.value)}
                    >
                        {field.choices?.map(choice => (
                            <option key={choice.value} value={choice.value}>{choice.text}</option>
                        ))}
                    </select>
                );

            // Default covers: text, email, number, phone
            default:
                return (
                    <input
                        type={field.type === 'phone' ? 'tel' : field.type}
                        className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none"
                        onChange={(e) => handleChange(field.id, null, e.target.value)}
                    />
                );
        }
    };

    if (loading) return <div className="text-center p-10">Loading Form...</div>;
    if (!formSchema) return <div className="text-center p-10 text-red-500">Failed to load form-1</div>;

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-2xl font-bold mb-2">{formSchema.title}</h1>
            <p className="text-gray-600 mb-6">{formSchema.description}</p>

            <form onSubmit={async (e) => {
                e.preventDefault();
                console.log("Data to Submit:", formData);

                // Submit to WP
                const result = await submitGravityForm(formSchema.id, formData);
                console.log("Submission Result:", result);

                if (result?.is_valid) {
                    alert("Form Submitted Successfully!");
                    // Optional: Reset form or redirect
                } else {
                    alert("Submission Failed. Check console.");
                }
            }}>

                {/* Here MAGIC : Fields array mapping */}
                {formSchema.fields.map((field) => (
                    <div key={field.id} className="mb-5">
                        <label className="block font-medium text-gray-700 mb-1">
                            {field.label}
                            {field.isRequired && <span className="text-red-500 ml-1">*</span>}
                        </label>

                        {/* Dynamic Field Call */}
                        {renderField(field)}

                        {field.description && (
                            <p className="text-sm text-gray-400 mt-1">{field.description}</p>
                        )}
                    </div>
                ))}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    {formSchema.button?.text || 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default GravityForm;