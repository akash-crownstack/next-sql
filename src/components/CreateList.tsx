'use client';
import { db } from '@/utils/db';
import { useState } from 'react';

const CreateList = ({ title, description, setTitle, setDescription }: any) => {


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await db.$executeRaw`
        INSERT INTO "Lists" ("title", "description", "isCompleted", "isDeleted") 
        VALUES (${title}, ${description}, false, false)
      `;

      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to save todo:', error);
    }
  };
  return (
    <div>
      <input type="text" className='flex justify-center items-center' />
    </div>
  );
};

export default CreateList;
