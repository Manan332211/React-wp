import React, { useState, useEffect } from 'react';
import { fetchGravityForm, submitGravityForm } from '../services/wp-api';

const GravityForm = ({ formId }) => {
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    // Form load 
    useEffect(() => {
        const loadForm = async () => {
            const data = await fetchGravityForm(formId);
            setForm(data);
            setLoading(false);
        };
        loadForm();
    }, [formId]);

    // Form Submit Handle 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus(null);

        // 1. Data Collect
        const formData = new FormData(e.target);
        const submissionData = {};

        // Gravity Forms  keys "input_1", "input_2" format 
        formData.forEach((value, key) => {
            submissionData[key] = value;
        });

        // 2. API Call
        const result = await submitGravityForm(formId, submissionData);

        // 3. Response handle
        if (result.is_valid) {
            setStatus('success');
            e.target.reset(); // Form clear 
        } else {
            setStatus('error');
            console.log("Validation Errors:", result.validation_messages);
        }
    };

    if (loading) return <div>Loading Form...</div>;
    if (!form) return <div>Error loading form via API</div>;

    return (
        <div className="gf-form-wrapper">
            {status === 'success' && (
                <div className="alert-success" style={{ color: 'green', marginBottom: '10px' }}>
                    Thanks! Your form has been submitted.
                </div>
            )}
            {status === 'error' && (
                <div className="alert-error" style={{ color: 'red', marginBottom: '10px' }}>
                    There was a problem. Please check inputs.
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <h2>{form.title}</h2>
                <p>{form.description}</p>

                {/* Dynamic Field Mapping Loop */}
                {form.fields && form.fields.map((field) => (
                    <div key={field.id} className="form-field" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontWeight: 'bold' }}>
                            {field.label} {field.isRequired && <span style={{ color: 'red' }}>*</span>}
                        </label>

                        {/* INPUT TYPE CHECKER */}
                        {field.type === 'text' || field.type === 'email' || field.type === 'phone' ? (
                            <input
                                type={field.type === 'phone' ? 'tel' : field.type}
                                name={`input_${field.id}`} // GF requirement: input_{id}
                                required={field.isRequired}
                                placeholder={field.placeholder}
                                className="form-control"
                                style={{ width: '100%', padding: '8px' }}
                            />
                        ) : field.type === 'textarea' ? (
                            <textarea
                                name={`input_${field.id}`}
                                required={field.isRequired}
                                placeholder={field.placeholder}
                                className="form-control"
                                style={{ width: '100%', padding: '8px', minHeight: '100px' }}
                            />
                        ) : field.type === 'select' ? (
                            <select
                                name={`input_${field.id}`}
                                required={field.isRequired}
                                style={{ width: '100%', padding: '8px' }}
                            >
                                {field.choices.map((choice, index) => (
                                    <option key={index} value={choice.value}>{choice.text}</option>
                                ))}
                            </select>
                        ) : (
                            <p style={{ fontSize: '12px', color: 'gray' }}>Field type '{field.type}' not supported in this demo</p>
                        )}
                        <small>{field.description}</small>
                    </div>
                ))}

                <button
                    type="submit"
                    style={{ background: '#0073aa', color: '#fff', padding: '10px 20px', border: 'none', cursor: 'pointer' }}
                >
                    {form.button?.text || "Submit"}
                </button>
            </form>
        </div>
    );
};

export default GravityForm;