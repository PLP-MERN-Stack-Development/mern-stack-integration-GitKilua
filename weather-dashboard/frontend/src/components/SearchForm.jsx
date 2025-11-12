import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    navigate(`/weather/${data.city}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Weather by City</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('city', { required: 'City is required' })} placeholder="Enter city (e.g., Nairobi)" />
        {errors.city && <p>{errors.city.message}</p>}
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;