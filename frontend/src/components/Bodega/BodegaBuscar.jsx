import React from "react";
import { useForm } from "react-hook-form";

export default function BodegaBuscar({ Nombre, setNombre, Buscar, Agregar }) {
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data) => {
    Buscar();
  };

  const handleAgregarClick = () => {
    Agregar();
  };

  const handleChangeNombre = (e) => {
    const value = e.target.value;
    setNombre(value);
    setValue("nombre", value);
  };

  return (
    <form
      name="FormBusqueda"
      className="search-container"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            <label className="col-form-label" htmlFor="nombre">
              Nombre:
            </label>
            <input
              type="text"
              className="form-control search-input"
              id="nombre"
              {...register("nombre")} // Registra el campo con react-hook-form
              onChange={handleChangeNombre} // Maneja el cambio de valor localmente
              value={Nombre}
              maxLength="55"
              autoFocus
            />
          </div>
        </div>

        <hr />

        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
            <button
              type="submit" // Usa submit para manejar el formulario
              className="btn btn-primary form-button"
            >
              <i className="fa fa-search"></i> Buscar
            </button>
            <button
              type="button"
              className="btn btn-primary form-button"
              onClick={handleAgregarClick} // Maneja el click para agregar
            >
              <i className="fa fa-plus"></i> Agregar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
