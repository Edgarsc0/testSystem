import axios from 'axios';
import React, { useEffect, useState } from 'react';


const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [base64Data, setBase64Data] = useState('');
  const [pesoCadena, setPesoCadena] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.post("/api/FileSaver", {
          base64: base64Data
        });
        console.log(data);
      } catch (error) {
        if (error.response && error.response.status == 413) {
          console.log("Se detecto un error 413");
        }else{
          console.error(error);
        }
      }
    }
    if(pesoCadena){
      fetchData()
    };
  }, [pesoCadena])

  useEffect(() => {
    getBase64SizeInMB()
  }, [base64Data]);

  useEffect(() => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64EncodedData = reader.result;
        setBase64Data(base64EncodedData);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile])

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const getFileSizeInMB = (file) => {
    if (file) {
      const fileSizeInBytes = file.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      return fileSizeInMB.toFixed(10);
    }
    return '';
  };

  const getBase64SizeInMB = () => {
    if (base64Data) {
      console.log(base64Data);
      const stringLengthInBytes = (base64Data.length * 0.75) / (1024 * 1024);
      setPesoCadena(stringLengthInBytes.toFixed(10));
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Nombre del archivo: {selectedFile.name}</p>
          <p>Tamaño del archivo: {getFileSizeInMB(selectedFile)} MB</p>
        </div>
      )}
      {pesoCadena && (
        <div>
          <p>Tamaño de la cadena base64: {pesoCadena} MB</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
