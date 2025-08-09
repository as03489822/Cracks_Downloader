'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AddCrack from '@/component/AddCrack'; // your form component

export default function EditCrackPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (!id) return;

    // Fetch the crack data from API
    const fetchCrack = async () => {
      try {
        const res = await fetch(`/api/cracks/${id}`);
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCrack();
  }, [id]);

  if (!formData) return <p>Loading...</p>;

  return (
    <AddCrack initialData={formData} mode="edit" />
  );
}
