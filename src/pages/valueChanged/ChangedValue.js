import React, { useEffect, useState } from "react";
import "./ChangedValue.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ChangedValue() {
  // after add this code

  const navigate = useNavigate();
  const [navData, setNavdata] = useState({
    activeUsers: "",
    stakedValue: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "https://presale-backend-nine.vercel.app/api/v1/updateValues",
        navData
      );

      // Handle successful response
      if (response?.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  useEffect(() => {
    const fetchNavData = () => {
      axios
        .get("https://presale-backend-nine.vercel.app/api/v1/getValues")
        .then((response) => {
          if (response.status === 200) {
            setNavdata(response.data?.data[0]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    fetchNavData();
  }, []);

  return (
    <>
      <div className="w-full flex items-center justify-center h-[100vh] bg-gradient-to-br from-[#0a0e1a] via-[#1a1f2e] to-[#0f1419]">
        <div className="">
          <form onSubmit={handleSubmit} className="changedForm">
            <div>
              <label htmlFor="active">Active Users</label>
              <br />
              <input
                type="number"
                required
                name="activeUsers"
                value={navData.activeUsers}
                onChange={(e) =>
                  setNavdata({ ...navData, activeUsers: e.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="stack">Value Stack</label>
              <br />
              <input
                type="number"
                name="stakedValue"
                required
                value={navData.stakedValue}
                onChange={(e) =>
                  setNavdata({ ...navData, stakedValue: e.target.value })
                }
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangedValue;
