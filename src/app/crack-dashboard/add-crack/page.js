'use client';
import React, { useEffect, useState } from 'react';
import LeftSidebar from '@/component/LeftSidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AddCrack = () => {
    const { user, loading } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!loading && !user) {
        router.push("/dashboard-login");
      }
    }, [loading, user, router]);
  

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
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);


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

  const handleSubmit = async(e) => {
    e.preventDefault();
    const dataToSend = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
      comments: Number(form.comments),
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(dataToSend));
    formData.append("crackFile", file);
    formData.append("crackImage", image);
    try {
      const res = await fetch('/api/crack', {
        method: 'POST',
        body: formData,
      });
      const data = res.json();
      if (!res.ok) {
        toast.error(data.error);
        return;
      }
      toast.success(data.message);
      router.push("/crack-dashboard/cracks");
    } catch (err) {
      toast.error("Something went wrong. Please try again later.");
      console.error('Error submitting crack:', err);
    }
  };

  if (loading) return ;
  return (
    <div className='flex h-screen text-white'>
      <LeftSidebar className="w-64" />
      <div className='w-full bg-[#181D14] overflow-y-auto p-10'>
        <h1 className='text-4xl font-bold mb-6'>Add Crack</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="rounded w-full bg-[#242e24] p-2" />
          <input name="slug" value={form.slug} onChange={handleChange} placeholder="Slug" className="rounded w-full bg-[#242e24] p-2" />
          <input name="date" value={form.date} onChange={handleChange} type="date" className="rounded w-full bg-[#242e24] p-2" />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="rounded w-full bg-[#242e24] p-2" />
          <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma-separated)" className="rounded w-full bg-[#242e24] p-2" />
          <input name="image" type='file' onChange={(e) => setImage(e.target.files[0])} placeholder="Image" className="rounded w-full bg-[#242e24] p-2" />
          <textarea name="shortDescription" value={form.shortDescription} onChange={handleChange} placeholder="Short Description" className="rounded w-full bg-[#242e24] p-2" />
          <textarea name="fullDescription" value={form.fullDescription} onChange={handleChange} placeholder="Full Description" className="rounded  w-full bg-[#242e24] p-2" />

          <h2 className="text-2xl mt-4">Details</h2>
          <input name="details.description" value={form.details.description} onChange={handleDetailsChange} placeholder="Details Description" className="rounded  w-full bg-[#242e24] p-2" />
          <textarea name="details.overview" value={form.details.overview} onChange={handleDetailsChange} placeholder="Overview" className="rounded w-full bg-[#242e24] p-2" />

          {form.details.features.map((feature, idx) => (
            <input key={idx} placeholder={`Feature ${idx + 1}`} value={feature} onChange={(e) => handleArrayInput('features', idx, e.target.value)} className="rounded  w-full bg-[#242e24] p-2" />
          ))}

          {form.details.installation_steps.map((step, idx) => (
            <input key={idx} placeholder={`Step ${idx + 1}`} value={step} onChange={(e) => handleArrayInput('installation_steps', idx, e.target.value)} className= "rounded w-full bg-[#242e24] p-2" />
          ))}

          <h3 className="text-xl mt-4">What&apos;s New</h3>
          <input name="details.what_is_new.version" value={form.details.what_is_new.version} onChange={handleDetailsChange} placeholder="Version" className="rounded w-full bg-[#242e24] p-2" />
          <input name="details.what_is_new.release_date" value={form.details.what_is_new.release_date} onChange={handleDetailsChange} placeholder="Release Date" className="rounded w-full bg-[#242e24] p-2" />
          <textarea name="details.what_is_new.changes" value={form.details.what_is_new.changes} onChange={handleDetailsChange} placeholder="Changes" className="rounded w-full bg-[#242e24] p-2" />

          <h3 className="text-xl mt-4">System Requirements</h3>
          <input name="details.system_requirements.os" value={form.details.system_requirements.os} onChange={handleDetailsChange} placeholder="OS" className="rounded w-full bg-[#242e24] p-2" />
          <input name="details.system_requirements.memory" value={form.details.system_requirements.memory} onChange={handleDetailsChange} placeholder="Memory" className="rounded w-full bg-[#242e24] p-2" />
          <input name="details.system_requirements.storage" value={form.details.system_requirements.storage} onChange={handleDetailsChange} placeholder="Storage" className="rounded w-full bg-[#242e24] p-2" />

          <h3 className="text-xl mt-4">Upload Crack File</h3>
          <input 
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
            accept=".zip"
            className="rounded w-full bg-[#242e24] p-2"
          />


          <h3 className="text-xl mt-4">Download Info</h3>
          <input name="details.download.link_text" value={form.details.download.link_text} onChange={handleDetailsChange} placeholder="Download Link Text" className="rounded w-full bg-[#242e24] p-2" />
          <input name="details.download.password" value={form.details.download.password} onChange={handleDetailsChange} placeholder="Password" className="rounded w-full bg-[#242e24] p-2" />

          <button type="submit" className="bg-green-700 py-2 px-4 rounded hover:bg-green-600">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddCrack;
