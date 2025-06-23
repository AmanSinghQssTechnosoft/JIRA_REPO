import "./multipart.scss"
const MultiPort = () => {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form data here
    const file = e.target.elements.file.files[0];
     localStorage.setItem("file", file.name);
 
    if (!file) {
      console.error("No file selected");
      return;
    }

    console.log("form-image", file)
  };

  return (
    <form className="multi-port" onSubmit={handleSubmit} encType="multipart/form-data">
      <input type="file" name="file" />
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default MultiPort;
