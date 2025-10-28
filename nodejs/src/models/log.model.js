module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define(
    "log_portiques",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue("name", value.trim());
        },
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      pin: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      card_no: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      device_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      device_sn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      device_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      verified: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      state: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
      event_point_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      event_point_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "log_portiques",
      timestamps: false,
    }
  );
  return Log;
};
