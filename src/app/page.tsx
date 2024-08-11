'use client'
import CreateList from '@/components/CreateList'
import { useState } from 'react';



export default function Home() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');



  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Save Todo
          </button>
        </form>
      </div>
      <CreateList title={title} description={description} setTitle={setTitle} setDescription={setDescription} />
    </>
  );
}
