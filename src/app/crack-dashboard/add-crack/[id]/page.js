'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import AddCrack from '@/component/AddCrack'; 
import LeftSideBar from '@/component/LeftSidebar'
import { useAuth } from '@/context/AuthContext';

export default function EditCrackPage() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/dashboard-login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!id) return;
    // Fetch the crack data from API
    const fetchCrack = async () => {
      try {
        const res = await fetch(`/api/crack/${id}`);
        if(res.ok){
          const data = await res.json();
          setFormData(data);
        }
      } catch (err) {
        console.error(err);
      } finally{

      }
    };

    fetchCrack();
  }, [id]);

  if (!formData || loading) return <p>Loading...</p>;

  return (
    <div className='flex h-screen text-white'>
      <LeftSideBar />
      <AddCrack initialData={formData} mode="edit" />
    </div>
  );
}
