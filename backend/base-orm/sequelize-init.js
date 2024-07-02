const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("sqlite:" + "./.data/programa.db");

// Definición del modelo de Enologo
const Enologo = sequelize.define(
  "Enologo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [2, 50],
          msg: "Nombre debe ser tipo caracteres, entre 2 y 50 de longitud",
        },
      },
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Apellido es requerido",
        },
        len: {
          args: [2, 50],
          msg: "Apellido debe ser tipo caracteres, entre 2 y 50 de longitud",
        },
      },
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de nacimiento es requerida",
        },
      },
    },
  },
  { timestamps: false }
);

// Definición del modelo de Resenia
const Resenia = sequelize.define(
    "Resenia",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      puntuacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5, // Asegúrate de que este rango coincida con el rango en el frontend
        },
      },
      comentario: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: "Fecha es requerida",
          },
        },
      },
      EnologoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Enologos', // Asegúrate de que el nombre del modelo coincida
          key: 'id',
        },
      },
    },
    {
      timestamps: false, // Cambia a `true` si necesitas las columnas createdAt y updatedAt
    }
);

// Definición del modelo de Bodega
const Bodega = sequelize.define(
  "Bodega",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [2, 50],
          msg: "Nombre debe ser tipo caracteres, entre 2 y 50 de longitud",
        },
      },
    },
    fechaInauguracion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de inauguración es requerida",
        },
      },
    },
  },
  { timestamps: false }
);

// Definición del modelo de Vino
const Vino = sequelize.define(
  "Vino",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [2, 50],
          msg: "Nombre debe ser tipo caracteres, entre 2 y 50 de longitud",
        },
      },
    },
    anejamiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Anejamiento es requerido",
        },
      },
    },
    BodegaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Bodega,
        key: "id",
      },
      validate: {
        notNull: {
          args: true,
          msg: "BodegaId es requerido",
        },
      },
    },
  },
  { timestamps: false }
);

// Definición del modelo de Cliente
const Cliente = sequelize.define(
  "Cliente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nombre es requerido",
        },
        len: {
          args: [2, 50],
          msg: "Nombre debe ser tipo caracteres, entre 2 y 50 de longitud",
        },
      },
    },
    apellido: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Apellido es requerido",
        },
        len: {
          args: [2, 50],
          msg: "Apellido debe ser tipo caracteres, entre 2 y 50 de longitud",
        },
      },
    },
    fechaRegistro: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha de registro es requerida",
        },
      },
    },
  },
  { timestamps: false }
);

// Definición del modelo de Pedido
const Pedido = sequelize.define(
  "Pedido",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaPedido: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "Fecha del pedido es requerida",
        },
      },
    },
    ClienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Cliente,
        key: "id",
      },
      validate: {
        notNull: {
          args: true,
          msg: "ClienteId es requerido",
        },
      },
    },
    comentarios: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  { timestamps: false }
);

Cliente.hasMany(Pedido, { foreignKey: "ClienteId", onDelete: "CASCADE" });
Pedido.belongsTo(Cliente, { foreignKey: "ClienteId" });

Enologo.hasMany(Resenia, { foreignKey: "EnologoId", onDelete: "CASCADE" });
Resenia.belongsTo(Enologo, { foreignKey: "EnologoId" });

// Exportación de los modelos
module.exports = {
  sequelize,
  Enologo,
  Resenia,
  Bodega,
  Vino,
  Cliente,
  Pedido,
};
