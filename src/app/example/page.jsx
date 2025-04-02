"use client";

export default function Page() {
  async function handleUpload(event) {
    const file = event.target.files[0];
  
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  
    const data = await res.json();
    console.log("Uploaded File URL:", data.url);
  }
  return (
   <div className='w-full h-full'>
    <input type="file" onChange={handleUpload} />
   </div>
  );
}