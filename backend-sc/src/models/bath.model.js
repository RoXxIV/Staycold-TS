/**
 * @module BathModel
 * @description Defines and exports the Bath model for MongoDB.
 * @requires mongoose - MongoDB object modeling tool.
 */

const mongoose = require("mongoose");

/**
 * @class Bath
 * @description Defines the structure of the Bath document in MongoDB.
 * @see {@link https://mongoosejs.com/docs/models.html|mongoose}
 * @property {mongoose.Schema.Types.ObjectId} author - The user associated with the bath.
 * @property {number} waterTemperature - The temperature of the water. Min is 0.1 and max is 50.
 * @property {number} timeInWater - The time spent in water. Min is 1 and max is 1440 minutes (24h).
 * @property {number} temperatureOutside - The outside temperature. Max is 60.
 * @property {string} weather - The weather condition during the bath.
 * @property {string} wind - The wind condition during the bath.
 * @property {number} recoveryTime - The recovery time after the bath. Min is 0.1 and max is 1440 minutes (24h).
 * @property {string} afterdrop - The intensity of shivering during recovery.
 * @property {string} globalFeeling - The overall feeling about the bath.
 * @property {string} commentary - Additional comments about the bath. Max length is 500.
 */

const Bath = mongoose.model(
  "Bath",
  new mongoose.Schema(
    {
      /**
       * @type {mongoose.Schema.Types.ObjectId}
       * @description The user associated with the bath.
       */
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      /**
       * @type {number}
       * @description The temperature of the water.
       */
      waterTemperature: {
        type: Number,
        min: -48,
        max: 50,
        required: true,
      },
      /**
       * @type {number}
       * @description The time spent in water.
       */
      timeInWater: {
        type: Number,
        min: 1,
        max: 120,
        required: true,
      },
      /**
       * @type {number}
       * @description The outside temperature.
       */
      temperatureOutside: {
        type: Number,
        required: true,
        max: 60,
      },
      /**
       * @type {string}
       * @description The weather condition during the bath.
       */
      weather: {
        type: String,
        enum: [
          "partiellement nuageux",
          "nuageux",
          "ensoleillé",
          "pluie",
          "neige",
          "tempête",
        ],
        required: true,
      },
      /**
       * @type {string}
       * @description The wind condition during the bath.
       */
      wind: {
        type: String,
        enum: ["aucun", "leger", "modéré", "beaucoup", null],
        default: null,
      },
      /**
       * @type {number}
       * @description The recovery time after the bath.
       */
      recoveryTime: {
        type: Number,
        min: 0,
        max: 180,
        default: null,
      },
      /**
       * @type {string}
       * @description The intensity of shivering during recovery.
       */
      afterdrop: {
        type: String,
        enum: ["très intense", "intense", "modéré", "leger", "aucun", null],
        default: null,
      },
      /**
       * @type {string}
       * @description The overall feeling about the bath.
       */
      globalFeeling: {
        type: String,
        enum: ["très dur", "dur", "modéré", "facile", "très facile", null],
        default: null,
      },
      /**
       * @type {string}
       * @description Additional comments about the bath.
       */
      commentary: {
        type: String,
        maxlength: 500,
        default: null,
      },
    },
    {
      /**
       * @type {boolean}
       * @description Enable timestamps for createdAt and updatedAt fields.
       */
      timestamps: true,
    }
  )
);

module.exports = Bath;
