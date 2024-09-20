'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const Form = () => {

  const { t, i18n } = useTranslation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');

  const ResponseMessage = ({ message }) => {
    if (!message) return null;

    return (
      <div className="mt-6 text-center">
        <p className={`text-lg ${message === 'Message sent successfully!' ? 'text-green-900' : 'text-red-500'}`}>
          {message}
        </p>
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {


      const myHeaders = new Headers();
      myHeaders.append("Accept-Language", i18n.language);
      myHeaders.append("Cookie", "laravel_session=6oM3FFaszfcS2bV3nWtBQrSNpkdvu3BvQxhRc6h0");


      const formdata = new FormData();
      formdata.append("name", formData.name);
      formdata.append("phone", formData.phone);
      formdata.append("email", formData.email);
      formdata.append("message", formData.message);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      };
      const response = await fetch('https://api.classafoods.com/api/contact-submit', requestOptions);

      const result = await response.json();
      console.log(result)

      if (response.status && result.data) {
        setResponseMessage('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setResponseMessage('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('An error occurred. Please try again.', error);
    }

    setTimeout(() => {
      setResponseMessage('')
    }, 3000)
  };
  return (
    <form onSubmit={handleSubmit} className=' px-5 lg:px-28 py-10 text-center'>
      <div className='  lg:flex gap-4'>
        <input type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          required className='block mt-3  lg:mt-0 w-full border-gray-300 px-5 border-solid border-[1px] lg:w-1/3 py-2 placeholder:text-dark_gray' placeholder='Name' />
        <input type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required className='block mt-3  lg:mt-0 w-full border-gray-300 px-5 border-solid border-[1px] lg:w-1/3 py-2 placeholder:text-dark_gray' placeholder='Email' />
        <input type='number'
          id='phone'
          name='phone'
          value={formData.phone}
          onChange={handleChange}
          required className='block mt-3  lg:mt-0 w-full border-gray-300 px-5 border-solid border-[1px] lg:w-1/3 py-2 placeholder:text-dark_gray' placeholder='Phone' />
      </div>
      <textarea id='message'
        name='message'
        value={formData.message}
        onChange={handleChange}
        required className='border-gray-300 px-5 border-solid border-[1px] w-full my-5 pt-2 pb-10 placeholder:text-dark_gray' cols={5} placeholder='Message' />
      <div>
        <button type='submit' className='bg-primary_Color_Light text-white px-10 py-3 hover:bg-primary_Color_dark hover:text-lg'>Send Now</button>
      </div>
      
      <div>
        <ResponseMessage message={responseMessage} />
      </div>
    </form>
  )
}

export default Form