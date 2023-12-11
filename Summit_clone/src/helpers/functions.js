import { storage } from "../firebase";

export const getSender = (users, id) => {
    return users.find((user) => user.id === id);
  };
  export const getReceivers = (users, id) => {
    return users.filter((user) => user.id !== id);
  };
  
  export const arrayEquals = (a, b) => {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  };
  
  export const getExtension = (uri) => {
    let filename = uri.substring(uri.lastIndexOf("/") + 1);
    const extension = filename.split(".").pop();
    return extension;
  };
  
  export const getProperFileName = (filename, extension) => {
    const name = filename.split(".").slice(0, -1).join(".");
    if(name.length < 10) {return filename}
    else {return   `${name.substring(0,4)}...${name.substring(name.length - 3)}.${extension}`}
  }

  const uploadFile = (file, childPath, setUploading) => {
    return new Promise((resolve, reject) => {
      let uploadTask = storage.ref().child(childPath).put(file);
      let taskProgress = (snapshot) => {};
      let taskError = (error) => {
        // console.log("This is the error in the uploadFile function ", { error });
        setUploading(false)
        reject({ message: "Failed", error });
      };
      let taskCompleted = () => {
        storage
          .ref()
          .child(childPath)
          .getDownloadURL()
          .then(async (url) => {
            resolve(url);
          })
          .catch((error) => {
            setUploading(false)
            reject(error);
          });
      };
      uploadTask.on("state_changed", taskProgress, taskError, taskCompleted);
    });
  };
  
  export const uploadImage = async (uri, setUploading, isFile) => {
  
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        // console.log(e);
        setUploading(false)
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    let filename = uri.substring(uri.lastIndexOf("/") + 1);
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;
    let path;
    if(isFile){
       path = "documents/" + filename;
    }
    else {
       path = "images/" + filename;
    }
    try {
      const url = await uploadFile(blob, path, setUploading);
      blob.close();
      return url;
    } catch (error) {
      setUploading(false)
      // console.log("This is the error in uploadImage function ", error);
      blob.close();
      throw error
    }
  };


  