"use client";
import { ExtendedCloudinaryUploadWidgetResults } from "@/business/ownerUser/interfaces/cldUploadResults";
import { useEffect, useState } from "react";

type ResponseType = {
  msg: string;
  status: number;
};

function SubmitImageData({
  resultData,
  resetResultData,
}: {
  resultData: ExtendedCloudinaryUploadWidgetResults | null;
  resetResultData: () => void;
}) {
  const [formData, setFormData] = useState({
    url: resultData?.info.url,
    title: "",
    description: "",
    date: "",
  });
  useEffect(() => {
    if (resultData?.info.url) {
      setFormData((prev) => ({
        ...prev,
        url: resultData.info.url,
      }));
    }
  }, [resultData]);
  const [message, setMessage] = useState<ResponseType>({
    msg: "",
    status: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.url || formData.url === "") {
      setMessage({ msg: "La URL de la imagen es requerida", status: 400 });
      return;
    }
    try {
      const response = await fetch("/api/ownerUsers/post", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result: ResponseType = await response.json();
      if (!response.ok) {
        setMessage({ msg: `Error: ${result.msg}`, status: result.status });
        console.log("Error al guardar los datos en firebase");
        return;
      }
      console.log("result", result.msg);
      console.log("result", result.status);
      setMessage({ msg: `${result.msg}`, status: result.status });
      setFormData({
        url: "",
        title: "",
        description: "",
        date: "",
      });
      setTimeout(() => {
        setMessage({
          msg: "",
          status: 0,
        });
        resetResultData();
      }, 1500);
    } catch (error: any) {
      console.error("Error al enviar la solicitud:", error);
    }
  };
  return (
    <>
      {resultData && (
        <section className="w-full h-full p-16 flex flex-col items-center gap-10 bg-blue-600 overflow-y-visible">
          <div className="flex items-center justify-center w-11/12">
            <img
              src={resultData.info.url}
              alt={resultData.info.public_id}
              className="w-1/2 rounded-md max-sm:w-full"
            />
          </div>
          {message.status !== 0 && (
            <p
              className={`mt-4 mb-4 text-xl font-semibold
                ${
                  message.status === 200
                    ? "text-success"
                    : message.status === 500
                    ? "text-danger"
                    : message.status === 400
                    ? "text-yellow-45"
                    : "text-white"
                }
              `}
            >
              {message.msg}
            </p>
          )}
          <div className="w-full h-full overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-white"
                >
                  Título (Opcional)
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-white"
                >
                  Descripción (Opcional)
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-white"
                >
                  Fecha (Opcional)
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enviar
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default SubmitImageData;
