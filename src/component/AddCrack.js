'use client';
import React, { useState, useEffect } from 'react';

const AddCrack = ({ initialData, mode = 'add' }) => {
  const [form, setForm] = useState({
    title: '',
    date: '',
    author: 'CrackingCity',
    comments: 0,
    category: '',
    tags: '',
    image: '',
    shortDescription: '',
    fullDescription: '',
    slug: '',
    details: {
      description: '',
      overview: '',
      features: ['','','',''],
      supported_browsers: ['','',''],
      file_types: ['','',''],
      what_is_new: {
        version: '',
        release_date: '',
        changes: '',
      },
      system_requirements: {
        os: '',
        memory: '',
        storage: '',
      },
      installation_steps: ['','','','',''],
      download: {
        link_text: '',
        password: '',
      },
    },
  });

  // Pre-fill form if editing
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm(initialData);
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    setForm((prev) => {
      let obj = { ...prev };
      let ref = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        ref = ref[keys[i]];
      }
      ref[keys[keys.length - 1]] = value;
      return { ...obj };
    });
  };

  const handleArrayInput = (field, index, value) => {
    setForm((prev) => {
      const updated = [...prev.details[field]];
      updated[index] = value;
      return {
        ...prev,
        details: {
          ...prev.details,
          [field]: updated,
        },
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
      comments: Number(form.comments),
    };

    const method = mode === 'edit' ? 'PUT' : 'POST';
    const endpoint = mode === 'edit'
      ? `/api/cracks/${initialData.id}`
      : `/api/cracks`;

    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend),
    });

    if (res.ok) {
      alert(`Crack ${mode === 'edit' ? 'updated' : 'added'} successfully!`);
    } else {
      alert('Error saving data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{mode === 'edit' ? 'Edit Crack' : 'Add Crack'}</h1>
      {/* your form fields exactly as before */}
    </form>
  );
};

export default AddCrack;
