```
import React from 'react';
import { useParams } from 'react-router-dom';
import GravityForm from '../components/GravityForm';

const DynamicFormPage = () => {
    const { id } = useParams();
    
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Form Application</h1>
            <div className="border-t border-gray-200 pt-6">
                <GravityForm formId={id} />
             </div>
        </div>
    );
};

export default DynamicFormPage;
```
