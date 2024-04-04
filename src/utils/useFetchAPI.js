import React from "react";

const useFetchAPI = async () => {

//   const fetchUser = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.log("error in custom hook : ", error);
    }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   return fetchUser;
};

export default useFetchAPI;