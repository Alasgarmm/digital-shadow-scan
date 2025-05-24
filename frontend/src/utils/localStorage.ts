const convertBase64ToFiles = (filesData: any[]): File[] => {
    return filesData.map(fileData => {
      // Remove the data URL prefix to get pure base64
      const base64Data = fileData.data.split(',')[1];

      // Convert base64 to binary
      const byteCharacters = atob(base64Data);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      // Create File object
      const file = new File([byteArray], fileData.name, {
        type: fileData.type,
        lastModified: fileData.lastModified
      });

      return file;
    });
  };

  // Function to retrieve form data from localStorage
  export const retrieveStoredFormData = (): any | null => {
    try {
      const storedData = localStorage.getItem('scanFormData');

      if (!storedData) {
        console.log("No stored form data found");
        return null;
      }

      const parsedData = JSON.parse(storedData);

      // Convert base64 files back to File objects
      if (parsedData.files && parsedData.files.length > 0) {
        parsedData.files = convertBase64ToFiles(parsedData.files);
      }

      console.log("Retrieved and converted form data:", parsedData);
      return parsedData;

    } catch (error) {
      console.error("Error retrieving stored form data:", error);
      // Clear corrupted data
      localStorage.removeItem('scanFormData');
      return null;
    }
  };