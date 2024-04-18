const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require('bcryptjs');
const paginate  = require('../plugin/paginate.plugin');

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,

      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: true,
    },
    gender: {
      type: Number,
      default: null,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      default: new mongoose.Types.ObjectId("6620a3773aec4ae96639a6de"),
    },
    // priority: {
    //   type: Number,
    //   default: 0,
    // },
    active: {
      type: Boolean,
      default: true,
    },
    code: {
      type: String,
      default: null,
    },
    exprire_code: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};


userSchema.methods.isPasswordMatch = async function (password) {
    const user = this;
    return bcrypt.compare(password, user.password);
  };
  

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//Export the model
module.exports = mongoose.model("User", userSchema);
