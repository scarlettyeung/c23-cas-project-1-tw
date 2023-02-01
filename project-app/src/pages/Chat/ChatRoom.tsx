import React, { useEffect, useState } from "react";
import AOS from "aos";
// internal imports
import "./Chat.css";
import "aos/dist/aos.css";

// initialization
AOS.init();

function ChatRoom() {
  const [number, setNumber] = useState<number>()

  const contact = `https://wa.me/852${number}`

  const uuid = "7f496a35-7d51-4084-8441-13d5c43e3650"


  // console.log(data)
  useEffect(() => {
    async function getNumber() {
      const jwt = localStorage.getItem('token');
      const path = process.env.REACT_APP_API_BASE;
      let data = await fetch(`${path}users/contact/${uuid}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      }
      )
      let result = await data.json()

      return (
        setNumber(result.contactData.performers[0].contact_number)
      )
    }
    getNumber()
  }, [])
  return (

    <div>
      <a
        href={contact}
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="../../../public/Whatsapp.png" alt="whatsapp" />
      </a>
    </div >
  );
}

export default ChatRoom;

