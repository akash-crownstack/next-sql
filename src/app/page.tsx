"use client";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import { Table } from "flowbite-react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      title: title,
      description: description,
    };
    try {
      setLoading(true);
      const res = await axios.post("api/add-todo", data);
      setLoading(false);
      console.log(res, "response");
      getTodo();
      alert("Item added successfully");
    } catch (err) {
      console.log(err, "err");
    }
  };

  const getTodo = async () => {
    try {
      const response = await axios.get("api/get-todo");
      console.log(response);
      setData(response.data);
    } catch (err) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  console.log(data, "data");

  return (
    <>
      <div className="h-[100vh]">
        <form
          className="flex gap-8 items-center justify-center py-5"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <input
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              className="bg-gray-50 border h-[100px] w-[250px] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {loading ? "Adding..." : "Add Todo"}
          </button>
        </form>
        <div className="overflow-x-auto">
          {data ? (
            <Table>
              <Table.Head>
                <Table.HeadCell>Title</Table.HeadCell>
                <Table.HeadCell>Description</Table.HeadCell>
                <Table.HeadCell>Completed</Table.HeadCell>
                {/* <Table.HeadCell>Price</Table.HeadCell> */}
                <Table.HeadCell>
                  <span className="sr-only">Edit</span>
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {data.map((item: any, index: number) => (
                  <Table.Row
                    key={index}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell>{item.title}</Table.Cell>
                    <Table.Cell>{item.description}</Table.Cell>
                    <Table.Cell>{item.completed ? "Yes" : "No"}</Table.Cell>
                    <Table.Cell>
                      <span className="sr-only">Edit</span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : null}
        </div>
      </div>
      {/* <CreateList
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
      /> */}
    </>
  );
}
